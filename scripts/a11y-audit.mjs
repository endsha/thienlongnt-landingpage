import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';

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
  '/no-such-route',
];

const SEV = { critical: 0, serious: 1, moderate: 2, minor: 3 };

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'vi-VN' });
  const page = await ctx.newPage();

  const byRule = new Map();
  let totalViolations = 0;
  const perRoute = [];

  for (const route of ROUTES) {
    await page.goto(BASE + route, { waitUntil: 'networkidle' });
    await page.waitForSelector('h1', { timeout: 5000 }).catch(() => {});
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
      .analyze();

    perRoute.push({
      route,
      violations: results.violations.length,
      incomplete: results.incomplete.length,
    });
    totalViolations += results.violations.length;

    for (const v of results.violations) {
      const entry = byRule.get(v.id) ?? {
        id: v.id,
        impact: v.impact,
        help: v.help,
        helpUrl: v.helpUrl,
        wcag: v.tags.filter((t) => t.startsWith('wcag')),
        routes: new Set(),
        nodes: [],
      };
      entry.routes.add(route);
      for (const node of v.nodes.slice(0, 3)) {
        entry.nodes.push({ route, target: node.target.join(' '), html: node.html.slice(0, 220) });
      }
      byRule.set(v.id, entry);
    }
  }

  await browser.close();

  console.log('\n=== Per-route summary ===');
  for (const r of perRoute) {
    const flag = r.violations > 0 ? '✗' : '✓';
    console.log(`  ${flag} ${r.route.padEnd(45)} violations=${r.violations}  incomplete=${r.incomplete}`);
  }

  const rules = [...byRule.values()].sort(
    (a, b) => (SEV[a.impact] ?? 9) - (SEV[b.impact] ?? 9),
  );

  console.log(`\n=== Unique rule violations (${rules.length}) ===`);
  for (const r of rules) {
    console.log(`\n[${(r.impact ?? '?').toUpperCase()}] ${r.id} — ${r.help}`);
    console.log(`  WCAG: ${r.wcag.join(', ')}`);
    console.log(`  Routes affected (${r.routes.size}): ${[...r.routes].slice(0, 5).join(', ')}${r.routes.size > 5 ? '…' : ''}`);
    console.log(`  Help: ${r.helpUrl}`);
    for (const n of r.nodes.slice(0, 3)) {
      console.log(`    · ${n.route}  ${n.target}`);
      console.log(`      ${n.html}`);
    }
  }

  console.log(`\nTotal violation occurrences: ${totalViolations}`);
  process.exit(rules.some((r) => SEV[r.impact] <= 1) ? 1 : 0);
})();
