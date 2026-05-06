# Phase 5.8 — On-Page SEO Audit

**Date:** 2026-05-05
**Build:** post Phase 5.7 (a11y-clean)
**Site:** Vietnamese local-business landing site (Thiên Long Ninh Thuận — construction-testing services, Khánh Hòa)
**Primary goal:** local brand visibility + lead capture
**Audit method:** automated scan of every defined route via `scripts/seo-scan.mjs` (Playwright), plus manual inspection of static deliverables and the initial HTML response served by the SPA.
**Scope:** on-page SEO (per design phase 5.8) + crawlability/technical foundations because the SPA architecture has SEO implications. Authority signals scored directionally only — no GSC/Analytics access.
**Tooling caveats:** scores reflect SEO **readiness**, not rankings.

---

## Executive Summary

The clone has a strong on-page foundation: every route ships a unique title, a single h1, a canonical URL, OpenGraph + Twitter Card meta, LocalBusiness JSON-LD on every page, and BreadcrumbList + Article/CreativeWork schema on detail pages. Lighthouse desktop scored 100 (Phase 5.4) and the build is WCAG 2.1 AA clean (Phase 5.7) — both indirect SEO signals.

The score is held back by **deployment-readiness gaps**, not architectural problems:

1. **Two `<meta name="description">` tags ship in the live `<head>`** — the static one from `index.html` and the per-page one Helmet inserts. Crawlers (and browsers) typically use the first, which means every route currently surfaces the default description.
2. **Missing `robots.txt` and `sitemap.xml`** — the SPA fallback returns `index.html` for both, so neither file is actually served. Crawl efficiency suffers.
3. **`og:image` references `https://thienlongninhthuan.com/og-default.jpg` but no such file exists in `public/`** — social shares will render with no image.
4. **The site is a static SPA with no prerendering.** Initial HTML (pre-JS) is the same shell for every URL, with the default title/description. Googlebot executes JS so this is workable, but Bing/social crawlers / non-JS bots see only the shell.

Each of these is small in effort and contains the entire deduction.

---

## SEO Health Index

* **Overall Score:** **83 / 100**
* **Health Status:** **Good** (75–89 band)

### Category Breakdown

| Category | Score | Weight | Weighted Contribution |
|---|---:|---:|---:|
| Crawlability & Indexation | 65 | 30 | 19.50 |
| Technical Foundations | 95 | 25 | 23.75 |
| On-Page Optimization | 80 | 20 | 16.00 |
| Content Quality & E-E-A-T | 93 | 15 | 13.95 |
| Authority & Trust | 95 | 10 | 9.50 |
| **Total** | | | **82.70 → 83** |

