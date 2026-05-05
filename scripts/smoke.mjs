import { chromium } from 'playwright';

const BASE = process.env.BASE ?? 'http://127.0.0.1:4173';

const ROUTES = [
  { path: '/', heroH1: /uy\s*tín/i },
  { path: '/gioi-thieu', heroH1: /về\s+gia\s+nguyên/i },
  { path: '/dich-vu', heroH1: /giải\s+pháp/i },
  { path: '/du-an', heroH1: /công\s+trình/i },
  { path: '/tin-tuc', heroH1: /tin\s+tức/i },
  { path: '/lien-he', heroH1: /(liên\s+hệ|cuộc\s+trò\s+chuyện)/i },
  { path: '/du-an/du-an-mau-1', heroH1: /dự\s+án\s+mẫu/i, kind: 'detail' },
  { path: '/tin-tuc/bai-viet-mau-1', heroH1: /bài\s+viết\s+mẫu/i, kind: 'detail' },
  { path: '/thu-vien/giay-phep-kinh-doanh', heroH1: /GIẤY\s+PHÉP\s+KINH\s+DOANH/i },
  { path: '/thu-vien/cong-bo-nang-luc', heroH1: /CÔNG\s+BỐ/i },
  { path: '/thu-vien/chung-nhan-du-dieu-kien', heroH1: /CHỨNG\s+NHẬN/i },
  { path: '/thu-vien/hieu-chuan-thiet-bi', heroH1: /HIỆU\s+CHUẨN/i },
  { path: '/thu-vien/danh-muc-thiet-bi', heroH1: /DANH\s+MỤC\s+THIẾT\s+BỊ/i },
  { path: '/thu-vien/danh-sach-can-bo', heroH1: /DANH\s+SÁCH\s+CÁN\s+BỘ/i },
  { path: '/thu-vien/ho-so-nang-luc', heroH1: /HỒ\s+SƠ\s+NĂNG\s+LỰC/i },
  { path: '/thu-vien/tieu-chuan-thi-cong', heroH1: /TIÊU\s+CHUẨN\s+THI\s+CÔNG/i },
  { path: '/thu-vien/tieu-chuan-thi-nghiem', heroH1: /TIÊU\s+CHUẨN\s+THÍ\s+NGHIỆM/i },
  { path: '/thu-vien/excel-ung-dung', heroH1: /EXCEL/i },
];

let pass = 0;
let fail = 0;
const failures = [];

function ok(msg) { console.log(`  ✓ ${msg}`); pass++; }
function bad(msg) { console.log(`  ✗ ${msg}`); fail++; failures.push(msg); }

async function captureConsole(page, route) {
  page.on('pageerror', (e) => bad(`[${route}] pageerror: ${e.message}`));
  page.on('console', (m) => {
    if (m.type() === 'error') bad(`[${route}] console.error: ${m.text()}`);
  });
}

async function deepLinkSuite(page) {
  console.log('\n▸ Deep-link suite (every defined route loads + renders correct h1)');
  for (const r of ROUTES) {
    const resp = await page.goto(BASE + r.path, { waitUntil: 'networkidle' });
    if (!resp || resp.status() !== 200) {
      bad(`${r.path} → HTTP ${resp?.status() ?? '?'}`);
      continue;
    }
    // Wait for the lazy chunk
    try {
      await page.waitForSelector('h1', { timeout: 5000 });
    } catch {
      bad(`${r.path} → no <h1> rendered within 5s`);
      continue;
    }
    const h1 = (await page.locator('h1').first().textContent())?.trim() ?? '';
    const matches =
      r.heroH1 instanceof RegExp ? r.heroH1.test(h1) : h1.includes(r.heroH1);
    if (matches) ok(`${r.path} → "${h1.slice(0, 50)}"`);
    else bad(`${r.path} → expected ${r.heroH1}, got "${h1.slice(0, 60)}"`);
  }
}

