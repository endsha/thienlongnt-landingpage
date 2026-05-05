import { Link } from 'react-router-dom';
import SEO from '@/components/SEO.jsx';

function ArrowIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-5-5 5 5-5 5" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 3v10.6l3.3-3.3 1.4 1.4L12 16.4l-4.7-4.7 1.4-1.4 3.3 3.3V3h2ZM5 19h14v2H5v-2Z" />
    </svg>
  );
}

function PdfIcon() {
  return (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm-1 7V3.5L18.5 9H13ZM8 13h2.5a1.5 1.5 0 0 1 0 3H9v2H8v-5Zm1 1v1h1.5a.5.5 0 0 0 0-1H9Zm4-1h2.5a1.5 1.5 0 0 1 1.5 1.5v2a1.5 1.5 0 0 1-1.5 1.5H13v-5Zm1 1v3h1.5a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5H14Zm5 0v1h2v1h-2v2h-1v-5h3v1h-2Z" />
    </svg>
  );
}

function ExcelIcon() {
  return (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm-1 7V3.5L18.5 9H13ZM8.4 12h1.6l1.5 2.6L13 12h1.6l-2.3 3.7L14.7 19h-1.7l-1.5-2.6L10 19H8.4l2.3-3.6L8.4 12Z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm-1 14.4-4.7-4.7 1.4-1.4L11 13.6l5.3-5.3 1.4 1.4Z" />
    </svg>
  );
}

function Hero({ eyebrow, title, lead, breadcrumb }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-800 via-brand-700 to-brand-900 py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-[10%] -top-[20%] h-[60%] w-[60%] rounded-full bg-white/5 blur-[120px]" />
        <div className="absolute -bottom-[20%] -left-[10%] h-[50%] w-[50%] rounded-full bg-accent-500/10 blur-[100px]" />
      </div>
      <div className="relative mx-auto max-w-container px-4">
        <nav aria-label="Đường dẫn" className="mb-8 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-300">
          <Link to="/" className="transition-colors hover:text-accent-300">Trang chủ</Link>
          <span className="text-slate-500" aria-hidden="true">/</span>
          <span className="text-slate-300">Thư viện</span>
          <span className="text-slate-500" aria-hidden="true">/</span>
          <span className="text-accent-300">{breadcrumb}</span>
        </nav>

        <span className="mb-6 block h-1.5 w-20 rounded-full bg-accent-500 shadow-[0_0_25px_rgba(226,113,33,0.8)]" />
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.4em] text-accent-300">{eyebrow}</p>
        <h1 className="font-display text-3xl font-black uppercase leading-tight tracking-tight text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.3)] md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {lead && (
          <p className="mt-6 max-w-3xl border-l-4 border-accent-500 py-2 pl-6 text-base font-light italic leading-relaxed text-slate-300 md:text-lg">
            {lead}
          </p>
        )}
      </div>
    </section>
  );
}

function DocumentCard({ doc }) {
  return (
    <article className="group flex flex-col gap-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-card-hover md:flex-row md:items-center md:gap-7 md:p-7">
      <div className="grid h-16 w-16 shrink-0 place-items-center rounded-lg bg-accent-500/10 text-accent-700 transition-colors group-hover:bg-accent-500 group-hover:text-white">
        {doc.format === 'excel' ? <ExcelIcon /> : <PdfIcon />}
      </div>
      <div className="flex-1">
        <p className="mb-1 text-xs font-bold uppercase tracking-widest text-brand-700">
          {doc.kind || 'Tài liệu PDF'}
        </p>
        <h3 className="mb-2 font-display text-base font-black uppercase leading-snug text-ink md:text-lg">
          {doc.title}
        </h3>
        {doc.meta && <p className="text-sm text-ink-muted">{doc.meta}</p>}
      </div>
      <a
        href={doc.url}
        target="_blank"
        rel="noopener noreferrer"
        download
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-700 px-5 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-800 hover:shadow-lg"
      >
        <DownloadIcon />
        Tải về
      </a>
    </article>
  );
}

export default function LibraryPage({ eyebrow, title, lead, breadcrumb, description, documents, highlights, seoTitle, seoDescription }) {
  return (
    <>
      <SEO title={seoTitle || `${title} — Thư viện`} description={seoDescription || lead} />
      <Hero eyebrow={eyebrow} title={title} lead={lead} breadcrumb={breadcrumb} />

      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto grid max-w-container gap-12 px-4 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-brand-700">
              Mô tả
            </p>
            <h2 className="mb-6 font-display text-2xl font-black uppercase leading-tight text-ink md:text-3xl">
              Thông tin tài liệu
            </h2>
            <div className="space-y-4 leading-relaxed text-ink-muted">
              {description.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {highlights?.length > 0 && (
              <div className="mt-10 rounded-xl border border-brand-100 bg-brand-50/60 p-6 md:p-7">
                <h3 className="mb-5 flex items-center gap-3 font-display text-sm font-black uppercase text-brand-800">
                  <span className="h-[2px] w-8 bg-accent-500" aria-hidden="true" />
                  Điểm nổi bật
                </h3>
                <ul className="space-y-3">
                  {highlights.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-ink-muted md:text-base">
                      <CheckIcon />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="lg:col-span-7">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-accent-700">
              Tài liệu công bố
            </p>
            <h2 className="mb-8 font-display text-2xl font-black uppercase leading-tight text-ink md:text-3xl">
              Danh sách hồ sơ
            </h2>
            <div className="space-y-4">
              {documents.map((doc) => (
                <DocumentCard key={doc.title} doc={doc} />
              ))}
            </div>

            <p className="mt-8 text-sm text-ink-muted">
              Trường hợp cần bản gốc có dấu đỏ, vui lòng{' '}
              <Link to="/lien-he" className="font-bold text-brand-700 underline-offset-2 hover:underline">
                liên hệ trực tiếp
              </Link>{' '}
              văn phòng Gia Nguyên.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-brand-800 py-14">
        <div className="mx-auto flex max-w-container flex-col items-start gap-5 px-4 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-display text-xl font-black uppercase leading-tight text-white md:text-2xl">
              Cần thêm thông tin về năng lực Gia Nguyên?
            </h2>
            <p className="mt-2 text-slate-300">
              Đội ngũ tư vấn sẵn sàng cung cấp hồ sơ chi tiết theo yêu cầu của dự án.
            </p>
          </div>
          <Link
            to="/lien-he"
            className="inline-flex items-center gap-3 rounded-lg bg-accent-700 px-7 py-3.5 text-sm font-bold uppercase text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-accent-600"
          >
            Liên hệ ngay <ArrowIcon />
          </Link>
        </div>
      </section>
    </>
  );
}
