# Design Document — thienlongninhthuan.com Pixel-Perfect Clone

**Stack:** Vite + React + TailwindCSS
**Target:** Full multi-page clone of `https://thienlongninhthuan.com/`
**Status:** Design approved — ready for implementation handoff
**Last updated:** 2026-05-04

---

## 1. Understanding Summary

- **What:** A pixel-perfect clone of `thienlongninhthuan.com` (Vietnamese construction-testing company landing site) built with Vite + React + TailwindCSS.
- **Why:** User has authorization to clone the site (own / authorized).
- **Who for:** Same audience as the source site (Vietnamese clients of Thiên Long Ninh Thuận construction-testing services).
- **Scope:** Full multi-page clone — 17 top-level routes from the nav (home, about, services, projects list, news list, contact, 10× library sub-pages: 6 under "Công bố năng lực" + 4 under "Thư viện") **plus** dynamic detail pages for projects (`/du-an/:slug`) and news (`/tin-tuc/:slug`), plus a `*` 404 fallback.
- **Content:** Static JSON files in `/src/data/` for projects and news. Assets (images, fonts, icons, PDFs) scraped from source and bundled locally.
- **Styling:** Themed Tailwind config (extracted color/typography tokens) + CSS modules for complex effects (gradients, animations).
- **Stack additions:** React Router v6 (multi-page), `react-helmet-async` (SEO), no backend, no analytics, no automated tests.

---

## 2. Assumptions

1. User has permission to clone the source site (confirmed).
2. Source-site assets are scrapable; one-time scrape is sufficient (content is mostly static).
3. News and project items are limited (≤ a few dozen each) — JSON is appropriate.
4. The contact form's destination email is provided before Phase 5 deploy. Until then, the form is a pure JS stub (`console.log` + success toast); the `mailto:` `action` fallback is added once the destination email is known.
5. Source-site fonts are either Google Fonts or licensable; if unclear, the closest Google Font is substituted.

---

## 3. Non-Goals

- No backend / API / database.
- No headless CMS.
- No multi-language i18n (Vietnamese only).
- No automated tests (unit, integration, or E2E).
- No deeper library document detail pages, no search, no filters beyond projects category.
- No analytics integration.
- No SSR/SSG (static SPA only).

---

## 4. Non-Functional Requirements

| # | Concern | Target |
|---|---|---|
| 1 | Browser support | Modern evergreen (Chrome, Edge, Firefox, Safari last 2 versions) |
| 2 | Responsiveness | Mobile-first, Tailwind default breakpoints |
| 3 | Performance | Lighthouse ≥ 90 desktop; lazy-load images; code-split routes |
| 4 | SEO | `react-helmet-async`; `lang="vi"`; per-page title/description/OG |
| 5 | Accessibility | Semantic HTML, alt text on all content images, full keyboard nav (tab order, focus rings, skip-to-content), color-contrast ≥ AA on text. Audited with axe DevTools in Phase 5; no formal third-party audit. |
| 6 | i18n | Vietnamese only |
| 7 | Forms | Client-side validation; submission stubbed |
| 8 | Analytics | None |
| 9 | Deployment | Static build; **Vercel** is the primary target (Netlify / GitHub Pages are supported alternatives) |
| 10 | Testing | No automated test suite. Phase 5 uses Playwright **manually** (one-off smoke checks of routes), not as a maintained suite. |

---

## 5. Design

### 5.1 Routing & Navigation

**Route map:**

| Path | Component | Source |
|---|---|---|
| `/` | `Home` | scraped homepage sections |
| `/gioi-thieu` | `About` | scraped |
| `/dich-vu` | `Services` | scraped |
| `/du-an` | `Projects` | reads `projects.json` |
| `/du-an/:slug` | `ProjectDetail` | finds item by slug |
| `/tin-tuc` | `News` | reads `news.json` |
| `/tin-tuc/:slug` | `NewsDetail` | finds item by slug |
| `/lien-he` | `Contact` | scraped + form stub |
| `/thu-vien/giay-phep-kinh-doanh` | `library/BusinessLicense` | scraped |
| `/thu-vien/cong-bo-nang-luc` | `library/CapacityDeclaration` | scraped |
| `/thu-vien/chung-nhan-du-dieu-kien` | `library/EligibilityCert` | scraped |
| `/thu-vien/hieu-chuan-thiet-bi` | `library/CalibrationCert` | scraped |
| `/thu-vien/danh-muc-thiet-bi` | `library/EquipmentList` | scraped |
| `/thu-vien/danh-sach-can-bo` | `library/StaffList` | scraped |
| `/thu-vien/ho-so-nang-luc` | `library/CompanyProfile` | scraped |
| `/thu-vien/tieu-chuan-thi-cong` | `library/ConstructionStandards` | scraped |
| `/thu-vien/tieu-chuan-thi-nghiem` | `library/TestingStandards` | scraped |
| `/thu-vien/excel-ung-dung` | `library/ExcelTools` | scraped |
| `*` | `NotFound` | 404 |

