#!/usr/bin/env node
/* ===========================================================
   diagnose-network.js — tells us what your machine can reach.

   Wikimedia is being blocked for you somewhere below the browser:
   Chrome says ERR_BLOCKED_BY_CLIENT even in incognito, and Node
   cannot fetch it either, while nps.gov works fine. That pattern
   means antivirus, a DNS filter, a VPN, or a router rule aimed at
   wikimedia.org.

   This tries the same image down several different roads and
   reports which, if any, get through. Nothing is downloaded beyond
   a few small test images.

   Usage:   node tools/diagnose-network.js
   =========================================================== */

const dns = require('dns').promises;

/* one small, real Wikimedia thumbnail */
const HOSTPATH = 'upload.wikimedia.org/wikipedia/commons/thumb/1/17/Birmingham%2C_Alabama.jpg/320px-Birmingham%2C_Alabama.jpg';
const DIRECT = 'https://' + HOSTPATH;

const ROUTES = [
  ['direct',     DIRECT],
  ['wsrv',       'https://wsrv.nl/?url=' + HOSTPATH],
  ['weserv',     'https://images.weserv.nl/?url=' + HOSTPATH],
  ['statically', 'https://cdn.statically.io/img/' + HOSTPATH],
  ['allorigins', 'https://api.allorigins.win/raw?url=' + encodeURIComponent(DIRECT)],
  ['codetabs',   'https://api.codetabs.com/v1/proxy?quest=' + encodeURIComponent(DIRECT)]
];

/* controls: things that should work if the internet works at all */
const CONTROLS = [
  ['nps.gov',   'https://www.nps.gov/common/uploads/structured_data/1F147B77-D1E9-3D10-61ABDA0E4A8D803D.jpg'],
  ['wikipedia api', 'https://en.wikipedia.org/api/rest_v1/page/summary/Birmingham,_Alabama'],
  ['github',    'https://raw.githubusercontent.com/github/docs/main/README.md']
];

async function hit(url, ms){
  const ctl = new AbortController();
  const to = setTimeout(() => ctl.abort(), ms || 15000);
  const t0 = Date.now();
  try {
    const r = await fetch(url, {
      headers: { 'User-Agent': 'MeridianAtlas/1.0 (travel atlas; diagnostics)', 'Accept': '*/*' },
      signal: ctl.signal
    });
    const buf = Buffer.from(await r.arrayBuffer());
    clearTimeout(to);
    return { ok: r.ok && buf.length > 500, status: r.status, bytes: buf.length, ms: Date.now() - t0 };
  } catch(e){
    clearTimeout(to);
    return { ok: false, status: '—', bytes: 0, ms: Date.now() - t0, err: (e.cause && e.cause.code) || e.name || e.message };
  }
}

function line(name, r){
  const mark = r.ok ? ' OK  ' : 'FAIL ';
  console.log('  ' + mark + name.padEnd(14)
    + String(r.status).padEnd(6)
    + (r.bytes ? (r.bytes + ' bytes').padEnd(14) : ''.padEnd(14))
    + (r.ms + 'ms').padEnd(9)
    + (r.err || ''));
}

(async function main(){
  console.log('\nMERIDIAN NETWORK DIAGNOSTIC\n' + '='.repeat(60));

  /* does the name even resolve? */
  console.log('\n1. Can this machine resolve upload.wikimedia.org?');
  try {
    const a = await dns.lookup('upload.wikimedia.org');
    console.log('   resolves to ' + a.address);
    if (/^(0\.0\.0\.0|127\.|::1)/.test(a.address))
      console.log('   ^ that is a blackhole address — a DNS filter (Pi-hole, NextDNS,\n'
                + '     router parental controls or antivirus) is nulling it out.');
  } catch(e){
    console.log('   DNS FAILED: ' + (e.code || e.message));
    console.log('   ^ the name does not resolve at all — a DNS-level block.');
  }

  console.log('\n2. Controls — these should work:');
  for (const [n, u] of CONTROLS) line(n, await hit(u, 15000));

  console.log('\n3. Routes to the same Wikimedia image:');
  const results = {};
  for (const [n, u] of ROUTES){ const r = await hit(u, 20000); results[n] = r; line(n, r); }

  /* ---- verdict ---- */
  console.log('\n' + '='.repeat(60));
  const working = Object.keys(results).filter(k => results[k].ok);
  if (results.direct && results.direct.ok){
    console.log('Wikimedia is reachable directly. Run:\n   node tools/download-photos.js --direct');
  } else if (working.length){
    console.log('Wikimedia is blocked directly, but these routes work: ' + working.join(', '));
    console.log('\nRun:\n   node tools/download-photos.js --route=' + working[0]);
  } else {
    console.log('Nothing got through — not even the proxies.');
    console.log('That points at something filtering this machine or network as a whole:');
    console.log('  - antivirus web shield (Kaspersky, Avast, AVG, ESET, Bitdefender, Norton)');
    console.log('  - a VPN, or a company/school network');
    console.log('  - a DNS filter on the router');
    console.log('\nThings that usually work:');
    console.log('  1. Turn the VPN or the antivirus web-shield off for ten minutes and re-run.');
    console.log('  2. Run it on your phone hotspot instead. Once the images are on disk,');
    console.log('     the block never matters again — they are served from your own folder.');
    const anyControl = true;
    console.log('\nIf the controls in step 2 also failed, this machine has no working');
    console.log('internet from Node at all, which is a different problem.');
  }
  console.log('');
})();
