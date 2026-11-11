/* ===========================================================
   THE ACCOUNT PAGE

   #/account

   Sign up, sign in, change the name you are shown as, sign out.
   When no database is connected it says exactly that, and what to
   do about it, rather than showing a form that cannot work.
   =========================================================== */

function renderAccount(){
  if (!cloudReady()){
    return '<section class="wrap pg">'
      + '<div class="pg-head"><div><span class="lab">Account</span><h1>Not connected yet</h1>'
      + '<p class="pg-sub">Meridian is running on this browser alone. Your marks and trips are saved here and nowhere else — '
      + 'they will not follow you to another device, and a trip cannot be shared.</p></div></div>'
      + '<div class="ac-steps">'
      +   step(1, 'Make a Supabase project', 'It is free. supabase.com → New project.')
      +   step(2, 'Run the schema', 'Open <b>supabase/schema.sql</b> from this project, paste the whole file into the Supabase SQL editor and run it. It creates the tables and the security rules.')
      +   step(3, 'Paste two values', 'In Supabase: Project Settings → API. Copy the <b>Project URL</b> and the <b>anon public</b> key into <b>assets/js/core/config.js</b>.')
      +   step(4, 'Reload', 'Sign-up appears here, and your trips start syncing.')
      + '</div>'
      + '<p class="pg-note">The anon key is meant to be public — it is the browser key and grants nothing by itself. '
      + 'The security comes from the policies in schema.sql. Never paste the <b>service_role</b> key into the site.</p>'
      + '</section>';
  }

  const me = currentUser();
  if (me){
    return '<section class="wrap pg">'
      + '<div class="pg-head"><div><span class="lab">Account</span><h1>' + plEsc(me.name) + '</h1>'
      + '<p class="pg-sub">Signed in. Your trips sync to your account and can be shared with other people.</p></div>'
      + '<button class="pg-btn" id="acOut">Sign out</button></div>'
      + '<div class="ac-form">'
      +   '<label>Display name<span>This is what other people on a shared trip see. Your email is never shown.</span>'
      +     '<input id="acName" type="text" value="' + plEsc(me.name) + '" autocomplete="nickname"></label>'
      +   '<button class="pg-btn pg-btn-go" id="acSave">Save name</button>'
      +   '<p class="ac-msg" id="acMsg"></p>'
      + '</div></section>';
  }

  return '<section class="wrap pg">'
    + '<div class="pg-head"><div><span class="lab">Account</span><h1>Sign in</h1>'
    + '<p class="pg-sub">An account keeps your trips across devices and lets you share one with the people you are travelling with.</p></div></div>'
    + '<div class="ac-cols">'
    +   '<div class="ac-form"><h2>I have an account</h2>'
    +     '<label>Email<input id="inEmail" type="email" autocomplete="email"></label>'
    +     '<label>Password<input id="inPass" type="password" autocomplete="current-password"></label>'
    +     '<button class="pg-btn pg-btn-go" id="acIn">Sign in</button>'
    +   '</div>'
    +   '<div class="ac-form"><h2>New here</h2>'
    +     '<label>Your name<span>Shown to anyone you travel with.</span><input id="upName" type="text" autocomplete="nickname" placeholder="Alex"></label>'
    +     '<label>Email<input id="upEmail" type="email" autocomplete="email"></label>'
    +     '<label>Password<span>At least six characters.</span><input id="upPass" type="password" autocomplete="new-password"></label>'
    +     '<button class="pg-btn pg-btn-go" id="acUp">Create account</button>'
    +   '</div>'
    + '</div><p class="ac-msg" id="acMsg"></p></section>';
}

function step(n, title, body){
  return '<div class="ac-step"><span>' + n + '</span><div><b>' + title + '</b><p>' + body + '</p></div></div>';
}

function mountAccount(host){
  host.innerHTML = renderAccount();
  window.scrollTo(0, 0);
  const $ = s => host.querySelector(s);
  const msg = (t, bad) => { const m = $('#acMsg'); if (m){ m.textContent = t; m.className = 'ac-msg' + (bad ? ' is-bad' : ' is-ok'); } };
  const busy = (b, on) => { if (b){ b.disabled = on; b.textContent = on ? 'Working…' : b.dataset.label || b.textContent; } };

  const inBtn = $('#acIn');
  if (inBtn) inBtn.onclick = async () => {
    inBtn.dataset.label = 'Sign in'; busy(inBtn, true);
    const r = await signIn($('#inEmail').value.trim(), $('#inPass').value);
    busy(inBtn, false);
    if (r.error) return msg(r.error, true);
    location.hash = '#/planner';
  };

  const upBtn = $('#acUp');
  if (upBtn) upBtn.onclick = async () => {
    const name = $('#upName').value.trim();
    if (!name) return msg('Please put a name in — it is what other travellers will see.', true);
    upBtn.dataset.label = 'Create account'; busy(upBtn, true);
    const r = await signUp($('#upEmail').value.trim(), $('#upPass').value, name);
    busy(upBtn, false);
    if (r.error) return msg(r.error, true);
    if (r.pending) return msg('Check your email to confirm the account, then sign in.', false);
    location.hash = '#/planner';
  };

  const out = $('#acOut');
  if (out) out.onclick = async () => { await signOut(); mountAccount(host); };

  const save = $('#acSave');
  if (save) save.onclick = async () => {
    const r = await updateName($('#acName').value);
    msg(r.error || 'Saved.', !!r.error);
  };
}

/* ---------- the header greeting ---------- */
function paintAccountLink(){
  const a = document.getElementById('acLink');
  if (!a) return;
  if (!cloudReady()){ a.textContent = 'Account'; return; }
  a.textContent = signedIn() ? userName() : 'Sign in';
}
document.addEventListener('auth:changed', paintAccountLink);
document.addEventListener('DOMContentLoaded', paintAccountLink);