**Router setup:**
- `react-router-dom` v6+ with `createBrowserRouter`.
- All routes wrapped in `RootLayout` (Header + `<Outlet />` + Footer + scroll-to-top on route change).
- Library submenu: hover/click dropdown on desktop; accordion in mobile drawer.
- Active link via `<NavLink>`.

**Navigation data:**
`src/data/navigation.js` — single nested array used by both Header and Footer.

---

### 5.2 Theme, Tokens & Styling

**Extraction plan:** Inspect the live site (DevTools → Computed) and extract:
- **Colors:** brand palette (primary blue scale 50–900), accent, neutrals, status colors → `theme.extend.colors`.
- **Typography:** font families (Vietnamese-friendly sans, e.g. Be Vietnam Pro / Roboto), h1–h6 sizes, body, caption, line-heights.
- **Spacing:** non-Tailwind values (e.g. 72px section padding) → `theme.extend.spacing`.
- **Container:** `maxWidth.container = '1200px'`.
- **Shadows / radii:** card shadows, button radii.
- **Breakpoints:** Tailwind defaults unless source clearly differs.

**`tailwind.config.js` shape:**

```js
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: { brand: {/* 50..900 */}, accent: {/* ... */} },
      fontFamily: { sans: ['"Be Vietnam Pro"', 'system-ui', 'sans-serif'] },
      maxWidth: { container: '1200px' },
      spacing: { 'section-y': '5rem' },
      boxShadow: { card: '0 4px 16px rgba(0,0,0,.08)' },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
```

**CSS modules** are used only for:
- Complex multi-stop gradients with animation
- Keyframe animations (hero parallax, marquee, hover sweeps)
- Pseudo-element decorations
- 3rd-party widget overrides

Path: `src/styles/modules/<Component>.module.css`.

**Globals (`src/styles/index.css`):** `@tailwind base/components/utilities` + base resets + global font import + `:lang(vi)` rules + smooth scroll.

**Fonts:** Google Fonts via `<link>` with preconnect, or bundled `.woff2` if licensed/custom.

---

### 5.3 Components & Data Model

**Component layers:**

1. **UI primitives** (`src/components/ui/`) — `Container`, `Section`, `Button`, `Card`, `Heading`, `Icon`.
2. **Layout** (`src/components/layout/`) — `RootLayout`, `Header`, `MobileDrawer`, `Footer`, `Breadcrumbs`.
3. **Sections** (`src/components/sections/`) — `HeroBanner`, `AboutSummary`, `CoreCapabilities`, `ServicesGrid`, `FeaturedProjects`, `NewsTeaser`, `OfficeLocation`, `ContactForm`.
4. **Pages** (`src/pages/`) — compose layout + sections + data.

**`projects.json` schema:**

```json
[{
  "slug": "ten-du-an",
  "title": "Tên dự án",
  "category": "Khảo sát | Thi công | Tư vấn",
  "client": "Chủ đầu tư",
  "location": "Khánh Hòa",
  "year": 2024,
  "thumbnail": "/assets/projects/slug-thumb.jpg",
  "gallery": ["/assets/projects/slug-1.jpg"],
  "summary": "Mô tả ngắn",
  "description": "Mô tả dài",
  "tags": []  // free-form labels rendered on detail page; no tag-filter UI in v1
}]
```

**`news.json` schema:**

