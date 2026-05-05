import { memo, useCallback, useSyncExternalStore } from 'react';
import { Link } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import projects from '@/data/projects.json';

const FEATURED = projects.slice(0, 6);

function ChevronIcon({ direction = 'right' }) {
  return (
    <svg
      className={`h-4 w-4 ${direction === 'left' ? 'rotate-180' : ''}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m9 5 7 7-7 7" />
    </svg>
  );
}

const ProjectCard = memo(function ProjectCard({ project }) {
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
        <h3 className="font-display text-lg font-black uppercase leading-snug text-brand-800 line-clamp-2 group-hover:text-accent-700">
          {project.title}
        </h3>
        <p className="text-sm text-ink-muted line-clamp-2">{project.summary}</p>
        <div className="mt-auto flex items-center justify-between pt-4 text-xs font-semibold uppercase tracking-wide text-ink-muted">
          <span>{project.location}</span>
          <span>{project.year}</span>
        </div>
      </div>
    </Link>
  );
});

function useEmblaSubscribe(emblaApi) {
  return useCallback(
    (notify) => {
      if (!emblaApi) return () => {};
      emblaApi.on('select', notify);
      emblaApi.on('reInit', notify);
      return () => {
        emblaApi.off('select', notify);
        emblaApi.off('reInit', notify);
      };
    },
    [emblaApi],
  );
}

export default function FeaturedProjects() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
  });

  const subscribe = useEmblaSubscribe(emblaApi);
  const canPrev = useSyncExternalStore(
    subscribe,
    () => emblaApi?.canScrollPrev() ?? false,
    () => false,
  );
  const canNext = useSyncExternalStore(
    subscribe,
    () => emblaApi?.canScrollNext() ?? false,
    () => false,
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section id="phan-du-an" className="border-t border-slate-100 bg-white py-20">
      <div className="mx-auto max-w-container px-4">
        <header className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-widest text-accent-700">
              Hồ sơ năng lực
            </p>
            <h2 className="font-display text-3xl font-black uppercase text-brand-800 md:text-4xl">
              Dự án tiêu biểu
            </h2>
          </div>
          <Link
            to="/du-an"
            className="inline-flex items-center gap-2 font-bold text-brand-800 transition hover:text-accent-700"
          >
            Xem toàn bộ dự án
            <ChevronIcon />
          </Link>
        </header>

        <div className="group/carousel relative">
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canPrev}
            aria-label="Dự án trước"
            className="absolute -left-5 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-brand-800 text-white opacity-0 shadow-xl transition-all duration-300 hover:bg-accent-500 disabled:cursor-not-allowed disabled:opacity-0 group-hover/carousel:opacity-100 md:flex"
          >
            <ChevronIcon direction="left" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canNext}
            aria-label="Dự án kế tiếp"
            className="absolute -right-5 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-brand-800 text-white opacity-0 shadow-xl transition-all duration-300 hover:bg-accent-500 disabled:cursor-not-allowed disabled:opacity-0 group-hover/carousel:opacity-100 md:flex"
          >
            <ChevronIcon />
          </button>

          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex gap-6">
              {FEATURED.map((project) => (
                <div
                  key={project.slug}
                  className="min-w-0 shrink-0 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
