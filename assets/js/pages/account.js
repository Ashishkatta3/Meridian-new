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
      + acSynopsis() + acPickers()
      + '</section>';
  }

  const me = currentUser();
  if (me){
    return '<section class="wrap pg">'
      + '<div class="pg-head"><div><span class="lab">Account</span><h1>' + plEsc(me.name) + '</h1>'
      + '<p class="pg-sub">Signed in. Your trips sync to your account and can be shared with other people.</p></div>'
      + '<button class="pg-btn" id="acOut">Sign out</button></div>'
      + acSynopsis()
      + acPickers()
      + '<div class="ac-form ac-form-name">'
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
    +     '<p class="ac-alt"><button type="button" class="ac-link" id="acForgot">Forgotten your password?</button></p>'
    +     '<div class="ac-reset" id="acResetBox" hidden>'
    +       '<label>Email<span>We will send a link to set a new password.</span>'
    +         '<input id="rsEmail" type="email" autocomplete="email"></label>'
    +       '<button class="pg-btn" id="acReset">Send reset link</button>'
    +     '</div>'
    +   '</div>'
    +   '<div class="ac-form"><h2>New here</h2>'
    +     '<label>Your name<span>Shown to anyone you travel with.</span><input id="upName" type="text" autocomplete="nickname" placeholder="Alex"></label>'
    +     '<label>Email<input id="upEmail" type="email" autocomplete="email"></label>'
    +     '<label>Password<span>At least six characters.</span><input id="upPass" type="password" autocomplete="new-password"></label>'
    +     '<button class="pg-btn pg-btn-go" id="acUp">Create account</button>'
    +   '</div>'
    + '</div><p class="ac-msg" id="acMsg"></p>'
    + acSynopsis() + acPickers()
    + '</section>';
}

function step(n, title, body){
  return '<div class="ac-step"><span>' + n + '</span><div><b>' + title + '</b><p>' + body + '</p></div></div>';
}


/* ===========================================================
   YOUR TRAVELS

   The account page used to be a sign-in form and nothing else, which
   is a waste of the one page that knows who you are. It now opens
   with what you have actually seen, and then the fastest way to fill
   the map in: the best-known places in the atlas, two taps each.

   A chip cycles rather than toggles — press once for been, again for
   want to go, again to clear — so one control does the work of two
   and the colour says which you chose.
   =========================================================== */

const AC_TOP = 30;
let AC_OPEN = { city: false, wild: false };

function acIsCity(p){ return p.kind === 'city'; }

function acPool(which){
  const ids = Object.keys(PLACES).map(placeGet).filter(Boolean)
    .filter(p => which === 'city' ? acIsCity(p) : !acIsCity(p));
  return ids.sort((a, b) => (b.prom || 0) - (a.prom || 0));
}

/* How much of the country you have actually seen. */
function acSynopsis(){
  const been = [], want = [];
  Object.keys(PLACES).forEach(id => {
    const m = markOf(id);
    if (m === 'been') been.push(placeGet(id));
    else if (m === 'want') want.push(placeGet(id));
  });
  const states = {}; been.forEach(p => { if (p) states[p.abbr] = 1; });
  const parks = been.filter(p => p && !acIsCity(p)).length;
  const cities = been.length - parks;
  const total = Object.keys(PLACES).length;
  const pct = total ? Math.round(been.length / total * 100) : 0;

  /* The straight-line distance across everything you have been to —
     not miles driven, but an honest measure of reach. */
  let spanMi = 0, a = null, b = null;
  for (let i = 0; i < been.length; i++){
    for (let j = i + 1; j < been.length; j++){
      const p = been[i], q = been[j];
      if (!p || !q || typeof p.lat !== 'number' || typeof q.lat !== 'number') continue;
      const d = haversine(p.lat, p.lon, q.lat, q.lon);
      if (d > spanMi){ spanMi = d; a = p; b = q; }
    }
  }

  const stat = (n, label) => '<div class="ac-stat"><b>' + n + '</b><span>' + label + '</span></div>';
  return '<section class="ac-sum">'
    + '<div class="ac-stats">'
    +   stat(been.length, been.length === 1 ? 'place been' : 'places been')
    +   stat(Object.keys(states).length, 'states touched')
    +   stat(parks, parks === 1 ? 'park or landmark' : 'parks & landmarks')
    +   stat(cities, cities === 1 ? 'city' : 'cities')
    +   stat(want.length, 'on the want list')
    + '</div>'
    + '<div class="ac-bar"><span style="width:' + Math.max(pct, 1) + '%"></span></div>'
    + '<p class="ac-barlab">' + pct + '% of the atlas · ' + been.length + ' of ' + total + '</p>'
    + (spanMi > 50 && a && b
        ? '<p class="ac-span">Your furthest two: <b>' + plEsc(a.name) + '</b> and <b>'
            + plEsc(b.name) + '</b>, ' + Math.round(spanMi).toLocaleString() + ' miles apart.</p>'
        : '<p class="ac-span">Mark a few places below and this fills in.</p>')
    + '</section>';
}

