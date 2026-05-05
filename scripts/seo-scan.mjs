import { chromium } from 'playwright';

const BASE = process.env.BASE ?? 'http://127.0.0.1:4173';

const ROUTES = [
  '/',
  '/gioi-thieu',
  '/dich-vu',
  '/du-an',
  '/du-an/du-an-mau-1',
  '/tin-tuc',
  '/tin-tuc/bai-viet-mau-1',
  '/lien-he',
  '/thu-vien/giay-phep-kinh-doanh',
  '/thu-vien/cong-bo-nang-luc',
  '/thu-vien/chung-nhan-du-dieu-kien',
  '/thu-vien/hieu-chuan-thiet-bi',
  '/thu-vien/danh-muc-thiet-bi',
  '/thu-vien/danh-sach-can-bo',
  '/thu-vien/ho-so-nang-luc',
  '/thu-vien/tieu-chuan-thi-cong',
  '/thu-vien/tieu-chuan-thi-nghiem',
  '/thu-vien/excel-ung-dung',
];

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const rows = [];

  for (const route of ROUTES) {
    await page.goto(BASE + route, { waitUntil: 'networkidle' });
    await page.waitForSelector('h1', { timeout: 5000 }).catch(() => {});
    const seo = await page.evaluate(() => {
      const $ = (sel) => document.querySelector(sel);
      const $$ = (sel) => Array.from(document.querySelectorAll(sel));
      const meta = (n) => $(`meta[name="${n}"]`)?.content || '';
      const og = (p) => $(`meta[property="${p}"]`)?.content || '';
      const tw = (n) => $(`meta[name="${n}"]`)?.content || '';
      const h1s = $$('h1').map((h) => h.textContent.trim());
      const h2s = $$('h2').length;
      const imgs = $$('img');
      const imgsMissingAlt = imgs.filter((i) => !i.hasAttribute('alt') || i.alt.trim() === '').length;
      const ldjson = $$('script[type="application/ld+json"]').map((s) => {
        try { return JSON.parse(s.textContent); } catch { return null; }
      }).filter(Boolean);
      const internal = $$('a[href^="/"]').length;
      const external = $$('a[href^="http"]').length;
      const canon = $('link[rel="canonical"]')?.href || '';
      const lang = document.documentElement.lang;
      return {
        title: document.title,
        titleLen: document.title.length,
        description: meta('description'),
        descLen: meta('description').length,
        canonical: canon,
        robots: meta('robots'),
        lang,
        ogTitle: og('og:title'),
        ogDescription: og('og:description'),
        ogImage: og('og:image'),
        ogUrl: og('og:url'),
        ogType: og('og:type'),
        ogLocale: og('og:locale'),
        twCard: tw('twitter:card'),
        twImage: tw('twitter:image'),
        h1Count: h1s.length,
        h1: h1s[0] ?? '',
        h2Count: h2s,
        imgs: imgs.length,
        imgsMissingAlt,
        internalLinks: internal,
        externalLinks: external,
        ldjsonCount: ldjson.length,
        ldjsonTypes: ldjson.map((j) => j['@type'] ?? '?').flat(),
      };
    });
    rows.push({ route, ...seo });
  }

  await browser.close();
  console.log(JSON.stringify(rows, null, 2));
})();