**What is limiting the score from being higher:**
- Missing crawl-control assets (robots.txt, sitemap.xml) — single biggest deduction.
- Duplicate description tag — every page is currently advertising the default.
- Missing `og-default.jpg` asset.
- No prerendering for non-JS crawlers — architectural choice (Decision Log #16); fixable without full SSR via build-time prerender.

---

## Findings

### F1 — Duplicate `<meta name="description">` shipped in `<head>`
- **Category:** On-Page Optimization
- **Severity:** Critical · **Confidence:** High
- **Evidence:** On `/du-an/du-an-mau-1`, `document.querySelectorAll('meta[name="description"]')` returns two elements. The first is the static `<meta name="description">` from `index.html` with the global default copy ("Công ty TNHH Xây dựng và Thương mại Thiên Long Ninh Thuận — đơn vị thí nghiệm, kiểm định và thi công xây dựng tại Khánh Hòa…"). The second is the Helmet-injected one with the project-specific summary ("Mô tả ngắn về dự án mẫu số 1…"). Reproduced on every route with a non-default description.
- **Why it matters:** Crawlers that pick the first meta description (the dominant behavior) see the same default description on all 18 routes. Page-level descriptions are effectively dead. SERP snippets will not differentiate pages.
- **Score impact:** −15 (On-Page Optimization).
- **Recommendation:** Remove the static `<meta name="description">` from `index.html` and let Helmet own per-page descriptions. Trade-off: pre-JS crawlers won't see *any* description until JS runs — acceptable for Googlebot; mitigated long-term by F4 (prerendering).

### F2 — `robots.txt` is missing (served as the SPA shell)
- **Category:** Crawlability & Indexation
- **Severity:** Critical · **Confidence:** High
- **Evidence:** `curl /robots.txt` returns HTTP 200 with the body of `index.html` (the SPA fallback). No actual `robots.txt` file exists in `public/` (in fact, `public/` does not exist). The vite preview's static-asset handler can't find one and falls through to the SPA route.
- **Why it matters:** Without a real `robots.txt`, search engines can't read crawl directives or find the sitemap reference. Some bots interpret an HTML response at `/robots.txt` as a misconfiguration and may de-prioritize the site.
- **Score impact:** −10 (Crawlability & Indexation).
- **Recommendation:** Add `public/robots.txt` containing at minimum `User-agent: *`, `Allow: /`, and `Sitemap: https://thienlongninhthuan.com/sitemap.xml`.

### F3 — `sitemap.xml` is missing (served as the SPA shell)
- **Category:** Crawlability & Indexation
- **Severity:** Critical · **Confidence:** High
- **Evidence:** `curl /sitemap.xml` returns 200 with the SPA shell body, same as `robots.txt`. No sitemap is generated at build time.
- **Why it matters:** With 19 static routes plus dynamic detail pages, a sitemap is the most efficient way to communicate the URL inventory + last-modified dates to search engines. Without it, indexation depends entirely on internal-link discovery, slowing initial coverage.
- **Score impact:** −10 (Crawlability & Indexation).
- **Recommendation:** Generate `public/sitemap.xml` at build time from the route map and the `projects.json` / `news.json` slugs (e.g. via a small build script).

### F4 — Static SPA with no prerendering
- **Category:** Crawlability & Indexation
- **Severity:** High · **Confidence:** High
- **Evidence:** `curl http://127.0.0.1:4173/du-an/du-an-mau-1` returns the bare `index.html` shell with the *default* title and description. The route's real metadata is only present after the SPA hydrates.
- **Why it matters:** Googlebot does execute JS, so the practical impact for Google indexing is small but non-zero. However: Bingbot, social-card crawlers (Facebook, LinkedIn, Twitter, Zalo), and some Vietnam-specific crawlers do not run JS, and will see the default title/description for every URL. This collapses ~19 distinct landing pages into one as far as those crawlers are concerned.
- **Score impact:** −10 (Crawlability & Indexation).
- **Recommendation:** Add a build-time prerender (e.g. `vite-plugin-prerender-spa-plugin` or `react-snap`) that crawls the local app and writes a real HTML file per route to `dist/`. Same SPA at runtime, real per-route HTML for crawlers. The design's Decision Log #16 ("Static deploy") is unaffected — output remains static.

### F5 — `og:image` references a non-existent asset
- **Category:** On-Page Optimization
- **Severity:** Medium · **Confidence:** High
- **Evidence:** `SEO.jsx` defaults `image` to `${SITE_URL}/og-default.jpg`. `curl /og-default.jpg` against the preview returns the SPA shell (the file does not exist; `public/` is empty). Detail pages that do specify a project/article thumbnail get a real URL — but those URLs (e.g. `/assets/projects/slug-thumb.jpg` per the schema) also don't exist yet pending Phase 4 scrape.
- **Why it matters:** Facebook/LinkedIn/Twitter/Zalo previews render no image, hurting CTR on social shares.
- **Score impact:** −5 (On-Page Optimization).
- **Recommendation:** Add a 1200×630 branded `og-default.jpg` to `public/`. Update detail-page thumbnails as Phase 4 scrape fills in.

### F6 — Soft 404: unmatched routes return 200 with the SPA shell
- **Category:** Crawlability & Indexation
- **Severity:** Medium · **Confidence:** High
- **Evidence:** `curl -o /dev/null -w "%{http_code}" /no-such-route` returns `200` and the SPA shell. The client-side `*` route renders the styled NotFound page (with `<meta name="robots" content="noindex,nofollow">` from `<SEO noIndex>` — good), but the HTTP status remains 200.
- **Why it matters:** Bots that do not run JS see a 200 with the default title — a classic soft-404 pattern. Search Console will likely flag these as "Soft 404" once any external link points to a misspelled URL.
- **Score impact:** −5 (Crawlability & Indexation), already reflected in F2/F3 deductions.
- **Recommendation:** Configure the deployment platform to return real 404 status for unknown SPA paths *or* rely on the `noindex` meta + prerendered NotFound (F4) so the bot reads the meta. Vercel allows custom 404 pages via `vercel.json` `routes`.

### F7 — `favicon.ico` missing (404), `favicon.svg` falls through to SPA
- **Category:** Technical Foundations
- **Severity:** Low · **Confidence:** High
- **Evidence:** `curl /favicon.ico` → 404. `curl /favicon.svg` → 200 SPA shell. Neither is a real favicon.
- **Why it matters:** Browsers flood the console with favicon errors; SERP listings may show a generic globe icon.
- **Score impact:** −5 (Technical Foundations).
- **Recommendation:** Add a small `public/favicon.svg` + `public/favicon.ico` and a `<link rel="icon">` in `index.html`.

### F8 — Privacy/Terms links go to `href="#"`
- **Category:** Authority & Trust Signals
- **Severity:** Medium · **Confidence:** High
- **Evidence:** `src/components/layout/Footer.jsx:123` and `:127`: `<a href="#">Chính sách bảo mật</a>` and `<a href="#">Điều khoản sử dụng</a>`.
- **Why it matters:** Trust signals (privacy + terms) are an E-E-A-T factor, especially for local-business / lead-gen sites. Empty links also confuse users and bots.
- **Score impact:** −5 (Authority & Trust).
- **Recommendation:** Either link to real pages or remove the placeholders until those pages exist.

### F9 — Listing pages use placeholder data
- **Category:** Content Quality & E-E-A-T
- **Severity:** Medium · **Confidence:** High
- **Evidence:** `src/data/projects.json` and `news.json` contain stubs ("Dự án mẫu 01", "Bài viết mẫu số 1", `summary: "Mô tả ngắn về dự án mẫu số 1 phục vụ phát triển giao diện."`).
- **Why it matters:** Placeholder content is shallow and reads as filler. Search engines reward original/in-depth content. This is also the motivation behind Phase 4 of the design — content is expected to be replaced with the scrape.
- **Score impact:** −5 (Content Quality), only partial since the design explicitly defers this work to Phase 4.
- **Recommendation:** Complete Phase 4 (project + news scrape) before public launch.

### F10 — Missing visible author attribution on news articles
- **Category:** Content Quality & E-E-A-T
- **Severity:** Low · **Confidence:** Medium
- **Evidence:** `NewsDetail.jsx` renders the author when present in JSON, but `news.json` stubs ship without an author. JSON-LD falls back to "Thiên Long Ninh Thuận" (the org), which is fine, but visible UI shows no by-line.
- **Why it matters:** Author attribution is a recognized E-E-A-T signal. Less critical for an org-authored news feed, but worth filling in if real reporters/PMs exist.
- **Score impact:** −2 (Content Quality, ×0.5 for medium confidence = −1).
- **Recommendation:** Populate the `author` field in `news.json` with real names where available.

---

## Prioritized Action Plan

### Critical Blockers (must fix before launch — restores ~30 points)

1. **F1** — Remove the static `<meta name="description">` from `index.html`.
2. **F2** — Add `public/robots.txt` with `Sitemap:` reference.
3. **F3** — Generate `public/sitemap.xml` at build time from the route map + JSON data.
4. **F4** — Wire build-time prerendering so each route has real per-route HTML for non-JS crawlers.

### High-Impact Improvements (~10 points)

5. **F5** — Add a 1200×630 `public/og-default.jpg` social card.
6. **F6** — Configure the host (Vercel `vercel.json`) to serve real 404 status for unmatched paths.

### Quick Wins (~7 points)

7. **F7** — Drop in `favicon.svg` + `favicon.ico` and link them in `index.html`.
8. **F8** — Either build privacy + terms pages or remove the empty `href="#"` links from `Footer.jsx`.

### Longer-Term Opportunities

9. **F9** — Phase 4 scrape (already on the roadmap) replaces placeholder data with real content.
10. **F10** — Populate news authors as real content lands.
11. Consider adding `ItemList` JSON-LD on `/du-an` and `/tin-tuc` listing pages and `Service` schema on `/dich-vu`.

---

## Limitations

- Score reflects SEO **readiness**, not guaranteed rankings.
- Authority assessment is directional only (no GSC/backlink data).
- External factors (competitors, algorithm updates) are not scored.
- No production deployment was tested; static-asset behavior at the deployment platform may differ from the Vite preview server.
