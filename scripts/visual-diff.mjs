#!/usr/bin/env node
import { chromium } from 'playwright';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import fs from 'node:fs/promises';
import path from 'node:path';

const LIVE_BASE = 'https://gianguyenkhanhhoa.vn';
const LOCAL_BASE = process.env.LOCAL_BASE ?? 'http://127.0.0.1:4173';
const OUT_DIR = path.resolve('visual-diff');
const VIEWPORT = { width: 1440, height: 900 };
const NAV_TIMEOUT = 45_000;

const ROUTES = [
  '/',
  '/gioi-thieu',
  '/dich-vu',
  '/du-an',
  '/tin-tuc',
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

function slugify(route) {
  return route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '__');
}

async function capture(page, url, outPath) {
  try {
    const response = await page.goto(url, { waitUntil: 'networkidle', timeout: NAV_TIMEOUT });
    const status = response?.status() ?? 0;
    if (!response?.ok()) return { ok: false, status, error: `HTTP ${status}` };
    // Defeat lazy-loaded content + animations: scroll, then settle
    await page.evaluate(async () => {
      await new Promise((r) => {
        let y = 0;
        const step = () => {
          y += 600;
          window.scrollTo(0, y);
          if (y < document.body.scrollHeight) requestAnimationFrame(step);
          else r();
        };
        step();
      });
    });
    await page.waitForTimeout(800);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);
    await page.screenshot({ path: outPath, fullPage: true, animations: 'disabled' });
    return { ok: true, status };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

function padToSame(aBuf, bBuf) {
  const a = PNG.sync.read(aBuf);
  const b = PNG.sync.read(bBuf);
  const w = Math.max(a.width, b.width);
  const h = Math.max(a.height, b.height);
  const pad = (img) => {
    if (img.width === w && img.height === h) return img;
    const out = new PNG({ width: w, height: h });
    // White background
    for (let i = 0; i < out.data.length; i += 4) {
      out.data[i] = out.data[i + 1] = out.data[i + 2] = 255;
      out.data[i + 3] = 255;
    }
    PNG.bitblt(img, out, 0, 0, img.width, img.height, 0, 0);
    return out;
  };
  return { a: pad(a), b: pad(b), w, h };
}

async function diff(localPath, livePath, diffPath) {
  const [aBuf, bBuf] = await Promise.all([fs.readFile(localPath), fs.readFile(livePath)]);
  const { a, b, w, h } = padToSame(aBuf, bBuf);
  const out = new PNG({ width: w, height: h });
  const mismatched = pixelmatch(a.data, b.data, out.data, w, h, {
    threshold: 0.15,
    includeAA: false,
  });
  await fs.writeFile(diffPath, PNG.sync.write(out));
  const total = w * h;
  return { mismatched, total, percent: (mismatched / total) * 100, w, h };
}

async function main() {
  await fs.mkdir(path.join(OUT_DIR, 'live'), { recursive: true });
  await fs.mkdir(path.join(OUT_DIR, 'local'), { recursive: true });
  await fs.mkdir(path.join(OUT_DIR, 'diff'), { recursive: true });

  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
    locale: 'vi-VN',
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
  });
  const page = await ctx.newPage();
  // Block third-party trackers/maps to stabilize live screenshots
  await page.route('**/*', (route) => {
    const u = route.request().url();
    if (
      /googletagmanager|google-analytics|facebook\.net|doubleclick|hotjar|clarity\.ms/.test(u)
    ) return route.abort();
    return route.continue();
  });

  const results = [];
  for (const route of ROUTES) {
    const slug = slugify(route);
    const liveOut = path.join(OUT_DIR, 'live', `${slug}.png`);
    const localOut = path.join(OUT_DIR, 'local', `${slug}.png`);
    const diffOut = path.join(OUT_DIR, 'diff', `${slug}.png`);

    process.stdout.write(`▸ ${route.padEnd(42)} `);
    const live = await capture(page, LIVE_BASE + route, liveOut);
    const local = await capture(page, LOCAL_BASE + route, localOut);

    let cmp = null;
    if (live.ok && local.ok) {
      try {
        cmp = await diff(localOut, liveOut, diffOut);
      } catch (e) {
        cmp = { error: e.message };
      }
    }
    const row = { route, live, local, diff: cmp };
    results.push(row);
    if (cmp?.percent != null) {
      console.log(`${cmp.percent.toFixed(1)}% diff (${cmp.w}×${cmp.h})`);
    } else {
      console.log(
        `live=${live.ok ? 'OK' : live.error} local=${local.ok ? 'OK' : local.error}`,
      );
    }
  }

  await browser.close();
  await fs.writeFile(
    path.join(OUT_DIR, 'results.json'),
    JSON.stringify(results, null, 2),
  );
  console.log(`\nWrote ${results.length} routes to ${OUT_DIR}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
