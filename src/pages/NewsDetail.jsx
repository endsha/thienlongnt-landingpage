import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import SEO from '@/components/SEO.jsx';
import news from '@/data/news.json';

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

function ChevronIcon() {
  return (
    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="m9 5 7 7-7 7" />
    </svg>
  );
}

function Breadcrumbs({ title }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">
      <Link to="/" className="hover:text-accent-700">Trang chủ</Link>
      <ChevronIcon />
      <Link to="/tin-tuc" className="hover:text-accent-700">Tin tức</Link>
      <ChevronIcon />
      <span className="line-clamp-1 text-brand-800">{title}</span>
    </nav>
  );
}

function NotFoundBody() {
  return (
    <section className="bg-surface-subtle py-24">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <p className="font-display text-sm font-bold uppercase tracking-[0.4em] text-accent-700">404</p>
        <h1 className="mt-3 font-display text-3xl font-black uppercase text-brand-800 md:text-4xl">
          Không tìm thấy bài viết
        </h1>
        <p className="mt-4 text-ink-muted">
          Bài viết bạn tìm không tồn tại hoặc đã bị gỡ khỏi danh mục.
        </p>
        <Link
          to="/tin-tuc"
          className="mt-8 inline-flex items-center gap-3 rounded-lg bg-brand-700 px-8 py-3.5 text-sm font-bold uppercase text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-brand-800"
        >
          ← Quay lại danh sách tin tức
        </Link>
      </div>
    </section>
  );
}

function RelatedCard({ article }) {
  return (
    <Link
      to={`/tin-tuc/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-card border border-slate-100 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card-hover"
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
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-muted">
          {formatDate(article.publishedAt)}
        </p>
        <h3 className="line-clamp-2 font-display text-base font-black uppercase leading-snug text-brand-800 group-hover:text-accent-700">
          {article.title}
        </h3>
      </div>
    </Link>
  );
}

export default function NewsDetail() {
  const { slug } = useParams();
  const article = useMemo(() => news.find((n) => n.slug === slug), [slug]);
  const related = useMemo(() => {
    if (!article) return [];
    const sameCategory = news.filter(
      (n) => n.slug !== article.slug && n.category === article.category,
    );
    const fallback = news.filter((n) => n.slug !== article.slug);
    return (sameCategory.length > 0 ? sameCategory : fallback).slice(0, 3);
  }, [article]);

  const sanitizedBody = useMemo(() => {
    if (!article?.body) return '';
    return DOMPurify.sanitize(article.body);
  }, [article]);

  const jsonLd = useMemo(() => {
    if (!article) return null;
    const url = `https://thienlongninhthuan.com/tin-tuc/${article.slug}`;
    const breadcrumb = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: 'https://thienlongninhthuan.com/' },
        { '@type': 'ListItem', position: 2, name: 'Tin tức', item: 'https://thienlongninhthuan.com/tin-tuc' },
        { '@type': 'ListItem', position: 3, name: article.title, item: url },
      ],
    };
    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.excerpt,
      datePublished: article.publishedAt,
      author: { '@type': 'Organization', name: article.author || 'Thiên Long Ninh Thuận' },
      publisher: {
        '@type': 'Organization',
        name: 'Thiên Long Ninh Thuận',
        logo: { '@type': 'ImageObject', url: 'https://thienlongninhthuan.com/images/logo.jpg' },
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      ...(article.thumbnail ? { image: article.thumbnail } : {}),
      ...(article.category ? { articleSection: article.category } : {}),
    };
    return [articleSchema, breadcrumb];
  }, [article]);

  if (!article) {
    return (
      <>
        <SEO title="Không tìm thấy bài viết — Thiên Long Ninh Thuận" description="Trang tin tức không tồn tại." />
        <NotFoundBody />
      </>
    );
  }

  return (
    <>
      <SEO
        title={`${article.title} — Tin tức Thiên Long Ninh Thuận`}
        description={article.excerpt}
        type="article"
        image={article.thumbnail || undefined}
        publishedTime={article.publishedAt}
        author={article.author}
        jsonLd={jsonLd}
      />

      <article className="bg-white pb-12 pt-10 md:pb-16 md:pt-14">
        <div className="mx-auto max-w-3xl px-4">
          <Breadcrumbs title={article.title} />
          {article.category && (
            <span className="inline-block rounded-full bg-accent-700 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow">
              {article.category}
            </span>
          )}
          <h1 className="mt-4 font-display text-3xl font-black uppercase leading-tight text-brand-800 md:text-4xl">
            {article.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            {article.author && (
              <>
                <span aria-hidden="true">·</span>
                <span>{article.author}</span>
              </>
            )}
          </div>

          {sanitizedBody ? (
            <div
              className="prose prose-slate mt-10 max-w-none leading-relaxed text-ink"
              dangerouslySetInnerHTML={{ __html: sanitizedBody }}
            />
          ) : (
            <p className="mt-10 leading-relaxed text-ink-muted">{article.excerpt}</p>
          )}
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-surface-subtle py-16 md:py-20">
          <div className="mx-auto max-w-container px-4">
            <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="mb-2 text-sm font-bold uppercase tracking-widest text-accent-700">
                  Bài viết khác
                </p>
                <h2 className="font-display text-2xl font-black uppercase text-brand-800 md:text-3xl">
                  Có thể bạn quan tâm
                </h2>
              </div>
              <Link to="/tin-tuc" className="inline-flex items-center gap-2 text-sm font-bold uppercase text-brand-800 hover:text-accent-700">
                Xem tất cả <ChevronIcon />
              </Link>
            </header>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {related.map((a) => (
                <RelatedCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
