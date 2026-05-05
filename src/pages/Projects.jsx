import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO.jsx';
import projects from '@/data/projects.json';

const FILTERS = [
  { key: 'all', label: 'Tất cả dự án' },
  { key: 'Cầu & Đường', label: 'Cầu & Đường' },
  { key: 'Hạ Tầng & Khu Đô Thị', label: 'Hạ Tầng & Khu Đô Thị' },
  { key: 'Công Nghiệp', label: 'Công Nghiệp' },
];

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
          Hồ sơ năng lực
        </p>
        <h1 className="font-display text-4xl font-black uppercase leading-none tracking-tight text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.3)] md:text-6xl lg:text-7xl">
          Các công trình đã thực hiện
        </h1>
        <p className="mt-8 max-w-3xl border-l-4 border-accent-500 py-2 pl-6 text-lg font-light italic leading-relaxed text-slate-300 md:text-xl">
          Gia Nguyên tự hào ghi dấu ấn tại hàng loạt dự án trọng điểm — đáp ứng tiêu chuẩn
          kỹ thuật khắt khe và tiến độ thi công thần tốc.
        </p>
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  return (
    <Link
      to={`/du-an/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-card border border-slate-100 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card-hover"
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
          <div className="grid h-full w-full place-items-center font-display text-sm font-bold uppercase tracking-widest text-brand-700">
            {project.category}
          </div>
        )}
        {project.category && (
          <span className="absolute left-4 top-4 rounded-full bg-accent-700 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow">
            {project.category}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-6">
        <h3 className="line-clamp-2 font-display text-lg font-black uppercase leading-snug text-brand-800 group-hover:text-accent-700">
          {project.title}
        </h3>
        <p className="line-clamp-2 text-sm text-ink-muted">{project.summary}</p>
        <div className="mt-auto flex items-center justify-between pt-4 text-xs font-semibold uppercase tracking-wide text-ink-muted">
          <span>{project.location}</span>
          <span>{project.year}</span>
        </div>
      </div>
    </Link>
  );
}

function EmptyState({ category }) {
  return (
    <div className="col-span-full rounded-xl border border-dashed border-slate-300 bg-white py-20 text-center">
      <p className="font-display text-xl font-black uppercase text-brand-800">
        Chưa có dự án nào
      </p>
      <p className="mt-2 text-sm text-ink-muted">
        {category === 'all'
          ? 'Các dự án sẽ sớm được cập nhật tại đây.'
          : `Chưa có dự án thuộc danh mục “${category}”.`}
      </p>
    </div>
  );
}

export default function Projects() {
  const [active, setActive] = useState('all');

  const filtered = useMemo(
    () =>
      active === 'all'
        ? projects
        : projects.filter((project) => project.category === active),
    [active],
  );

  return (
    <>
      <SEO
        title="Dự án — Công ty Gia Nguyên"
        description="Danh mục dự án tiêu biểu Gia Nguyên đã thực hiện: cầu & đường, hạ tầng & khu đô thị, công nghiệp tại Khánh Hòa và khu vực Nam Trung Bộ."
      />
      <Hero />

      <section className="bg-surface-subtle py-16 md:py-20" aria-labelledby="projects-list-heading">
        <div className="mx-auto max-w-container px-4">
          <h2 id="projects-list-heading" className="sr-only">
            Danh sách dự án
          </h2>
          <div className="mb-12 flex flex-wrap justify-center gap-3">
            {FILTERS.map((filter) => {
              const isActive = active === filter.key;
              return (
                <button
                  key={filter.key}
                  type="button"
                  onClick={() => setActive(filter.key)}
                  aria-pressed={isActive}
                  className={`rounded-full border px-6 py-2.5 text-sm font-bold uppercase transition-all duration-300 ${
                    isActive
                      ? 'border-accent-500 bg-accent-700 text-white shadow-md'
                      : 'border-slate-200 bg-white text-brand-800 hover:border-brand-800'
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filtered.length === 0 ? (
              <EmptyState category={active} />
            ) : (
              filtered.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
