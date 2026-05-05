import { lazy, Suspense, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SEO from '@/components/SEO.jsx';
import projects from '@/data/projects.json';
import 'yet-another-react-lightbox/styles.css';

const Lightbox = lazy(() => import('yet-another-react-lightbox'));

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
      <Link to="/du-an" className="hover:text-accent-700">Dự án</Link>
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
          Không tìm thấy dự án
        </h1>
        <p className="mt-4 text-ink-muted">
          Dự án bạn tìm không tồn tại hoặc đã bị gỡ khỏi danh mục.
        </p>
        <Link
          to="/du-an"
          className="mt-8 inline-flex items-center gap-3 rounded-lg bg-brand-700 px-8 py-3.5 text-sm font-bold uppercase text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-brand-800"
        >
          ← Quay lại danh sách dự án
        </Link>
      </div>
    </section>
  );
}

function MetaItem({ label, value }) {
  if (!value) return null;
  return (
    <div>
      <dt className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-muted">{label}</dt>
      <dd className="mt-1 font-display text-base font-black text-brand-800">{value}</dd>
    </div>
  );
}

function RelatedCard({ project }) {
  return (
    <Link
      to={`/du-an/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-card border border-slate-100 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card-hover"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-50">
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full w-full place-items-center font-display text-xs font-bold uppercase tracking-widest text-brand-700">
            {project.category}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="line-clamp-2 font-display text-base font-black uppercase leading-snug text-brand-800 group-hover:text-accent-700">
          {project.title}
        </h3>
        <div className="mt-auto flex items-center justify-between pt-3 text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
          <span>{project.location}</span>
          <span>{project.year}</span>
        </div>
      </div>
    </Link>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = useMemo(() => projects.find((p) => p.slug === slug), [slug]);
  const related = useMemo(() => {
    if (!project) return [];
    return projects
      .filter((p) => p.slug !== project.slug && p.category === project.category)
      .slice(0, 3);
  }, [project]);

  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const slides = useMemo(
    () => (project?.gallery ?? []).map((src) => ({ src })),
    [project],
  );

  const jsonLd = useMemo(() => {
    if (!project) return null;
    const url = `https://gianguyenkhanhhoa.vn/du-an/${project.slug}`;
    const breadcrumb = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: 'https://gianguyenkhanhhoa.vn/' },
        { '@type': 'ListItem', position: 2, name: 'Dự án', item: 'https://gianguyenkhanhhoa.vn/du-an' },
        { '@type': 'ListItem', position: 3, name: project.title, item: url },
      ],
    };
    const work = {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: project.title,
      description: project.summary,
      url,
      ...(project.thumbnail ? { image: project.thumbnail } : {}),
      ...(project.gallery && project.gallery.length > 0
        ? { associatedMedia: project.gallery.map((src) => ({ '@type': 'ImageObject', contentUrl: src })) }
        : {}),
      ...(project.location ? { contentLocation: { '@type': 'Place', name: project.location } } : {}),
      ...(project.year ? { dateCreated: String(project.year) } : {}),
      ...(project.category ? { genre: project.category } : {}),
      ...(project.client ? { sponsor: { '@type': 'Organization', name: project.client } } : {}),
      creator: { '@type': 'Organization', name: 'Gia Nguyên' },
    };
    return [work, breadcrumb];
  }, [project]);

  if (!project) {
    return (
      <>
        <SEO title="Không tìm thấy dự án — Gia Nguyên" description="Trang dự án không tồn tại." />
        <NotFoundBody />
      </>
    );
  }

  return (
    <>
      <SEO
        title={`${project.title} — Dự án Gia Nguyên`}
        description={project.summary}
        type="article"
        image={project.thumbnail || undefined}
        jsonLd={jsonLd}
      />

      <section className="border-b border-slate-100 bg-white pb-12 pt-10 md:pb-16 md:pt-14">
        <div className="mx-auto max-w-container px-4">
          <Breadcrumbs title={project.title} />
          <span className="inline-block rounded-full bg-accent-700 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow">
            {project.category}
          </span>
          <h1 className="mt-4 font-display text-3xl font-black uppercase leading-tight text-brand-800 md:text-5xl">
            {project.title}
          </h1>

          <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-slate-100 pt-6 md:grid-cols-4">
            <MetaItem label="Chủ đầu tư" value={project.client} />
            <MetaItem label="Vị trí" value={project.location} />
            <MetaItem label="Năm" value={project.year} />
            <MetaItem label="Hạng mục" value={project.category} />
          </dl>
        </div>
      </section>

      {project.gallery && project.gallery.length > 0 && (
        <section className="bg-surface-subtle py-12 md:py-16">
          <div className="mx-auto max-w-container px-4">
            <h2 className="mb-8 font-display text-xl font-black uppercase text-brand-800 md:text-2xl">
              Hình ảnh công trình
            </h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {project.gallery.map((src, index) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  className="group relative aspect-[4/3] overflow-hidden rounded-card bg-brand-50 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card-hover"
                  aria-label={`Mở ảnh ${index + 1}`}
                >
                  <img
                    src={src}
                    alt={`${project.title} — ảnh ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {project.description && (
        <section className="bg-white py-12 md:py-16">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="mb-6 font-display text-xl font-black uppercase text-brand-800 md:text-2xl">
              Mô tả dự án
            </h2>
            <div className="prose prose-slate max-w-none whitespace-pre-line leading-relaxed text-ink">
              {project.description}
            </div>
            {project.tags && project.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="bg-surface-subtle py-16 md:py-20">
          <div className="mx-auto max-w-container px-4">
            <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="mb-2 text-sm font-bold uppercase tracking-widest text-accent-700">
                  Cùng hạng mục
                </p>
                <h2 className="font-display text-2xl font-black uppercase text-brand-800 md:text-3xl">
                  Dự án liên quan
                </h2>
              </div>
              <Link to="/du-an" className="inline-flex items-center gap-2 text-sm font-bold uppercase text-brand-800 hover:text-accent-700">
                Xem tất cả <ChevronIcon />
              </Link>
            </header>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {related.map((p) => (
                <RelatedCard key={p.slug} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {lightboxIndex >= 0 && (
        <Suspense fallback={null}>
          <Lightbox
            open={lightboxIndex >= 0}
            close={() => setLightboxIndex(-1)}
            index={lightboxIndex}
            slides={slides}
          />
        </Suspense>
      )}
    </>
  );
}
