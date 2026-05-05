# Phase 5.12 — Deployment Validation

**Date:** 2026-05-06
**Build:** `dist/assets/index-MJyF0Q2X.js` (341.18 kB / 111.02 kB gzip)
**Tool:** `scripts/validate-deploy.mjs` (`npm run validate`)
**Mode:** local production-build via `vite preview`

> The validator is environment-agnostic. After `vercel --prod`, re-run with `BASE=https://gianguyenkhanhhoa.vn npm run validate` to verify the Vercel-specific behavior (rewrite, cache headers, security headers) end-to-end on the live deploy.

---

## Summary

**47 pass · 2 warn · 2 fail**

The two failures are both pre-known asset gaps surfaced in Phase 5.8 (SEO) and Phase 5.11 (deployment): `/og-default.jpg` and `/logo.png` are referenced by `SEO.jsx` and `OrganizationSchema.jsx` but no source files exist in `public/`. These need designed brand images (1200×630 OG card, square logo) that can't be code-generated. Everything else is green.

## What was validated

### `vercel.json` (8 ✓)
- Parses as JSON
- SPA rewrite present, destination `/index.html`
- **Regex correctness verified against 8 test cases**: `du-an/x`, `tin-tuc/x`, `thu-vien/giay-phep-kinh-doanh`, `no-such-route` all rewrite to SPA; `assets/index-*.js`, `favicon.svg`, `robots.txt`, `sitemap.xml` correctly bypass the rewrite.
- Header rules cover `/assets/(.*)` (immutable cache) and `/(.*)` (security headers)
- Security headers configured: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`

### Build artifact (12 ✓)
- `dist/` exists
- `dist/index.html`, `dist/robots.txt`, `dist/sitemap.xml`, `dist/favicon.svg` all emitted
- 23 files in `dist/assets/`
- All 9 expected lazy chunks present: `About`, `Contact`, `NewsDetail`, `ProjectDetail`, `Projects`, `News`, `Services`, `NotFound`, `LibraryPage`
- No source maps shipped to production

### `index.html` (5 ✓)
- `/ → 200`
- `<html lang="vi">` declared
- `<link rel="icon">` present
- Hashed JS bundle linked from `/assets/`
- No `localhost`/`127.0.0.1` references

### Static files served as real files, not SPA shell (3 ✓)
- `/robots.txt → 200` (99 B, real text)
- `/sitemap.xml → 200` (4620 B, real XML)
- `/favicon.svg → 200` (413 B, real SVG)

(Compare to Phase 5.8 where all three returned 200 with the SPA shell body.)

### Sitemap (8 ✓)
- 25 URLs (16 static + 3 project + 6 news, generated from `projects.json` + `news.json`)
- All `<loc>`s are absolute on `https://gianguyenkhanhhoa.vn`
- Spot-check: 5 sampled sitemap URLs all return 200 in the build

### Bundle cleanliness (1 ✓ · 1 warn)
- 461 kB raw JS across 21 files (well under the 700 kB soft budget)
- 1 `console.log(...)` in bundle, located in the lazy `Contact-*.js` chunk — that's the Contact form stub submit handler called out in design §5.4. Document this (or wrap in `if (import.meta.env.DEV)`) once a real submission target lands.

### Route smoke (6 ✓)
On local preview every route returns 200 with the SPA shell, including `/no-such-route` (the in-component `<NotFound>` body renders client-side; the `<SEO noIndex>` keeps the page out of search results). On the live Vercel deploy `/no-such-route` will likewise return 200 with the SPA shell — this is the expected SPA behavior. If a real 404 status code is needed for crawler hygiene, configure a Vercel `notFoundPage` route.

### Live-only checks (deferred · 1 warn)
Cache-Control and security response headers are applied by Vercel from `vercel.json` — `vite preview` doesn't honor that file. The validator skips those checks on local runs and provides explicit guidance to re-run with a live `BASE` after deploy.

---

## Failures (2)

### F1 — `/og-default.jpg` missing
- **Referenced in:** `src/components/SEO.jsx:9` (default `og:image` for every page) and `src/components/OrganizationSchema.jsx:13` (`image` field on `LocalBusiness` JSON-LD).
- **Effect:** Social shares (Facebook, LinkedIn, Twitter, Zalo) on every URL show no preview image.
- **Fix:** Drop a 1200×630 branded JPEG into `public/og-default.jpg`. Naming and path are already correct everywhere in the code.

### F2 — `/logo.png` missing
- **Referenced in:** `src/components/OrganizationSchema.jsx:12` (`logo` field on `LocalBusiness` JSON-LD).
- **Effect:** Google Knowledge Panel may not pick up the company logo.
- **Fix:** Drop a square (recommended ≥ 112×112, prefer ≥ 512×512) logo PNG into `public/logo.png`. Or change the JSON-LD reference to point at `favicon.svg` if the SVG is acceptable as a brand mark.

---

## Pre-deploy checklist

Before running `vercel --prod`:

- [ ] Add `public/og-default.jpg` (F1)
- [ ] Add `public/logo.png` (F2)
- [ ] Resolve email-address inconsistency (`Header.jsx` uses `hungnguyenanhanh@gmail.com`; everywhere else uses `lienhe@gianguyenkhanhhoa.vn`) — flagged in Phase 5.10 review
- [ ] Decide whether to keep the Contact form `console.log` or wrap it in `import.meta.env.DEV` — Phase 5.10 I3
- [ ] Confirm `Footer.jsx` social/policy `href="#"` are intentional placeholders or wire them up (Phase 5.10 M2)

## Post-deploy checklist

Once the site is live at `https://gianguyenkhanhhoa.vn`:

```sh
BASE=https://gianguyenkhanhhoa.vn npm run validate
BASE=https://gianguyenkhanhhoa.vn npm run smoke
BASE=https://gianguyenkhanhhoa.vn npm run a11y
BASE=https://gianguyenkhanhhoa.vn npm run seo-scan
```

That re-runs the full Phase 5 verification suite against the live deploy and exercises the Vercel-only paths (rewrite, cache headers, security headers, SSL, custom domain).

After the first live `npm run validate`:

- [ ] Submit `https://gianguyenkhanhhoa.vn/sitemap.xml` to Google Search Console
- [ ] Verify `robots.txt` is reachable and contains the `Sitemap:` directive
- [ ] Spot-check a deep-link refresh (e.g. `https://gianguyenkhanhhoa.vn/du-an/du-an-mau-1`) returns the project page directly, not a 404 — confirms the SPA rewrite is working
- [ ] Confirm `Cache-Control: max-age=31536000, immutable` on `/assets/*.js`
- [ ] Confirm security headers visible on `/` (Chrome DevTools → Network tab)
