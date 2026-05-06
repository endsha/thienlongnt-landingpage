#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';

const SITE_URL = 'https://thienlongninhthuan.com';
const OUT = path.resolve('public/sitemap.xml');

const STATIC_ROUTES = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/gioi-thieu', priority: 0.8, changefreq: 'monthly' },
  { path: '/dich-vu', priority: 0.9, changefreq: 'monthly' },
  { path: '/du-an', priority: 0.9, changefreq: 'weekly' },
  { path: '/tin-tuc', priority: 0.8, changefreq: 'weekly' },
  { path: '/lien-he', priority: 0.7, changefreq: 'monthly' },
  { path: '/thu-vien/giay-phep-kinh-doanh', priority: 0.5, changefreq: 'yearly' },
  { path: '/thu-vien/cong-bo-nang-luc', priority: 0.5, changefreq: 'yearly' },
  { path: '/thu-vien/chung-nhan-du-dieu-kien', priority: 0.5, changefreq: 'yearly' },
  { path: '/thu-vien/hieu-chuan-thiet-bi', priority: 0.5, changefreq: 'yearly' },
  { path: '/thu-vien/danh-muc-thiet-bi', priority: 0.5, changefreq: 'yearly' },
  { path: '/thu-vien/danh-sach-can-bo', priority: 0.5, changefreq: 'yearly' },
  { path: '/thu-vien/ho-so-nang-luc', priority: 0.6, changefreq: 'yearly' },
  { path: '/thu-vien/tieu-chuan-thi-cong', priority: 0.5, changefreq: 'yearly' },
  { path: '/thu-vien/tieu-chuan-thi-nghiem', priority: 0.5, changefreq: 'yearly' },
  { path: '/thu-vien/excel-ung-dung', priority: 0.5, changefreq: 'yearly' },
];

async function readJson(rel) {
  const buf = await fs.readFile(path.resolve(rel), 'utf8');
  return JSON.parse(buf);
}

function fmtDate(d) {
  return new Date(d).toISOString().slice(0, 10);
}

function urlEntry({ loc, lastmod, changefreq, priority }) {
  const parts = [
    `    <loc>${loc}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
    changefreq ? `    <changefreq>${changefreq}</changefreq>` : null,
    priority != null ? `    <priority>${priority.toFixed(1)}</priority>` : null,
  ].filter(Boolean);
  return `  <url>\n${parts.join('\n')}\n  </url>`;
}

async function main() {
  const today = fmtDate(new Date());
  const projects = await readJson('src/data/projects.json');
  const news = await readJson('src/data/news.json');

  const entries = [
    ...STATIC_ROUTES.map((r) => ({
      loc: `${SITE_URL}${r.path}`,
      lastmod: today,
      changefreq: r.changefreq,
      priority: r.priority,
    })),
    ...projects.map((p) => ({
      loc: `${SITE_URL}/du-an/${p.slug}`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.7,
    })),
    ...news.map((n) => ({
      loc: `${SITE_URL}/tin-tuc/${n.slug}`,
      lastmod: fmtDate(n.publishedAt ?? today),
      changefreq: 'monthly',
      priority: 0.6,
    })),
  ];

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    entries.map(urlEntry).join('\n'),
    '</urlset>',
    '',
  ].join('\n');

  await fs.mkdir(path.dirname(OUT), { recursive: true });
  await fs.writeFile(OUT, xml);
  console.log(`✓ wrote ${entries.length} URLs to ${path.relative(process.cwd(), OUT)}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