```json
[{
  "slug": "tieu-de-bai-viet",
  "title": "Tiêu đề",
  "publishedAt": "2025-03-15",
  "author": "Thiên Long Ninh Thuận",
  "thumbnail": "/assets/news/slug.jpg",
  "excerpt": "Tóm tắt",
  "body": "Nội dung HTML"
}]
```

**`navigation.js`:** nested array `{ label, path, children? }`.

**Data access:** direct `import` from JSON. Detail pages: `useParams()` → `find(p => p.slug === slug)` → 404 fallback. No state library.

---

### 5.4 Pages, Behavior & Edge Cases

**Page composition pattern:**

```jsx
<>
  <SEO title="..." description="..." />
  <Section variant="hero">...</Section>
  <Section>...</Section>
</>
```

`SEO` wraps `react-helmet-async` (title, meta description, OG tags, `<html lang="vi">`).

**Per-page summary:**

| Page | Sections | Notes |
|---|---|---|
| Home | Hero, About snippet, Capabilities, Services, Featured Projects (first 6 by JSON order), News teaser (first 3 by `publishedAt` desc), Office, CTA | Selection rules listed; manual reorder = reorder JSON |
| About | Hero, history, mission/vision, values, leadership | Static |
| Services | Hero + 3 service blocks with anchors | Static |
| Projects | Hero + category filter + grid | Filter via `useState` |
| ProjectDetail | Breadcrumbs, title, meta, gallery (lightbox), description, related | 404 if slug missing |
| News | Hero + grid, client-side pagination 12/page | |
| NewsDetail | Breadcrumbs, title, date, sanitized HTML body, related | DOMPurify |
| Contact | Hero, info, map iframe, form | Stub submit |
| Library × 10 | Hero + scraped content + PDFs in `/public/library/` | Static |
| NotFound | "404 — không tìm thấy trang" + back-home CTA | |

**Behavior:**
- Scroll-to-top on route change (custom hook in `RootLayout`).
- Active nav highlighting via `NavLink`.
- `loading="lazy"` on non-hero images; hero images preloaded.
- Lightbox: `yet-another-react-lightbox`.
- Form: HTML5 + minimal JS validation. **Default submit handler:** `console.log` of payload + show a success toast. **No-JS fallback:** form `action="mailto:..."` so the form still works if JS is disabled (destination email TBD).
- Carousel: `embla-carousel-react`.

**Edge cases:**
- Missing slug on a detail route (e.g. `/du-an/does-not-exist`) → render the `<NotFound />` **body** inside `ProjectDetail`/`NewsDetail` so the URL is preserved (no client redirect). The route-level `*` `NotFound` page only handles URLs that don't match any defined route.
- Empty news list → "Chưa có bài viết" empty state.
- Broken image → `onError` → placeholder.
- Mobile drawer auto-closes on route change.
- Long Vietnamese titles → `line-clamp-2` on cards.

**Error handling:** Top-level `<ErrorBoundary>` around `<Outlet />`. No async errors expected.

---

### 5.5 Build, Tooling & Workflow

**Runtime deps:**
- `react`, `react-dom` (^18)
- `react-router-dom` (^6)
- `react-helmet-async`
- `embla-carousel-react`
- `yet-another-react-lightbox`
- `dompurify`
- `clsx`

**Dev deps:**
- `vite` (^5), `@vitejs/plugin-react`
- `tailwindcss` (^3), `postcss`, `autoprefixer`
- `@tailwindcss/forms`, `@tailwindcss/typography`
- `eslint` + `eslint-plugin-react` + `eslint-plugin-react-hooks`
- `prettier` + `prettier-plugin-tailwindcss`

**Vite:** `@` alias → `src/`; `base: '/'`; target `es2020`; large images in `/public`.

**Local setup:**

```sh
node --version   # requires Node 18+ (Vite 5 minimum)
npm install      # install dependencies
npm run dev      # start dev server at http://localhost:5173
```

**Scripts:**

```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "eslint src --ext .js,.jsx",
  "format": "prettier --write \"src/**/*.{js,jsx,css,json}\""
}
```

**Asset scraping (one-time):**
1. Inventory `<img>`, background-images, fonts, icons, PDFs per route.
2. `wget -r -l 2 -A "jpg,jpeg,png,svg,webp,woff2,pdf" https://thienlongninhthuan.com/`.
3. Sort into `src/assets/{images,icons,fonts}/` and `public/library/`.
4. Optimize (WebP via `squoosh`/`sharp`).
5. Update JSON references.