async function inComponent404Suite(page) {
  console.log('\n▸ In-component 404 (missing slug preserves URL)');
  for (const path of ['/du-an/does-not-exist', '/tin-tuc/no-such-article']) {
    await page.goto(BASE + path, { waitUntil: 'networkidle' });
    await page.waitForSelector('h1', { timeout: 5000 });
    const url = new URL(page.url()).pathname;
    const h1 = (await page.locator('h1').first().textContent())?.trim() ?? '';
    const stayed = url === path;
    const says404 = /không\s+tìm\s+thấy/i.test(h1);
    if (stayed && says404) ok(`${path} → URL preserved + 404 body ("${h1.slice(0, 40)}")`);
    else bad(`${path} → urlAfter=${url}, h1="${h1.slice(0, 50)}"`);
  }
}

async function routeLevel404Suite(page) {
  console.log('\n▸ Route-level * 404 (totally unmatched URL)');
  const path = '/this/route/does/not/exist';
  await page.goto(BASE + path, { waitUntil: 'networkidle' });
  await page.waitForSelector('h1', { timeout: 5000 });
  const h1 = (await page.locator('h1').first().textContent())?.trim() ?? '';
  const url = new URL(page.url()).pathname;
  if (url === path && /không\s+tìm\s+thấy\s+trang/i.test(h1)) {
    ok(`${path} → NotFound page rendered, URL preserved`);
  } else {
    bad(`${path} → urlAfter=${url}, h1="${h1.slice(0, 50)}"`);
  }
}

async function navActiveStateSuite(page) {
  console.log('\n▸ Nav active states (NavLink applies accent class)');
  await page.setViewportSize({ width: 1440, height: 900 });
  const checks = [
    { path: '/', label: 'Trang chủ' },
    { path: '/gioi-thieu', label: 'Giới thiệu' },
    { path: '/dich-vu', label: 'Dịch vụ' },
    { path: '/du-an', label: 'Dự án' },
    { path: '/tin-tuc', label: 'Tin tức' },
    { path: '/lien-he', label: 'Liên hệ' },
  ];
  for (const c of checks) {
    await page.goto(BASE + c.path, { waitUntil: 'networkidle' });
    const link = page.getByRole('link', { name: c.label, exact: true }).first();
    const cls = (await link.getAttribute('class')) ?? '';
    if (cls.includes('text-accent-700')) ok(`${c.path} → "${c.label}" link is active`);
    else bad(`${c.path} → "${c.label}" link missing active class. class="${cls}"`);
  }
}

async function mobileDrawerSuite(page) {
  console.log('\n▸ Mobile drawer (auto-closes on route change)');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });

  await page.getByRole('button', { name: /mở menu/i }).click();
  // Wait until the drawer-rendered "Liên hệ" link appears
  await page.waitForTimeout(400);
  const drawerLink = page.getByRole('link', { name: 'Liên hệ', exact: true }).last();
  if (!(await drawerLink.isVisible())) {
    bad('drawer: opened but Liên hệ link not visible');
    return;
  }
  ok('drawer: opens on burger click');

  await drawerLink.click();
  await page.waitForURL('**/lien-he', { timeout: 5000 });
  ok('drawer: clicking link navigates');

  await page.waitForTimeout(500);
  // After route change the burger button should be visible again (drawer closed)
  const burger = page.getByRole('button', { name: /mở menu/i });
  const burgerVisible = await burger.isVisible();
  // Drawer link should no longer be visible
  const stillOpen = await drawerLink.isVisible().catch(() => false);
  if (burgerVisible && !stillOpen) ok('drawer: auto-closed on route change');
  else bad(`drawer: burgerVisible=${burgerVisible} stillOpen=${stillOpen}`);
}

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    locale: 'vi-VN',
  });
  const page = await ctx.newPage();
  await captureConsole(page, '*');

  await deepLinkSuite(page);
  await inComponent404Suite(page);
  await routeLevel404Suite(page);
  await navActiveStateSuite(page);
  await mobileDrawerSuite(page);

  await browser.close();

  console.log(`\n— Summary —`);
  console.log(`  pass: ${pass}`);
  console.log(`  fail: ${fail}`);
  if (fail > 0) {
    console.log('\nFailures:');
    failures.forEach((f) => console.log(`  - ${f}`));
    process.exit(1);
  }
})();
