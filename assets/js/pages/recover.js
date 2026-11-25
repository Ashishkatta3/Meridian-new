/* ===========================================================
   #/recover — set a new password

   Where the link in a password reset email lands. By the time this
   renders, the Supabase client has already read the recovery token
   out of the URL fragment and put a session in place, so changing
   the password is an ordinary authenticated update.

   Note the route is #/recover and not #/reset. #/reset already
   exists in this app and means "clear the service worker cache and
   reload", which would throw away the recovery session before the
   user had typed anything.
   =========================================================== */

function renderRecover(){
  return '<section class="wrap pg">'
    + '<div class="pg-head"><div><span class="lab">Account</span><h1>Set a new password</h1>'
    + '<p class="pg-sub">Pick something you have not used here before. '
    + 'Once it is saved you will be signed in on this device.</p></div></div>'
    + '<div class="ac-cols ac-cols-one">'
    +   '<div class="ac-form">'
    +     '<label>New password<span>At least six characters.</span>'
    +       '<input id="rcPass" type="password" autocomplete="new-password"></label>'
    +     '<label>Again<span>To catch a typo.</span>'
    +       '<input id="rcPass2" type="password" autocomplete="new-password"></label>'
    +     '<button class="pg-btn pg-btn-go" id="rcSave">Save new password</button>'
    +   '</div>'
    + '</div>'
    + '<p class="ac-msg" id="rcMsg"></p>'
    + '<p class="pg-note">If this page says the link has expired, ask for a new one '
    + 'from the <a href="#/account">account page</a>. Reset links last an hour.</p>'
    + '</section>';
}

function mountRecover(host){
  host.innerHTML = renderRecover();
  window.scrollTo(0, 0);

  const $ = s => host.querySelector(s);
  const msg = (t, bad) => {
    const m = $('#rcMsg');
    if (m){ m.textContent = t; m.className = 'ac-msg' + (bad ? ' is-bad' : ' is-ok'); }
  };

  const btn = $('#rcSave');
  if (!btn) return;

  btn.onclick = async () => {
    const a = $('#rcPass').value, b = $('#rcPass2').value;
    if (a.length < 6) return msg('Use at least six characters.', true);
    if (a !== b)      return msg('Those two do not match.', true);

    btn.disabled = true;
    const was = btn.textContent;
    btn.textContent = 'Saving…';

    const r = (typeof setNewPassword === 'function')
      ? await setNewPassword(a)
      : { error: 'Accounts are not configured on this copy of the site.' };

    btn.disabled = false;
    btn.textContent = was;
    if (r.error) return msg(r.error, true);

    msg('Password changed. Taking you to your trips…', false);
    setTimeout(() => { location.hash = '#/trips'; }, 1200);
  };

  /* Enter should submit from either field. */
  ['#rcPass', '#rcPass2'].forEach(sel => {
    const el = $(sel);
    if (el) el.addEventListener('keydown', e => { if (e.key === 'Enter') btn.click(); });
  });
}
