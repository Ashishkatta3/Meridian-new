/* ===========================================================
   send-invite — the one piece of Meridian that runs on a server

   Why it has to exist: the browser cannot send email. It also must
   not hold a key that could. Anything in config.js ships to every
   visitor, so an email provider's key there would let a stranger
   send mail as you, to anybody. An Edge Function keeps the key on
   Supabase's side and only ever accepts a request from somebody who
   is signed in and actually owns the trip.

   What it does, in order:

     1. reads the caller's JWT from the Authorization header, and
        resolves it to a real user — no header, no email
     2. checks, with the service key, that this user OWNS the trip.
        Not a member: the owner. Otherwise anyone invited to a trip
        could use it as a mail relay
     3. sends one message through Resend
     4. returns what happened, in words the interface can show

   Deployment and secrets are in supabase/functions/README.md.
   =========================================================== */

import { createClient } from 'jsr:@supabase/supabase-js@2';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' }
  });

/* A plain-text part as well as HTML, because a lot of mail clients
   still show the text one and a message that is HTML-only is far more
   likely to be filed as spam. */
function body(opts: {
  tripName: string; fromName: string; url: string; role: string; note: string;
}){
  const canEdit = opts.role === 'editor';
  const what = canEdit
    ? 'You can move stops around, add places and leave notes.'
    : 'You can read the whole plan. You will not be able to change it.';

  const text = [
    `${opts.fromName} shared a road trip with you.`,
    '',
    opts.tripName,
    '',
    what,
    '',
    'Open it here:',
    opts.url,
    '',
    opts.note ? `They added: ${opts.note}` : '',
    '',
    canEdit
      ? 'You will need to sign in to make changes — it is free and takes a moment.'
      : 'No account needed. The link just opens.',
    '',
    '— Meridian'
  ].filter(l => l !== undefined).join('\n');

  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const html = `<!doctype html>
<html><body style="margin:0;padding:0;background:#F7F5EF;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F7F5EF;padding:32px 16px;">
<tr><td align="center">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border:1px solid #E2DDD0;border-radius:14px;overflow:hidden;">
    <tr><td style="padding:26px 28px 0;">
      <p style="margin:0;font:500 10px/1 ui-monospace,SFMono-Regular,monospace;letter-spacing:.14em;text-transform:uppercase;color:#6E7468;">A trip was shared with you</p>
      <h1 style="margin:10px 0 0;font:400 28px/1.15 Georgia,'Times New Roman',serif;color:#20251F;">${esc(opts.tripName)}</h1>
      <p style="margin:12px 0 0;font:400 15px/1.6 -apple-system,system-ui,sans-serif;color:#4A5046;">
        <strong style="color:#20251F;">${esc(opts.fromName)}</strong> sent you this itinerary. ${esc(what)}
      </p>
      ${opts.note ? `<table role="presentation" width="100%" style="margin:16px 0 0;"><tr>
        <td style="padding:12px 14px;background:#F7F5EF;border-left:3px solid #2F7F6C;border-radius:0 8px 8px 0;font:400 14px/1.6 -apple-system,system-ui,sans-serif;color:#4A5046;">
        ${esc(opts.note)}</td></tr></table>` : ''}
    </td></tr>
    <tr><td style="padding:22px 28px 26px;">
      <a href="${esc(opts.url)}" style="display:inline-block;padding:13px 22px;background:#20251F;color:#ffffff;font:500 14px/1 -apple-system,system-ui,sans-serif;text-decoration:none;border-radius:100px;">Open the trip</a>
      <p style="margin:16px 0 0;font:400 12px/1.6 -apple-system,system-ui,sans-serif;color:#6E7468;word-break:break-all;">
        Or paste this in: ${esc(opts.url)}
      </p>
      <p style="margin:14px 0 0;font:400 12px/1.6 -apple-system,system-ui,sans-serif;color:#6E7468;">
        ${canEdit
          ? 'You will need to sign in to make changes — it is free and takes a moment.'
          : 'No account needed. The link just opens.'}
      </p>
    </td></tr>
    <tr><td style="padding:14px 28px;border-top:1px solid #E2DDD0;font:500 10px/1.5 ui-monospace,SFMono-Regular,monospace;letter-spacing:.08em;text-transform:uppercase;color:#8A9286;">
      Meridian · a travel atlas of the United States
    </td></tr>
  </table>
</td></tr></table>
</body></html>`;

  return { text, html };
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') return json({ error: 'POST only' }, 405);

  const RESEND = Deno.env.get('RESEND_API_KEY');
  const FROM   = Deno.env.get('INVITE_FROM');       /* e.g. "Meridian <trips@yourdomain.com>" */
  const URL_   = Deno.env.get('SUPABASE_URL');
  const SRV    = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

  if (!URL_ || !SRV) return json({ error: 'The function is missing its Supabase settings.' }, 500);
  if (!RESEND){
    /* A clear answer, not a crash. The planner shows this verbatim,
       so it has to say what to do about it. */
    return json({
      error: 'Email is not set up yet. Add RESEND_API_KEY as a secret on this function, '
           + 'then invites will be emailed. Access has still been granted.'
    }, 503);
  }

  /* No verified domain? Resend still lets you send from its own test
     sender, and that is worth having: it proves the whole path works
     end to end. The catch is that Resend will only DELIVER such a
     message to the address the Resend account was opened with — any
     other recipient is refused. So this falls back to it, and the
     refusal that follows for a third party is reported honestly
     rather than reading as a bug.

     A vercel.app subdomain can never be verified, because verifying
     means adding DNS records and Vercel owns that zone. A domain of
     your own is the only way to email other people. */
  const SENDER = FROM || 'Meridian <onboarding@resend.dev>';
  const testSender = /onboarding@resend\.dev/.test(SENDER);

  /* ---- who is calling ---- */
  const auth = req.headers.get('Authorization') || '';
  if (!auth.startsWith('Bearer ')) return json({ error: 'Sign in first.' }, 401);

  const asUser = createClient(URL_, Deno.env.get('SUPABASE_ANON_KEY') || SRV, {
    global: { headers: { Authorization: auth } }
  });
  const { data: who, error: whoErr } = await asUser.auth.getUser();
  if (whoErr || !who?.user) return json({ error: 'That session is not valid any more.' }, 401);
  const me = who.user;

  /* ---- what they asked for ---- */
  let payload: { trip_id?: string; email?: string; url?: string; role?: string; note?: string };
  try { payload = await req.json(); }
  catch { return json({ error: 'Malformed request.' }, 400); }

  const tripId = (payload.trip_id || '').trim();
  const to     = (payload.email || '').trim().toLowerCase();
  const role   = payload.role === 'editor' ? 'editor' : 'viewer';
  const note   = (payload.note || '').slice(0, 400);

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(to)) return json({ error: 'That is not an email address.' }, 400);
  if (!tripId) return json({ error: 'No trip given.' }, 400);

  /* ---- do they own it? ----
     The service key sees every row, so this check IS the security
     boundary. A member must not be able to use this as a relay. */
  const admin = createClient(URL_, SRV);
  const { data: trip, error: tripErr } = await admin
    .from('trips').select('id,name,owner').eq('id', tripId).maybeSingle();

  if (tripErr)  return json({ error: tripErr.message }, 500);
  if (!trip)    return json({ error: 'No such trip.' }, 404);
  if (trip.owner !== me.id)
    return json({ error: 'Only the person who created a trip can email invitations for it.' }, 403);

  /* the sender's display name, never their email address */
  const { data: prof } = await admin.from('profiles').select('name').eq('id', me.id).maybeSingle();
  const fromName = prof?.name || 'Someone';

  /* The link. The browser passes the share URL it just made, because
     only the browser knows which host it is running on. Guard against
     being handed something that is not a link to the app. */
  const url = (payload.url || '').trim();
  if (!/^https?:\/\/[^\s"'<>]+#\/shared\/[A-Za-z0-9_-]{10,}$/.test(url))
    return json({ error: 'The share link was malformed, so nothing was sent.' }, 400);

  const msg = body({ tripName: trip.name || 'A road trip', fromName, url, role, note });

  /* ---- send ---- */
  let r: Response;
  try {
    r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + RESEND, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: SENDER,
        to: [to],
        reply_to: me.email,
        subject: `${fromName} shared “${trip.name || 'a road trip'}” with you`,
        text: msg.text,
        html: msg.html
      })
    });
  } catch (err) {
    return json({ error: 'Could not reach the email provider: ' + (err as Error).message }, 502);
  }

  if (!r.ok){
    const detail = await r.text().catch(() => '');

    /* The single most likely failure, explained in terms of what to
       do rather than what the API said. */
    if (testSender && /testing|own email|verify a domain|403/i.test(detail + ' ' + r.status)){
      return json({
        error: 'No verified sending domain, so Resend will only deliver to the address your '
             + 'Resend account was opened with. ' + to + ' was refused. Either invite that '
             + 'address, or add a domain you own in Resend and set INVITE_FROM to it. '
             + 'A vercel.app subdomain cannot be verified — you need your own domain. '
             + 'Access has still been granted, so the link works either way.'
      }, 502);
    }
    /* Otherwise Resend's own message is the useful one — a wrong
       sender domain is the usual cause and it says so precisely. */
    return json({ error: 'The email provider refused it: ' + (detail || r.status) }, 502);
  }

  const sent = await r.json().catch(() => ({}));
  return json({ ok: true, id: sent?.id || null, to, role });
});