function acChip(p){
  const m = markOf(p.id);
  return '<button class="ac-chip' + (m ? ' is-' + m : '') + '" data-acmark="' + plEsc(p.id) + '"'
    + ' title="' + plEsc(p.name + ', ' + stateName(p.abbr)) + '">'
    + '<span>' + plEsc(p.name) + '</span><i>' + plEsc(p.abbr) + '</i></button>';
}

function acGrid(which, title, note){
  const all = acPool(which);
  const open = AC_OPEN[which];
  const shown = open ? all : all.slice(0, AC_TOP);
  const rest = all.length - shown.length;
  return '<section class="ac-pick">'
    + '<div class="ac-pick-h"><h2>' + title + '</h2><p>' + note + '</p></div>'
    + '<div class="ac-chips">' + shown.map(acChip).join('') + '</div>'
    + (rest > 0 || open
        ? '<button class="ac-more" data-acmore="' + which + '">'
          + (open ? '− Show fewer' : '+ ' + rest + ' more') + '</button>'
        : '')
    + '</section>';
}

function acPickers(){
  return '<div class="ac-legend">'
    +   '<span class="ac-key is-been">Been</span>'
    +   '<span class="ac-key is-want">Want to go</span>'
    +   '<span class="ac-key">Tap once for been, again for want, again to clear</span>'
    + '</div>'
    + acGrid('city', 'Cities', 'The thirty best known first.')
    + acGrid('wild', 'Parks &amp; landmarks', 'National parks, shores, canyons and monuments.');
}

function acWire(host){
  host.querySelectorAll('[data-acmark]').forEach(b => b.onclick = () => {
    const id = b.dataset.acmark, now = markOf(id);
    const next = now === '' ? 'been' : now === 'been' ? 'want' : '';
    setMark(id, next);
    b.className = 'ac-chip' + (next ? ' is-' + next : '');
    const sum = host.querySelector('.ac-sum');
    if (sum) sum.outerHTML = acSynopsis();
  });
  host.querySelectorAll('[data-acmore]').forEach(b => b.onclick = () => {
    const w = b.dataset.acmore;
    AC_OPEN[w] = !AC_OPEN[w];
    mountAccount(host);
  });
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
    /* a signed-in user with an empty map has not been through the
       picker yet, so offer it rather than dropping them on the map */
    location.hash = (typeof markCounts === 'function' && !markCounts().been && !markCounts().want)
      ? '#/welcome' : '#/planner';
  };

  /* Password reset. The box is hidden until asked for, so the sign-in
     form stays a two-field form for the ninety per cent who remember. */
  const forgot = $('#acForgot');
  if (forgot) forgot.onclick = () => {
    const box = $('#acResetBox');
    if (!box) return;
    const show = box.hasAttribute('hidden');
    if (show){
      box.removeAttribute('hidden');
      const e = $('#rsEmail'), typed = $('#inEmail');
      if (e && typed && typed.value.trim() && !e.value) e.value = typed.value.trim();
      if (e) e.focus();
    } else {
      box.setAttribute('hidden', '');
    }
    forgot.textContent = show ? 'Never mind, I remember it' : 'Forgotten your password?';
  };

  const rsBtn = $('#acReset');
  if (rsBtn) rsBtn.onclick = async () => {
    rsBtn.dataset.label = 'Send reset link'; busy(rsBtn, true);
    const r = await requestPasswordReset($('#rsEmail').value);
    busy(rsBtn, false);
    if (r.error) return msg(r.error, true);
    /* Deliberately the same wording whether or not the address has an
       account, so this cannot be used to find out who is registered. */
    msg('If that address has an account, a reset link is on its way. The link lasts one hour.', false);
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
    location.hash = '#/welcome';          /* straight into the been/want picker */
  };

  const out = $('#acOut');
  if (out) out.onclick = async () => { await signOut(); mountAccount(host); };

  acWire(host);

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
