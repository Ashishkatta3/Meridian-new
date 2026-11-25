/* ===========================================================
   ACCOUNTS

   Wraps Supabase auth so the rest of the site never touches it
   directly. Two rules hold throughout:

     1. The display NAME is what we show. Never the email address.
        The name is collected at sign-up, stored in user metadata
        and mirrored into a profiles row by a database trigger.

     2. Nothing here is required. With no keys in config.js the
        whole site runs exactly as before, in this browser only,
        and the account UI says so instead of failing.

   supabase-js is loaded from a CDN on demand — only when keys are
   present — so an offline or local-only install downloads nothing.
   =========================================================== */

let SB = null;              // the supabase client, once built
let ME = null;              // { id, name, email } or null
let AUTH_READY = false;

/* 2.58 rather than 2.45: Supabase's newer publishable keys
   (sb_publishable_…) arrived after 2.45 and older clients do not
   always complete a request made with one — which looks from the
   outside like a request that simply never answers. */
const SB_CDN = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.58.0/+esm';

function authAnnounce(){
  document.dispatchEvent(new CustomEvent('auth:changed', { detail: { user: ME } }));
}

/* Build the client once. Returns null when unconfigured or if the
   library cannot be reached — both are survivable, not errors. */
async function sbClient(){
  if (SB) return SB;
  if (!cloudReady()) return null;
  try {
    const mod = await import(SB_CDN);
    SB = mod.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: true, autoRefreshToken: true }
    });
    return SB;
  } catch(e){
    console.warn('Meridian: could not load supabase-js —', e.message);
    return null;
  }
}

/* Read the signed-in user and their profile name. */
async function authLoad(){
  const sb = await sbClient();
  if (!sb){ AUTH_READY = true; ME = null; authAnnounce(); return null; }

  const { data } = await sb.auth.getSession();
  const u = data && data.session && data.session.user;
  ME = u ? { id: u.id, email: u.email, name: await profileName(sb, u) } : null;
  AUTH_READY = true;
  authAnnounce();

  sb.auth.onAuthStateChange(async (_evt, session) => {
    const su = session && session.user;
    ME = su ? { id: su.id, email: su.email, name: await profileName(sb, su) } : null;
    authAnnounce();
  });
  return ME;
}

/* The name, in order of trust: the profiles row, then the metadata
   typed at sign-up, then the local part of the email. Never the
   whole address. */
async function profileName(sb, u){
  try {
    const { data } = await sb.from('profiles').select('name').eq('id', u.id).maybeSingle();
    if (data && data.name) return data.name;
  } catch(e){}
  const meta = (u.user_metadata && u.user_metadata.name) || '';
  if (meta) return meta;
  return (u.email || 'Traveller').split('@')[0];
}

async function signUp(email, password, name){
  const sb = await sbClient();
  if (!sb) return { error: 'No database connected yet.' };
  const { data, error } = await sb.auth.signUp({
    email: email, password: password,
    options: { data: { name: (name || '').trim() || email.split('@')[0] } }
  });
  if (error) return { error: error.message };
  /* If the project has email confirmation on, there is no session yet. */
  if (!data.session) return { pending: true };
  await ensureProfile(name);
  await authLoad();
  return { ok: true };
}

async function signIn(email, password){
  const sb = await sbClient();
  if (!sb) return { error: 'No database connected yet.' };
  const { error } = await sb.auth.signInWithPassword({ email: email, password: password });
  if (error) return { error: error.message };
  await authLoad();
  await claimInvites();
  return { ok: true };
}

/* ---- password reset ----

   Two halves. requestPasswordReset sends the email; Supabase puts a
   recovery token in the link fragment and the browser lands back on
   the site. setNewPassword then changes it.

   The redirect goes to #/recover. It deliberately does NOT go to
   #/reset, which this app already uses to clear a broken service
   worker cache, and which would wipe the recovery session out from
   under the user before they could type anything.

   The reply is the same whether or not the address exists. Telling
   an anonymous visitor which addresses have accounts is a way of
   leaking a user list. */
async function requestPasswordReset(email){
  const sb = await sbClient();
  if (!sb) return { error: 'No database connected yet.' };
  const addr = (email || '').trim();
  if (!addr || addr.indexOf('@') === -1) return { error: 'A valid email address is needed.' };

  const base = location.origin + location.pathname;
  try {
    await sb.auth.resetPasswordForEmail(addr, { redirectTo: base + '#/recover' });
  } catch (e){
    return { error: 'Could not send the email just now. Try again in a minute.' };
  }
  return { ok: true };
}

/* Called from the recovery page. Supabase has already put a session
   in place from the token in the link, so this is an ordinary user
   update. */
async function setNewPassword(password){
  const sb = await sbClient();
  if (!sb) return { error: 'No database connected yet.' };
  const pw = String(password || '');
  if (pw.length < 6) return { error: 'Use at least six characters.' };

  const { data } = await sb.auth.getUser();
  if (!data || !data.user){
    return { error: 'This reset link has expired. Request a new one from the account page.' };
  }
  const { error } = await sb.auth.updateUser({ password: pw });
  if (error) return { error: error.message };
  await authLoad();
  return { ok: true };
}

/* True when the page was opened from a recovery email. Supabase
   signals it in the URL fragment, and the client also fires a
   PASSWORD_RECOVERY event which app.js listens for. */
function isRecoveryLink(){
  const h = String(location.hash || '');
  return h.indexOf('type=recovery') !== -1 || h.indexOf('/recover') !== -1;
}

async function signOut(){
  const sb = await sbClient();
  if (sb) await sb.auth.signOut();
  ME = null; authAnnounce();
}

/* The trigger in schema.sql normally does this; this is the belt
   and braces for a project where the trigger was not installed. */
async function ensureProfile(name){
  const sb = await sbClient(); if (!sb) return;
  const { data } = await sb.auth.getUser();
  const u = data && data.user; if (!u) return;
  const nm = (name || '').trim() || (u.user_metadata && u.user_metadata.name) || (u.email || '').split('@')[0];
  try { await sb.from('profiles').upsert({ id: u.id, name: nm }, { onConflict: 'id' }); } catch(e){}
}

async function updateName(name){
  const sb = await sbClient(); if (!sb || !ME) return { error: 'Not signed in.' };
  const nm = (name || '').trim(); if (!nm) return { error: 'A name is needed.' };
  try {
    await sb.auth.updateUser({ data: { name: nm } });
    await sb.from('profiles').upsert({ id: ME.id, name: nm }, { onConflict: 'id' });
    ME.name = nm; authAnnounce();
    return { ok: true };
  } catch(e){ return { error: e.message }; }
}

/* Turn invitations addressed to this email into memberships. */
async function claimInvites(){
  const sb = await sbClient(); if (!sb || !ME) return 0;
  try { const { data } = await sb.rpc('claim_invites'); return data || 0; }
  catch(e){ return 0; }
}

/* ---------- what the rest of the site asks ---------- */
function currentUser(){ return ME; }
function userName(){ return ME ? ME.name : ''; }
function signedIn(){ return !!ME; }

/* start as soon as the page is up, but never block it */
document.addEventListener('DOMContentLoaded', () => { authLoad(); });
if (document.readyState !== 'loading') authLoad();
