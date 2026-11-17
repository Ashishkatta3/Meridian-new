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
--
-- This HAS to be wrapped. A bare `alter publication ... add table` throws
--   relation "trips" is already member of publication "supabase_realtime"
-- the second time it runs, and the SQL editor runs a pasted file as one
-- transaction — so on any re-run that error aborted every statement BELOW
-- this line. That is why the marks table at the end of this file never got
-- created, and so why a map filled in on a laptop was still empty on a
-- phone: the block that fixes it was never reached.
do $$
begin
  alter publication supabase_realtime add table public.trips;
exception
  when duplicate_object then null;   -- already published, nothing to do
  when others then null;             -- realtime not enabled on this project
end $$;

-- ===========================================================
-- MARKS — the places you have been to and want to go
--
-- These were never stored anywhere but the browser, which is why a
-- map filled in on a laptop was empty on a phone. One row per person
-- per place, so a mark set on either device shows up on both.
--
-- Run this block on an existing database; it is safe to re-run.
-- ===========================================================
create table if not exists public.marks (
  user_id    uuid not null references auth.users on delete cascade,
  place_id   text not null,
  value      text not null check (value in ('been','want')),
  updated_at timestamptz not null default now(),
  primary key (user_id, place_id)
);

alter table public.marks enable row level security;

-- your marks are yours: nobody else reads or writes them
drop policy if exists "marks are private" on public.marks;
create policy "marks are private" on public.marks
  for all
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create index if not exists marks_user on public.marks (user_id);


-- ===========================================================
-- SHARE LINKS — send the plan to someone without an account
--
-- A link carries a token and a role. A viewer link opens the trip
-- read-only for anybody who has the URL, signed in or not. An editor
-- link does the same, and additionally turns a signed-in visitor into
-- a member of the trip, so from then on it is in their own list and
-- their edits sync like any other member's.
--
-- Anonymous reading cannot go through the trips table: its policies
-- are scoped to `authenticated`, and loosening them would open every
-- trip. Instead one SECURITY DEFINER function returns exactly one
-- trip for exactly one valid token, and that is the only door the
-- anon key can open.
--
-- Safe to re-run.
-- ===========================================================
create table if not exists public.trip_links (
  token       text primary key,
  trip_id     uuid not null references public.trips on delete cascade,
  role        text not null default 'viewer' check (role in ('viewer','editor')),
  label       text,                                  -- "the group chat", "mum"
  created_by  uuid not null references auth.users on delete cascade,
  created_at  timestamptz not null default now(),
  revoked_at  timestamptz
);

create index if not exists trip_links_trip on public.trip_links (trip_id);

alter table public.trip_links enable row level security;

-- Only the trip's owner sees or manages its links. Visitors never read
-- this table at all; they go through trip_by_token below.
drop policy if exists "owner manages share links" on public.trip_links;
create policy "owner manages share links" on public.trip_links
  for all to authenticated
  using      (exists (select 1 from public.trips where id = trip_id and owner = auth.uid()))
  with check (exists (select 1 from public.trips where id = trip_id and owner = auth.uid()));

-- ---------- the one public door ----------
-- Returns a single trip for a single live token, to anyone holding it.
-- It deliberately returns no owner id, no member list and no email: a
-- link leaks the itinerary it was made for and nothing else.
create or replace function public.trip_by_token(tok text)
returns table (id uuid, name text, data jsonb, role text, updated_at timestamptz)
language sql
security definer set search_path = public
stable
as $$
  select t.id, t.name, t.data, l.role, t.updated_at
  from public.trip_links l
  join public.trips t on t.id = l.trip_id
  where l.token = tok
    and l.revoked_at is null;
$$;

revoke all on function public.trip_by_token(text) from public;
grant execute on function public.trip_by_token(text) to anon, authenticated;

-- ---------- an editor link, claimed ----------
-- A signed-in visitor holding an editor link becomes a member, which
-- is what makes the trip appear in their own list and their changes
-- sync. A viewer link grants nothing persistent, by design: it is for
-- people who should see the plan, not change it.
create or replace function public.claim_link(tok text)
returns table (trip_id uuid, role text, joined boolean)
language plpgsql
security definer set search_path = public
as $$
declare tid uuid; r text;
begin
  select l.trip_id, l.role into tid, r
  from public.trip_links l
  where l.token = tok and l.revoked_at is null;

  if tid is null then
    return;                                  -- no such link; caller shows "not found"
  end if;

  if r = 'editor' and auth.uid() is not null then
    insert into public.trip_members (trip_id, user_id, role)
    values (tid, auth.uid(), 'editor')
    on conflict do nothing;
    return query select tid, r, true;
  else
    return query select tid, r, false;
  end if;
end;
$$;

revoke all on function public.claim_link(text) from public;
grant execute on function public.claim_link(text) to anon, authenticated;