**Project structure:**

```
/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── layout/
│   │   ├── ui/
│   │   └── sections/
│   ├── pages/
│   │   └── library/
│   ├── data/
│   ├── styles/
│   ├── router.jsx
│   ├── main.jsx
│   └── App.jsx
├── tailwind.config.js
├── vite.config.js
└── package.json
```

**Deployment:** Static `dist/` → Vercel/Netlify/GH Pages with SPA fallback (`vercel.json` rewrite or `_redirects`).

---

## 6. Phased Task Breakdown (with skills)

### Phase 1 — Scaffold

| # | Task | Skill |
|---|---|---|
| 1.1 | Initialize Vite + React project | `javascript-typescript-typescript-scaffold` |
| 1.2 | Install & configure TailwindCSS, PostCSS, Autoprefixer | `tailwind-design-system` |
| 1.3 | Configure ESLint + Prettier + `prettier-plugin-tailwindcss` | `frontend-dev-guidelines` |
| 1.4 | Set up `@/` path alias | `javascript-typescript-typescript-scaffold` |
| 1.5 | Install React Router; create `router.jsx` with placeholder routes | `react-patterns` |
| 1.6 | Build `RootLayout` (Header / Outlet / Footer / ScrollToTop) | `react-best-practices` |
| 1.7 | Build UI primitives | `react-component-performance` |
| 1.8 | Pre-allow common dev prompts | `fewer-permission-prompts` |
| 1.9 | Initial commit | `commit` |

### Phase 2 — Home page

| # | Task | Skill |
|---|---|---|
| 2.1 | Extract color/typography/spacing tokens into `tailwind.config.js` | `tailwind-design-system` |
| 2.2 | Scrape & integrate fonts + base resets | `web-scraper` |
| 2.3 | Build `Header` (logo, desktop nav, dropdown) | `radix-ui-design-system` |
| 2.4 | Build `MobileDrawer` (slide-in, accordion) | `mobile-design` |
| 2.5 | Build `Footer` | `frontend-design` |
| 2.6 | Build `HeroBanner` | `magic-ui-generator` |
| 2.7 | Build `AboutSummary` + `CoreCapabilities` | `frontend-design` |
| 2.8 | Build `ServicesGrid` | `magic-ui-generator` |
| 2.9 | Build `FeaturedProjects` carousel (Embla) | `react-component-performance` |
| 2.10 | Build `NewsTeaser` | `frontend-design` |
| 2.11 | Build `OfficeLocation` (map + address) | `frontend-design` |
| 2.12 | Mobile responsive QA on Home | `mobile-design` |
| 2.13 | Visual diff vs source homepage | `ui-visual-validator` |

### Phase 3 — Static pages

| # | Task | Skill |
|---|---|---|
| 3.1 | Build `About` page | `landing-page-generator` |
| 3.2 | Build `Services` page | `landing-page-generator` |
| 3.3 | Build `Contact` page (info + map + form stub) | `frontend-design` |
| 3.4 | Build 6× "Công bố năng lực" library pages | `landing-page-generator` |
| 3.5 | Build 4× "Thư viện" library pages (incl. PDFs) | `landing-page-generator` |
| 3.6 | Add `react-helmet-async`; `<SEO>` component | `seo-fundamentals` |
| 3.7 | Per-page meta titles/descriptions (Vietnamese) | `seo-meta-optimizer` |
| 3.8 | JSON-LD organization + contact schema | `schema-markup` |
| 3.9 | Confirm `lang="vi"` and Vietnamese rendering | `i18n-localization` |
| 3.10 | A11y pass on static pages | `wcag-audit-patterns` |

### Phase 4 — Dynamic content

| # | Task | Skill |
|---|---|---|
| 4.1 | Scrape `/du-an` listing → `projects.json` | `web-scraper` |
| 4.2 | Scrape each project detail → fill description/gallery | `firecrawl-scraper` |
| 4.3 | Scrape `/tin-tuc` listing + articles → `news.json` | `web-scraper` |
| 4.4 | Optimize project/news images (WebP, sizes) | `seo-images` |
| 4.5 | Build `Projects` page (filter + grid) | `react-state-management` |
| 4.6 | Build `ProjectDetail` (gallery, lightbox, related) | `react-component-performance` |
| 4.7 | Build `News` page (pagination 12/page) | `react-state-management` |
| 4.8 | Build `NewsDetail` (sanitized HTML, related) | `react-best-practices` |
| 4.9 | Refine excerpts/meta for SEO | `seo-content-writer` |
| 4.10 | Per-detail SEO tags (OG image, article schema) | `schema-markup` |

