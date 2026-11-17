# Sending the invite email

This is the only part of Meridian that runs on a server, and it exists
for one reason: the browser cannot send email, and it must not hold a
key that could. Anything in `config.js` is downloaded by every visitor,
so an email provider's key there would let a stranger send mail as you,
to anybody. The key lives on Supabase's side instead, and the function
only accepts a request from somebody who is signed in and who actually
**owns** the trip — not merely a member of it, or any invited person
could use your account as a mail relay.

Access and email are separate on purpose. The database row that grants
access is written by the browser and has already succeeded before this
function is called. If the email then fails, the access still stands,
and the share dialog says which of the two happened rather than
implying both.

---

## 1. An email sender

Resend is free for 3,000 messages a month, which for a personal trip
planner is effectively unlimited, and it does not need a credit card
to start.

1. Sign up at <https://resend.com>
2. **Add a domain** under Domains, and add the DNS records it gives you
   (SPF and DKIM, usually three records at your registrar). This takes
   about ten minutes, most of which is waiting for DNS.
3. Create an API key under API Keys. It starts `re_`.

### If you cannot verify a domain

A `*.vercel.app` subdomain **can never be verified**. Verifying means
adding DNS records, and Vercel owns that zone — there is nowhere to put
them. This is not a Meridian limitation; every transactional sender
works this way, because without it anyone could send mail as anyone.

Three honest options:

1. **Buy a domain** (about £8–12 a year). Verify it in Resend, point it
   at the Vercel app too if you like, and email works for everybody.
   This is the only one that lets you invite other people by email.
2. **Skip `INVITE_FROM` entirely.** The function then sends from
   Resend's own `onboarding@resend.dev`. Resend will deliver that
   **only to the address your Resend account was opened with** — so it
   is good for proving the whole path works end to end, and useless for
   inviting anybody else. The function detects the refusal and says so
   in those words rather than failing obscurely.
3. **Use the "write it in your own email app" button** in the share
   dialog. It grants the access, makes the link, and hands the finished
   message to whatever mail app you already use — your own address, your
   own deliverability, no domain, no provider, no function to deploy.
   For a personal trip planner this is genuinely the sensible answer,
   and it works today.

Any provider with an HTTP API works — Postmark, SendGrid, Mailgun. Only
the `fetch` block near the bottom of `send-invite/index.ts` would change.

---

## 2. Deploy it

Install the CLI once:

```bash
npm install -g supabase
```

Then, from the project root:

```bash
# link this folder to your Supabase project (the ref is in the
# dashboard URL: app.supabase.com/project/<ref>)
supabase link --project-ref YOUR_PROJECT_REF

# the two secrets. These never leave Supabase.
supabase secrets set RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
supabase secrets set INVITE_FROM="Meridian <trips@yourdomain.com>"

# ship it
supabase functions deploy send-invite
```

`SUPABASE_URL`, `SUPABASE_ANON_KEY` and `SUPABASE_SERVICE_ROLE_KEY` are
provided automatically — do not set them, and do not put the service
role key anywhere near `config.js`.

`INVITE_FROM` has to be at a domain you verified in step 1, or Resend
refuses the message and the share dialog will show you its reason
verbatim.

---

## 3. Check it

In the share dialog, choose **Can view** or **Can edit**, type an
address, press **Send**. One of three things happens, and the dialog
says which:

| What you see | What it means |
|---|---|
| "has been emailed the link" | working |
| "no email was sent — the send-invite function is not deployed yet" | step 2 has not run, or the deploy failed |
| "the email did not go: …" | the function ran and the provider refused. The message is the provider's own — a wrong sender domain says so precisely |

In all three cases the person **has** access and the link is in the
"Live links" list, so you can always send it by hand.

Logs:

```bash
supabase functions logs send-invite --tail
```

---

## 4. What it sends

A short message with the trip name, who shared it, an optional line you
typed, and the link. Plain text as well as HTML, because a lot of
clients show the text part and an HTML-only message is far more likely
to be filed as spam. `reply_to` is set to your own address, so a reply
reaches you rather than vanishing.

The link it sends is the share link the browser made at that moment, so
it carries the permission you chose. Turning that link off in the share
dialog kills the one in the email too.

---

## Not doing this?

Everything else works without it. The share dialog's **Send a link**
half needs no server at all — it makes a link, you copy it, you send it
however you like. The email function only removes the copying.
