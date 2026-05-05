import { Link } from 'react-router-dom';
import news from '@/data/news.json';

const TEASER = [...news]
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  .slice(0, 3);

const dateFormatter = new Intl.DateTimeFormat('vi-VN', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

function formatDate(iso) {
  return dateFormatter.format(new Date(iso));
}

function CalendarIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7 2v2H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3V2h-2v2H9V2H7Zm13 8H4v10h16V10Z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-5-5 5 5-5 5" />
    </svg>
  );
}

function NewsCard({ article }) {
  return (
    <Link
      to={`/tin-tuc/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-card border border-slate-100 bg-white shadow-card outline-none transition duration-300 hover:-translate-y-1 hover:shadow-card-hover focus-visible:ring-2 focus-visible:ring-accent-500"
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
          <div className="grid h-full w-full place-items-center font-display text-sm font-bold uppercase tracking-widest text-brand-700">
            Tin tức
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">
          <CalendarIcon />
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
        </div>
        <h3 className="font-display text-lg font-black uppercase leading-snug text-brand-800 line-clamp-2 transition-colors group-hover:text-accent-700">
          {article.title}
        </h3>
        <p className="text-sm leading-relaxed text-ink-muted line-clamp-3">{article.excerpt}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-bold uppercase tracking-wide text-brand-700 transition-colors group-hover:text-accent-700">
          Đọc thêm <ArrowIcon />
        </span>
      </div>
    </Link>
  );
}

export default function NewsTeaser() {
  return (
    <section id="phan-tin-tuc" className="border-t border-slate-100 bg-surface-subtle py-20">
      <div className="mx-auto max-w-container px-4">
        <header className="mb-16 text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-accent-700">
            Cập nhật mới nhất
          </p>
          <h2 className="font-display text-3xl font-black uppercase text-brand-800 md:text-4xl">
            Tin tức hoạt động
          </h2>
          <span className="mx-auto mt-6 block h-1 w-24 bg-accent-500" aria-hidden="true" />
        </header>

        {TEASER.length === 0 ? (
          <p className="py-10 text-center text-ink-muted">Chưa có bài viết.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {TEASER.map((article) => (
                <NewsCard key={article.slug} article={article} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                to="/tin-tuc"
                className="inline-flex items-center gap-3 rounded-lg bg-brand-800 px-8 py-3.5 text-sm font-bold uppercase text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-accent-500 hover:shadow-xl md:text-base"
              >
                Xem tất cả tin tức <ArrowIcon />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
