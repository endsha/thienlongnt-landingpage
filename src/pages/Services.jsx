import { Link } from 'react-router-dom';
import SEO from '@/components/SEO.jsx';

const SERVICES = [
  {
    anchor: 'khao-sat',
    eyebrow: '01 — Khảo sát & Kiểm định',
    title: 'Khảo sát địa chất & kiểm định chất lượng',
    lead:
      'Cung cấp dịch vụ khảo sát địa chất, địa hình và kiểm định chất lượng công trình theo tiêu chuẩn TCVN, ISO/IEC 17025 — phục vụ giai đoạn chuẩn bị đầu tư đến nghiệm thu công trình.',
    bullets: [
      'Khảo sát địa chất công trình, địa hình tỉ lệ lớn',
      'Thí nghiệm cơ lý đất, đá, cát trong phòng và hiện trường',
      'Kiểm định chất lượng kết cấu bê tông cốt thép',
      'Đánh giá hiện trạng, lập hồ sơ kỹ thuật công trình hiện hữu',
    ],
    icon: 'M9 2h2v6H9zm3 0h2v6h-2zM8 9h7v2H8zm-1 3h9l-1 8H8l-1-8zm-3 9h16v2H4z',
  },
  {
    anchor: 'thi-cong',
    eyebrow: '02 — Thi công xây dựng',
    title: 'Thi công công trình giao thông & dân dụng',
    lead:
      'Đảm nhận thi công các công trình giao thông, công nghiệp, hạ tầng và dân dụng — vận hành theo quy trình quản lý chất lượng nội bộ và đáp ứng tiến độ cam kết với chủ đầu tư.',
    bullets: [
      'Thi công nền, móng, kết cấu bê tông cốt thép',
      'Thi công đường giao thông, hạ tầng kỹ thuật',
      'Thi công hạng mục dân dụng, công nghiệp quy mô vừa',
      'Quản lý an toàn lao động, vệ sinh môi trường tại công trường',
    ],
    icon: 'M12 3a8 8 0 0 0-8 8v3h2v-3a6 6 0 0 1 4-5.66V11h2V5.07a6 6 0 0 1 6 5.93v3h2v-3a8 8 0 0 0-8-8ZM3 16h18v3H3z',
  },
  {
    anchor: 'tu-van',
    eyebrow: '03 — Tư vấn & Giám sát',
    title: 'Tư vấn thiết kế & giám sát thi công',
    lead:
      'Đội ngũ kỹ sư có chứng chỉ hành nghề tư vấn lập dự án, thiết kế kỹ thuật và giám sát thi công — bảo đảm công trình đạt yêu cầu kỹ thuật, an toàn và đúng tiến độ.',
    bullets: [
      'Lập dự án, lập báo cáo kinh tế — kỹ thuật',
      'Thiết kế kỹ thuật, thiết kế bản vẽ thi công',
      'Giám sát thi công xây dựng, lắp đặt thiết bị',
      'Tư vấn quản lý dự án và kiểm soát chi phí',
    ],
    icon: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8Zm4-12-6 2-2 6 6-2 2-6Zm-4 5a1 1 0 1 1 1-1 1 1 0 0 1-1 1Z',
  },
];