### Phase 5 — Polish, QA, Deploy

| # | Task | Skill |
|---|---|---|
| 5.1 | 404 page + verify `*` route | `react-best-practices` |
| 5.2 | Image lazy-loading audit + hero preload | `web-performance-optimization` |
| 5.3 | Route-level code splitting (`React.lazy`) | `web-performance-optimization` |
| 5.4 | Lighthouse desktop fixes until ≥ 90 | `performance-testing-review-ai-review` |
| 5.5 | Pixel-diff every page vs live source | `ui-visual-validator` |
| 5.6 | Manual smoke test of all routes (deep links, nav active states, drawer close on route change, in-component 404 for missing slug) — Playwright run interactively, not as a maintained CI suite | `playwright-skill` |
| 5.7 | Final accessibility audit | `accessibility-compliance-accessibility-audit` |
| 5.8 | Final on-page SEO audit | `seo-audit` |
| 5.9 | Code simplification pass | `simplify` |
| 5.10 | Final code review | `code-review-excellence` |
| 5.11 | Configure deployment (Vercel `vercel.json`) | `vercel-deployment` |
| 5.12 | Validate deployed build | `deployment-validation-config-validate` |
| 5.13 | Tag release & final commit | `commit` |

### Cross-phase (continuous)

- `commit` — milestone commits
- `simplify` / `code-simplifier` — keep components lean
- `clean-code` — readability
- `find-bugs` — periodic scans
- `git-pr-workflows-pr-enhance` — PR hygiene

---

## 7. Decision Log

| # | Decision | Alternatives | Rationale |
|---|---|---|---|
| 1 | Pixel-perfect replica | Structural template; functional reference | Fidelity over flexibility |
| 2 | Scrape & bundle assets locally | Hotlink; manual; mix w/ Google Fonts | Resilience + offline build |
| 3 | User authorized to clone | Local-only; switch to template | Confirmed by user |
| 4 | Full multi-page clone (17 top-level routes + 2 dynamic + `*` 404) | Single page; landing + few subs | User scope |
| 5 | Top-level + dynamic detail pages | Top-only; full dynamic w/ search | Sweet spot for fidelity vs effort |
| 6 | Static JSON for projects & news | Markdown; CMS; backend | Simplest; one-time scrape |
| 7 | Themed Tailwind tokens + CSS modules | Pure custom theme; arbitrary; CSS modules everywhere | Best balance |
| 8 | Vietnamese only | i18n switcher | Matches source |
| 9 | Form is client-side stub | Real backend; serverless function | No backend in scope |
| 10 | No automated test suite (manual Playwright smoke only); no analytics | Vitest + Playwright CI suite; GA | Static clone — manual visual QA + one-off smoke checks are sufficient |
| 11 | Approach 1: flat pages + components | Feature folders; Next.js | Matches stack; right size |
| 12 | React Router v6 `createBrowserRouter` | Hash router; Next file-based | Pairs with Vite SPA |
| 13 | `react-helmet-async` for SEO | Per-page raw `<head>`; Next Head | Standard for Vite/React |
| 14 | Embla + YARL | Swiper; PhotoSwipe | Smaller bundles, well-maintained |
| 15 | DOMPurify for news HTML | Markdown; trust raw | Safe `dangerouslySetInnerHTML` |
| 16 | Static deploy | SSR | No dynamic data |
| 17 | 5 phases, skill-mapped tasks | Single all-at-once | Validate fidelity early |

---

## 8. Implementation Handoff

When ready to begin execution:
1. Start with **Phase 1.1** (`javascript-typescript-typescript-scaffold`).
2. Complete each phase before progressing — do not interleave.
3. Visual diff against the live source after Phase 2 (Home) before continuing — this validates theme tokens.
4. Commit at the end of each phase.

**End of design document.**
