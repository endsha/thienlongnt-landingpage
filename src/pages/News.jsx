import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO.jsx';
import news from '@/data/news.json';

const PAGE_SIZE = 12;

const dateFormatter = new Intl.DateTimeFormat('vi-VN', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

function formatDate(iso) {
  if (!iso) return '';
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? iso : dateFormatter.format(date);
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-800 via-brand-700 to-brand-900 py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-[10%] -top-[20%] h-[60%] w-[60%] rounded-full bg-white/5 blur-[120px]" />
        <div className="absolute -bottom-[20%] -left-[10%] h-[50%] w-[50%] rounded-full bg-accent-500/10 blur-[100px]" />
      </div>
      <div className="relative mx-auto max-w-container px-4">
        <span className="mb-8 block h-1.5 w-20 rounded-full bg-accent-500 shadow-[0_0_25px_rgba(226,113,33,0.8)]" />
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.4em] text-accent-300">
          Cập nhật mới nhất
        </p>
        <h1 className="font-display text-4xl font-black uppercase leading-none tracking-tight text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.3)] md:text-6xl lg:text-7xl">
          Tin tức hoạt động
        </h1>
        <p className="mt-8 max-w-3xl border-l-4 border-accent-500 py-2 pl-6 text-lg font-light italic leading-relaxed text-slate-300 md:text-xl">
          Tiến độ dự án, hoạt động nội bộ và thông báo tuyển dụng của Công ty Thiên Long Ninh Thuận.
        </p>
      </div>
    </section>
  );
}

function NewsCard({ article }) {
  return (
    <Link
      to={`/tin-tuc/${article.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-card border border-slate-100 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card-hover"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-brand-50">
        {article.thumbnail ? (
          <img
            src={article.thumbnail}
            alt={article.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full w-full place-items-center font-display text-xs font-bold uppercase tracking-widest text-brand-700">
            {article.category ?? 'Tin tức'}
          </div>
        )}
        {article.category && (
          <span className="absolute left-4 top-4 rounded-full bg-accent-700 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow">
            {article.category}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-muted">
          {formatDate(article.publishedAt)}
        </p>
        <h3 className="line-clamp-2 font-display text-lg font-black uppercase leading-snug text-brand-800 group-hover:text-accent-700">
          {article.title}
        </h3>
        <p className="line-clamp-3 text-sm text-ink-muted">{article.excerpt}</p>
      </div>
    </Link>
  );
}

function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <nav aria-label="Phân trang" className="mt-12 flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold uppercase text-brand-800 transition hover:border-brand-800 disabled:cursor-not-allowed disabled:opacity-40"
      >
        ← Trước
      </button>
      {pages.map((n) => {
        const active = n === page;
        return (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            aria-current={active ? 'page' : undefined}
            className={`h-10 w-10 rounded-full text-sm font-bold transition ${
              active
                ? 'bg-accent-700 text-white shadow-md'
                : 'border border-slate-200 bg-white text-brand-800 hover:border-brand-800'
            }`}
          >
            {n}
          </button>
        );
      })}
      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold uppercase text-brand-800 transition hover:border-brand-800 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Sau →
      </button>
    </nav>
  );
}

function EmptyState() {
  return (
    <div className="col-span-full rounded-xl border border-dashed border-slate-300 bg-white py-20 text-center">
      <p className="font-display text-xl font-black uppercase text-brand-800">Chưa có bài viết</p>
      <p className="mt-2 text-sm text-ink-muted">
        Tin tức và hoạt động của Thiên Long Ninh Thuận sẽ sớm được cập nhật tại đây.
      </p>
    </div>
  );
}

export default function News() {
  const sorted = useMemo(
    () =>
      [...news].sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      ),
    [],
  );
  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const [page, setPage] = useState(1);

  const visible = useMemo(
    () => sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [sorted, page],
  );

  useEffect(() => {
    if (page === 1) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const handleChange = (next) => {
    if (next < 1 || next > totalPages) return;
    setPage(next);
  };

  return (
    <>
      <SEO
        title="Tin tức — Công ty Thiên Long Ninh Thuận"
        description="Cập nhật tiến độ dự án, hoạt động nội bộ và thông báo tuyển dụng từ Công ty TNHH Xây dựng và Thương mại Thiên Long Ninh Thuận."
      />
      <Hero />

      <section className="bg-surface-subtle py-16 md:py-20" aria-labelledby="news-list-heading">
        <div className="mx-auto max-w-container px-4">
          <h2 id="news-list-heading" className="sr-only">
            Danh sách bài viết
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {sorted.length === 0 ? (
              <EmptyState />
            ) : (
              visible.map((article) => <NewsCard key={article.slug} article={article} />)
            )}
          </div>

          <Pagination page={page} totalPages={totalPages} onChange={handleChange} />
        </div>
      </section>
    </>
  );
}
