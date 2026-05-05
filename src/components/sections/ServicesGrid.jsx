function MicroscopeIcon() {
  return (
    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M9 2h2v6H9zm3 0h2v6h-2zM8 9h7v2H8zm-1 3h9l-1 8H8l-1-8zm-3 9h16v2H4z" />
    </svg>
  );
}

function HelmetIcon() {
  return (
    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 3a8 8 0 0 0-8 8v3h2v-3a6 6 0 0 1 4-5.66V11h2V5.07a6 6 0 0 1 6 5.93v3h2v-3a8 8 0 0 0-8-8ZM3 16h18v3H3z" />
    </svg>
  );
}

function CompassIcon() {
  return (
    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8Zm4-12-6 2-2 6 6-2 2-6Zm-4 5a1 1 0 1 1 1-1 1 1 0 0 1-1 1Z" />
    </svg>
  );
}

const SERVICES = [
  {
    icon: MicroscopeIcon,
    title: 'Khảo sát & Kiểm định',
    body: 'Khảo sát địa chất, địa hình và kiểm định chất lượng công trình theo tiêu chuẩn TCVN.',
  },
  {
    icon: HelmetIcon,
    title: 'Thi công xây dựng',
    body: 'Thi công các công trình giao thông, công nghiệp, hạ tầng và dân dụng đạt chuẩn chất lượng.',
  },
  {
    icon: CompassIcon,
    title: 'Tư vấn & Giám sát',
    body: 'Tư vấn lập dự án, thiết kế và giám sát thi công đảm bảo kỹ thuật và an toàn.',
  },
];

export default function ServicesGrid() {
  return (
    <section id="phan-dich-vu" className="bg-surface-subtle py-20">
      <div className="mx-auto max-w-container px-4">
        <header className="mb-16 text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-accent-700">
            Dịch vụ cốt lõi
          </p>
          <h2 className="font-display text-3xl font-black uppercase text-brand-800 md:text-4xl">
            Lĩnh vực hoạt động
          </h2>
          <span className="mx-auto mt-6 block h-1 w-24 bg-accent-500" aria-hidden="true" />
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {SERVICES.map(({ icon: Icon, title, body }) => (
            <article
              key={title}
              className="group border border-slate-100 bg-white p-10 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-brand-800 text-white transition-colors group-hover:bg-accent-500">
                <Icon />
              </div>
              <h3 className="mb-4 font-display text-xl font-black uppercase tracking-wide text-brand-800">
                {title}
              </h3>
              <p className="text-ink-muted">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
