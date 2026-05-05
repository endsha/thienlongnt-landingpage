import { Link } from 'react-router-dom';
import SEO from '@/components/SEO.jsx';

export default function NotFound() {
  return (
    <>
      <SEO
        title="404 — Không tìm thấy trang"
        description="Trang bạn tìm không tồn tại hoặc đã bị di chuyển."
        noIndex
      />
      <section className="bg-surface-subtle py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="font-display text-sm font-bold uppercase tracking-[0.4em] text-accent-700">
            404
          </p>
          <h1 className="mt-3 font-display text-4xl font-black uppercase leading-tight text-brand-800 md:text-5xl">
            Không tìm thấy trang
          </h1>
          <p className="mt-4 text-ink-muted">
            Trang bạn yêu cầu không tồn tại, đã bị xoá hoặc đường dẫn đã thay đổi.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-3 rounded-lg bg-brand-700 px-8 py-3.5 text-sm font-bold uppercase text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-brand-800"
            >
              ← Trang chủ
            </Link>
            <Link
              to="/lien-he"
              className="inline-flex items-center gap-3 rounded-lg border border-brand-200 bg-white px-8 py-3.5 text-sm font-bold uppercase text-brand-800 transition-all duration-300 hover:-translate-y-1 hover:border-accent-500 hover:text-accent-700"
            >
              Liên hệ
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
