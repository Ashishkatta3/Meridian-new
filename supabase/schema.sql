-- ===========================================================
-- MERIDIAN — database schema
--
-- Run this once, whole, in the Supabase SQL editor:
--   Supabase dashboard -> SQL Editor -> New query -> paste -> Run
--
-- It creates the tables, and the Row Level Security policies that
-- actually protect them. RLS is the only thing standing between
-- your data and the public anon key that ships in the page, so the
-- policies are not optional and every table has them enabled.
--
-- The rule throughout: you can see a trip if you own it or you have
-- been added to it, and nothing else.
-- ===========================================================

-- ---------- profiles: the display name, so we never show an email ----------
create table if not exists public.profiles (
  id          uuid primary key references auth.users on delete cascade,
  name        text not null,
  created_at  timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles are readable by signed-in users" on public.profiles;
create policy "profiles are readable by signed-in users"
  on public.profiles for select to authenticated using (true);

drop policy if exists "you may create your own profile" on public.profiles;
create policy "you may create your own profile"
  on public.profiles for insert to authenticated with check (auth.uid() = id);

drop policy if exists "you may edit your own profile" on public.profiles;
create policy "you may edit your own profile"
  on public.profiles for update to authenticated using (auth.uid() = id);

-- Make a profile automatically on sign-up, taking the name the user
-- typed (passed as user metadata) and falling back to the part of
-- the email before the @ — never the whole email.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, name)
  values (
    new.id,
    coalesce(
      nullif(new.raw_user_meta_data->>'name', ''),
      split_part(new.email, '@', 1)
    )
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- trips ----------
create table if not exists public.trips (
  id          uuid primary key default gen_random_uuid(),
  owner       uuid not null references auth.users on delete cascade,
  name        text not null default 'Untitled trip',
  -- the board itself: days, ideas and notes, exactly the shape the
  -- planner already uses in the browser
  data        jsonb not null default '{"days":[],"ideas":[],"notes":{}}'::jsonb,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ---------- who may see a trip ----------
create table if not exists public.trip_members (
  trip_id   uuid not null references public.trips on delete cascade,
  user_id   uuid not null references auth.users on delete cascade,
  role      text not null default 'editor',     -- 'editor' | 'viewer'
  added_at  timestamptz not null default now(),
  primary key (trip_id, user_id)
);

-- A helper used by the policies. SECURITY DEFINER so that checking
-- membership does not itself re-trigger the policy it is used in,
-- which is the usual cause of "infinite recursion detected in policy".
create or replace function public.can_see_trip(t uuid)
returns boolean
language sql
security definer set search_path = public
stable
as $$
  select exists (select 1 from public.trips       where id = t      and owner   = auth.uid())
      or exists (select 1 from public.trip_members where trip_id = t and user_id = auth.uid());
$$;

create or replace function public.can_edit_trip(t uuid)
returns boolean
language sql
security definer set search_path = public
stable
as $$
  select exists (select 1 from public.trips where id = t and owner = auth.uid())
      or exists (select 1 from public.trip_members
                 where trip_id = t and user_id = auth.uid() and role = 'editor');
$$;

alter table public.trips enable row level security;

drop policy if exists "see your trips and shared ones" on public.trips;
create policy "see your trips and shared ones"
  on public.trips for select to authenticated using (public.can_see_trip(id));

drop policy if exists "create your own trips" on public.trips;
create policy "create your own trips"
  on public.trips for insert to authenticated with check (owner = auth.uid());

drop policy if exists "edit trips you may edit" on public.trips;
create policy "edit trips you may edit"
  on public.trips for update to authenticated using (public.can_edit_trip(id));

drop policy if exists "only the owner deletes a trip" on public.trips;
create policy "only the owner deletes a trip"
  on public.trips for delete to authenticated using (owner = auth.uid());

alter table public.trip_members enable row level security;

drop policy if exists "see members of trips you can see" on public.trip_members;
create policy "see members of trips you can see"
  on public.trip_members for select to authenticated using (public.can_see_trip(trip_id));

drop policy if exists "owner adds members" on public.trip_members;
create policy "owner adds members"
  on public.trip_members for insert to authenticated
  with check (exists (select 1 from public.trips where id = trip_id and owner = auth.uid()));

drop policy if exists "owner removes members, or you remove yourself" on public.trip_members;
create policy "owner removes members, or you remove yourself"
  on public.trip_members for delete to authenticated
  using (user_id = auth.uid()
         or exists (select 1 from public.trips where id = trip_id and owner = auth.uid()));

-- ---------- invites by email, for people who have not signed up yet ----------
create table if not exists public.trip_invites (
  id         uuid primary key default gen_random_uuid(),
  trip_id    uuid not null references public.trips on delete cascade,
  email      text not null,
  invited_by uuid not null references auth.users on delete cascade,
  created_at timestamptz not null default now(),
  unique (trip_id, email)
);

alter table public.trip_invites enable row level security;

drop policy if exists "see invites for your trips or to you" on public.trip_invites;
create policy "see invites for your trips or to you"
  on public.trip_invites for select to authenticated
  using (public.can_see_trip(trip_id) or lower(email) = lower(auth.jwt()->>'email'));

drop policy if exists "owner invites" on public.trip_invites;
create policy "owner invites"
  on public.trip_invites for insert to authenticated
  with check (exists (select 1 from public.trips where id = trip_id and owner = auth.uid()));

drop policy if exists "owner or invitee clears an invite" on public.trip_invites;
create policy "owner or invitee clears an invite"
  on public.trip_invites for delete to authenticated
  using (lower(email) = lower(auth.jwt()->>'email')
         or exists (select 1 from public.trips where id = trip_id and owner = auth.uid()));

-- Turn any invites addressed to you into memberships. The browser
-- calls this after sign-in; it is the step that makes a shared trip
-- appear for someone who was invited before they had an account.
create or replace function public.claim_invites()
returns integer
language plpgsql
security definer set search_path = public
as $$
declare n integer;
begin
  insert into public.trip_members (trip_id, user_id, role)
  select i.trip_id, auth.uid(), 'editor'
  from public.trip_invites i
  where lower(i.email) = lower(auth.jwt()->>'email')
  on conflict do nothing;
  get diagnostics n = row_count;

  delete from public.trip_invites
  where lower(email) = lower(auth.jwt()->>'email');

  return n;
end;
$$;

-- keep updated_at honest
create or replace function public.touch_trip()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

drop trigger if exists trips_touch on public.trips;
create trigger trips_touch before update on public.trips
  for each row execute function public.touch_trip();

-- Let the planner receive other people's edits live.
alter publication supabase_realtime add table public.trips;
