#!/usr/bin/env node
/**
 * Deployment-readiness validator. Runs against either the local `vite preview`
 * (default) or a live deploy via BASE=https://… .
 *
 * Vite preview vs Vercel: Vite serves any unknown path as the SPA shell with
 * status 200. Vercel will do the same once vercel.json's rewrite is in place.
 * Static files in public/ are served by Vite and Vercel identically.
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const BASE = process.env.BASE ?? 'http://127.0.0.1:4173';
const ROOT = path.resolve('.');
const IS_LIVE = !BASE.includes('127.0.0.1') && !BASE.includes('localhost');

let pass = 0;
let fail = 0;
let warn = 0;
const failures = [];
const warnings = [];

function ok(msg) { console.log(`  ✓ ${msg}`); pass++; }
function bad(msg) { console.log(`  ✗ ${msg}`); fail++; failures.push(msg); }
function note(msg) { console.log(`  ⚠ ${msg}`); warn++; warnings.push(msg); }

function section(title) { console.log(`\n— ${title}`); }

async function head(p) {
  const res = await fetch(BASE + p, { method: 'GET', redirect: 'manual' });
  // Read tiny prefix to avoid keeping connections; HEAD on Vite preview returns 405
  const buf = await res.arrayBuffer();
  return {
    status: res.status,
    contentType: res.headers.get('content-type') ?? '',
    cacheControl: res.headers.get('cache-control') ?? '',
    body: new Uint8Array(buf),
    bodyText: () => new TextDecoder().decode(buf),
    headers: Object.fromEntries(res.headers.entries()),
  };
}

// ------------------------------------------------------------------ vercel.json
async function validateVercelJson() {
  section('vercel.json');
  const p = path.join(ROOT, 'vercel.json');
  let cfg;
  try {
    cfg = JSON.parse(await fs.readFile(p, 'utf8'));
  } catch (e) {
    bad(`vercel.json missing or invalid JSON: ${e.message}`);
    return;
  }
  ok('vercel.json parses as JSON');

  // SPA rewrite present and excludes assets + dotted files
  const rewrite = cfg.rewrites?.[0];
  if (!rewrite) bad('vercel.json has no rewrites array');
  else if (rewrite.destination !== '/index.html') bad(`SPA rewrite destination should be /index.html, got ${rewrite.destination}`);
  else {
    ok('SPA rewrite present → /index.html');
    // Validate the regex actually does what we want
    const re = new RegExp('^' + rewrite.source.replace(/^\//, '') + '$');
    const cases = [
      { url: 'du-an/du-an-mau-1', shouldMatch: true },
      { url: 'tin-tuc/x', shouldMatch: true },
      { url: 'thu-vien/giay-phep-kinh-doanh', shouldMatch: true },
      { url: 'no-such-route', shouldMatch: true },
      { url: 'assets/index-abc123.js', shouldMatch: false },
      { url: 'favicon.svg', shouldMatch: false },
      { url: 'robots.txt', shouldMatch: false },
      { url: 'sitemap.xml', shouldMatch: false },
    ];
    let regexFails = 0;
    for (const c of cases) {
      const matched = re.test(c.url);
      if (matched !== c.shouldMatch) {
        bad(`rewrite regex: "${c.url}" should ${c.shouldMatch ? '' : 'NOT '}match — got ${matched}`);
        regexFails++;
      }
    }
    if (regexFails === 0) ok(`rewrite regex correct on ${cases.length} test cases`);
  }

  // Headers
  const headerSources = (cfg.headers ?? []).map((h) => h.source);
  const wantHeaderSources = ['/assets/(.*)', '/(.*)'];
  for (const src of wantHeaderSources) {
    if (headerSources.includes(src)) ok(`header rule covers ${src}`);
    else bad(`header rule missing for ${src}`);
  }
  const securityRule = cfg.headers?.find((h) => h.source === '/(.*)');
  const securityKeys = (securityRule?.headers ?? []).map((h) => h.key);
  for (const k of ['X-Content-Type-Options', 'X-Frame-Options', 'Referrer-Policy']) {
    if (securityKeys.includes(k)) ok(`security header set: ${k}`);
    else bad(`security header missing: ${k}`);
  }
}

// ------------------------------------------------------------------ build artifact
async function validateBuildArtifact() {
  section('Build artifact (dist/)');
  const dist = path.join(ROOT, 'dist');
  try { await fs.access(dist); } catch { bad('dist/ missing — run `npm run build`'); return; }
  ok('dist/ exists');

  for (const f of ['index.html', 'robots.txt', 'sitemap.xml', 'favicon.svg']) {
    try { await fs.access(path.join(dist, f)); ok(`dist/${f}`); }
    catch { bad(`dist/${f} missing`); }
  }

  // assets dir + lazy chunks
  const assets = await fs.readdir(path.join(dist, 'assets')).catch(() => []);
  if (assets.length === 0) bad('dist/assets is empty');
  else {
    ok(`dist/assets has ${assets.length} files`);
    const expectedChunks = ['About', 'Contact', 'NewsDetail', 'ProjectDetail', 'Projects', 'News', 'Services', 'NotFound', 'LibraryPage'];
    for (const c of expectedChunks) {
      const matched = assets.some((f) => f.startsWith(`${c}-`) && f.endsWith('.js'));
      if (matched) ok(`lazy chunk present: ${c}-*.js`);
      else bad(`lazy chunk missing: ${c}-*.js`);
    }
  }

  // No source maps in production (privacy/perf)
  const srcMaps = assets.filter((f) => f.endsWith('.map'));
  if (srcMaps.length === 0) ok('no source maps shipped');
  else note(`${srcMaps.length} source map(s) in dist/assets — fine but exposes source`);
}

// ------------------------------------------------------------------ index.html
async function validateIndexHtml() {
  section('index.html');
  const r = await head('/');
  if (r.status !== 200) bad(`/ → ${r.status}`);
  else ok('/ → 200');
  const html = r.bodyText();
  if (html.includes('<html lang="vi">')) ok('lang="vi" declared');
  else bad('lang="vi" missing on <html>');
  if (html.includes('rel="icon"')) ok('favicon link present');
  else bad('<link rel="icon"> missing');
  if (html.includes('og-default.jpg')) note('og-default.jpg referenced (verify file exists in public/)');
  if (html.match(/<script[^>]+src="\/assets\//)) ok('hashed JS bundle linked');
  else bad('no /assets/*.js script in index.html');
  // No leftover dev-only links
  if (html.includes('localhost') || html.includes('127.0.0.1')) bad('localhost reference in index.html');
  else ok('no localhost references in index.html');
}

// ------------------------------------------------------------------ static files
async function validateStaticFiles() {
  section('Static files (real, not SPA shell)');
  const cases = [
    { path: '/robots.txt', mustContain: 'Sitemap:', ct: 'text/plain' },
    { path: '/sitemap.xml', mustContain: '<urlset', ct: 'xml' },
    { path: '/favicon.svg', mustContain: '<svg', ct: 'image/svg' },
  ];
  for (const c of cases) {
    const r = await head(c.path);
    if (r.status !== 200) { bad(`${c.path} → ${r.status}`); continue; }
    const body = r.bodyText();
    if (body.startsWith('<!doctype html>') || body.startsWith('<!DOCTYPE html>')) {
      bad(`${c.path} → SPA shell (file not found, fell through to index.html)`);
      continue;
    }
    if (!body.includes(c.mustContain)) {
      bad(`${c.path} → body missing "${c.mustContain}"`);
      continue;
    }
    if (!r.contentType.toLowerCase().includes(c.ct.toLowerCase())) {
      note(`${c.path} → Content-Type "${r.contentType}", expected to contain "${c.ct}"`);
    }
    ok(`${c.path} → 200, real file (${body.length} bytes)`);
  }
}

// ------------------------------------------------------------------ sitemap content
async function validateSitemap() {
  section('Sitemap content');
  const r = await head('/sitemap.xml');
  if (r.status !== 200) { bad('cannot fetch sitemap'); return; }
  const xml = r.bodyText();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  ok(`sitemap has ${urls.length} URLs`);

  if (urls.length < 16) bad(`sitemap should have ≥ 16 URLs, has ${urls.length}`);
  // Each URL must point to live host
  const wrongHost = urls.filter((u) => !u.startsWith('https://gianguyenkhanhhoa.vn'));
  if (wrongHost.length === 0) ok('all sitemap URLs are absolute https://gianguyenkhanhhoa.vn');
  else bad(`${wrongHost.length} sitemap URL(s) wrong host: ${wrongHost.slice(0, 3).join(', ')}…`);

  // Spot-check that sitemap routes actually resolve
  const sample = urls.slice(0, 5).map((u) => new URL(u).pathname);
  for (const p of sample) {
    const res = await head(p);
    if (res.status === 200) ok(`sitemap URL ${p} → 200`);
    else bad(`sitemap URL ${p} → ${res.status}`);
  }
}

// ------------------------------------------------------------------ referenced assets
async function validateReferencedAssets() {
  section('Asset references in code');
  const refs = [
    { path: '/og-default.jpg', referencedIn: 'SEO.jsx, OrganizationSchema.jsx' },
    { path: '/logo.png', referencedIn: 'OrganizationSchema.jsx (JSON-LD logo)' },
    { path: '/favicon.svg', referencedIn: 'index.html' },
  ];
  for (const ref of refs) {
    const r = await head(ref.path);
    if (r.status !== 200) bad(`${ref.path} → ${r.status} (referenced in ${ref.referencedIn})`);
    else if (r.bodyText().startsWith('<!doctype')) bad(`${ref.path} → SPA shell, not a real file (referenced in ${ref.referencedIn})`);
    else ok(`${ref.path} → 200 (referenced in ${ref.referencedIn})`);
  }
}

// ------------------------------------------------------------------ headers (live only)
async function validateHeaders() {
  if (!IS_LIVE) {
    section('Response headers');
    note('cache-control + security headers checked only against a live deploy (Vite preview does not apply vercel.json). Re-run with BASE=https://… after deploy.');
    return;
  }
  section('Response headers (live)');
  const asset = await head('/sitemap.xml');
  if (asset.cacheControl.includes('max-age=3600')) ok('sitemap.xml Cache-Control: 3600s');
  else bad(`sitemap.xml Cache-Control = "${asset.cacheControl}"`);

  const root = await head('/');
  for (const h of ['x-content-type-options', 'x-frame-options', 'referrer-policy']) {
    if (root.headers[h]) ok(`/ has ${h}: ${root.headers[h]}`);
    else bad(`/ missing security header ${h}`);
  }
}

// ------------------------------------------------------------------ build cleanliness
async function validateBundleCleanliness() {
  section('Bundle cleanliness');
  const assetsDir = path.join(ROOT, 'dist', 'assets');
  const files = await fs.readdir(assetsDir).catch(() => []);
  const jsFiles = files.filter((f) => f.endsWith('.js'));

  let totalRaw = 0;
  let consoleHits = 0;
  let consoleSamples = [];
  for (const f of jsFiles) {
    const buf = await fs.readFile(path.join(assetsDir, f), 'utf8');
    totalRaw += buf.length;
    // Naive check: 'console.log(' string in minified output
    const matches = (buf.match(/console\.log\(/g) ?? []).length;
    if (matches > 0) {
      consoleHits += matches;
      consoleSamples.push(`${f}:${matches}`);
    }
  }
  const totalKb = Math.round(totalRaw / 1024);
  ok(`total raw JS: ${totalKb} kB across ${jsFiles.length} files`);
  if (totalKb > 700) note(`total JS > 700 kB raw — consider bundle audit`);
  if (consoleHits === 0) ok('no console.log() in production bundle');
  else note(`console.log() in bundle: ${consoleHits} hit(s) — ${consoleSamples.join(', ')} (Contact form stub is expected; verify intent)`);
}

// ------------------------------------------------------------------ smoke summary
async function validateRoutes() {
  section('Route smoke (subset)');
  const routes = ['/', '/du-an', '/du-an/du-an-mau-1', '/du-an/missing-slug', '/lien-he', '/no-such-route'];
  for (const p of routes) {
    const r = await head(p);
    if (IS_LIVE) {
      // On live, /no-such-route ideally returns 404; SPA fallback returns 200 with NotFound page
      const expected = p === '/no-such-route' ? [200, 404] : [200];
      if (expected.includes(r.status)) ok(`${p} → ${r.status}`);
      else bad(`${p} → ${r.status}`);
    } else {
      if (r.status === 200) ok(`${p} → 200 (SPA shell)`);
      else bad(`${p} → ${r.status}`);
    }
  }
}

// ------------------------------------------------------------------ run
(async () => {
  console.log(`Validating ${BASE}  (${IS_LIVE ? 'LIVE' : 'local preview'})`);

  await validateVercelJson();
  await validateBuildArtifact();
  await validateIndexHtml();
  await validateStaticFiles();
  await validateSitemap();
  await validateReferencedAssets();
  await validateHeaders();
  await validateBundleCleanliness();
  await validateRoutes();

  console.log(`\n— Summary —`);
  console.log(`  pass: ${pass}`);
  console.log(`  warn: ${warn}`);
  console.log(`  fail: ${fail}`);
  if (warn) {
    console.log(`\nWarnings:`);
    warnings.forEach((w) => console.log(`  - ${w}`));
  }
  if (fail) {
    console.log(`\nFailures:`);
    failures.forEach((f) => console.log(`  - ${f}`));
    process.exit(1);
  }
})();