function CheckIcon() {
  return (
    <svg className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm-1 14.4-4.7-4.7 1.4-1.4L11 13.6l5.3-5.3 1.4 1.4Z" />
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

function ServiceIcon({ d }) {
  return (
    <svg className="h-12 w-12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={d} />
    </svg>
  );
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
          Dịch vụ
        </p>
        <h1 className="font-display text-4xl font-black uppercase leading-none tracking-tight text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.3)] md:text-6xl lg:text-7xl">
          Giải pháp toàn diện
        </h1>
        <p className="mt-8 max-w-3xl border-l-4 border-accent-500 py-2 pl-6 text-lg font-light italic leading-relaxed text-slate-300 md:text-xl">
          Ba lĩnh vực cốt lõi — Khảo sát & Kiểm định, Thi công xây dựng, Tư vấn & Giám sát —
          phục vụ trọn vẹn vòng đời công trình từ ý tưởng đến vận hành.
        </p>
      </div>
    </section>
  );
}

function ServiceNav() {
  return (
    <nav aria-label="Mục lục dịch vụ" className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-container flex-wrap gap-x-2 gap-y-3 px-4 py-5 md:gap-x-6">
        {SERVICES.map((service) => (
          <a
            key={service.anchor}
            href={`#${service.anchor}`}
            className="rounded-full border border-brand-100 bg-brand-50 px-5 py-2 text-xs font-bold uppercase tracking-wider text-brand-800 transition-colors hover:bg-brand-700 hover:text-white md:text-sm"
          >
            {service.eyebrow}
          </a>
        ))}
      </div>
    </nav>
  );
}

function ServiceBlock({ service, index }) {
  const reverse = index % 2 === 1;
  const bg = index % 2 === 1 ? 'bg-surface-subtle' : 'bg-white';

  return (
    <section id={service.anchor} className={`scroll-mt-24 py-20 md:py-24 ${bg}`}>
      <div className="mx-auto max-w-container px-4">
        <div className={`grid items-center gap-12 lg:grid-cols-12 ${reverse ? 'lg:[&>div:first-child]:order-2' : ''}`}>
          <div className="lg:col-span-7">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-accent-700">
              {service.eyebrow}
            </p>
            <h2 className="mb-6 font-display text-3xl font-black uppercase leading-tight text-ink md:text-4xl">
              {service.title}
            </h2>
            <p className="mb-8 leading-relaxed text-ink-muted md:text-lg">{service.lead}</p>

            <ul className="mb-10 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {service.bullets.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-ink-muted md:text-base">
                  <CheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/lien-he"
                className="inline-flex items-center gap-3 rounded-lg bg-brand-700 px-7 py-3.5 text-sm font-bold uppercase text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-brand-800 hover:shadow-xl"
              >
                Yêu cầu báo giá <ArrowIcon />
              </Link>
              <Link
                to="/du-an"
                className="inline-flex items-center gap-3 rounded-lg border-2 border-brand-500 px-7 py-3 text-sm font-bold uppercase text-brand-700 transition-all duration-300 hover:-translate-y-1 hover:bg-brand-700 hover:text-white"
              >
                Xem dự án tiêu biểu
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-700 to-brand-900 p-10 shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_60%)]" />
              <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-accent-500/20 blur-3xl" />
              <div className="relative flex flex-col items-start gap-6">
                <div className="grid h-20 w-20 place-items-center rounded-xl bg-accent-700 text-white shadow-xl">
                  <ServiceIcon d={service.icon} />
                </div>
                <div className="font-display text-7xl font-black leading-none text-white/10 md:text-8xl">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <p className="text-sm uppercase tracking-[0.3em] text-accent-300">
                  Tiêu chuẩn TCVN · ISO/IEC 17025
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  return (
    <section className="bg-brand-800 py-16">
      <div className="mx-auto flex max-w-container flex-col items-start gap-6 px-4 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl font-black uppercase leading-tight text-white md:text-3xl">
            Cần tư vấn cho dự án của bạn?
          </h2>
          <p className="mt-3 text-slate-300">
            Đội ngũ kỹ sư Thiên Long Ninh Thuận sẵn sàng đồng hành — từ khảo sát ban đầu đến nghiệm thu.
          </p>
        </div>
        <Link
          to="/lien-he"
          className="inline-flex items-center gap-3 rounded-lg bg-accent-700 px-8 py-4 text-sm font-bold uppercase text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-accent-600 md:text-base"
        >
          Liên hệ ngay <ArrowIcon />
        </Link>
      </div>
    </section>
  );
}

export default function Services() {
  return (
    <>
      <SEO
        title="Dịch vụ thí nghiệm — kiểm định — thi công"
        description="Khảo sát địa chất, kiểm định chất lượng công trình, thi công xây dựng và tư vấn giám sát theo TCVN. Giải pháp toàn diện cho công trình tại Khánh Hòa và Nam Trung Bộ."
      />
      <Hero />
      <ServiceNav />
      {SERVICES.map((service, index) => (
        <ServiceBlock key={service.anchor} service={service} index={index} />
      ))}
      <CTABanner />
    </>
  );
}
