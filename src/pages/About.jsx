import { Link } from 'react-router-dom';
import SEO from '@/components/SEO.jsx';

const TIMELINE = [
  {
    year: '2010',
    title: 'Thành lập công ty',
    body: 'Khởi đầu với một văn phòng tư vấn nhỏ tại Khánh Hòa, tập trung vào dịch vụ thí nghiệm vật liệu xây dựng phục vụ các công trình giao thông địa phương.',
  },
  {
    year: '2014',
    title: 'Mở rộng phòng thí nghiệm',
    body: 'Đầu tư hệ thống thiết bị thí nghiệm hiện đại, đạt chuẩn LAS-XD và mở rộng phạm vi sang thí nghiệm hiện trường, kiểm định chất lượng công trình.',
  },
  {
    year: '2018',
    title: 'Khẳng định thương hiệu',
    body: 'Trở thành đối tác tin cậy của hơn 200 chủ đầu tư, nhà thầu lớn tại khu vực Nam Trung Bộ với hàng trăm dự án dân dụng, công nghiệp và hạ tầng.',
  },
  {
    year: '2024',
    title: 'Phát triển toàn diện',
    body: 'Hoàn thiện hệ thống quản lý chất lượng theo ISO/IEC 17025, đội ngũ kỹ sư trên 50 người, đáp ứng các dự án trọng điểm cấp quốc gia.',
  },
];

const VALUES = [
  {
    title: 'Chính xác',
    body: 'Mỗi phép thử là một cam kết về tính trung thực và độ tin cậy của số liệu kỹ thuật.',
    icon: 'M12 2 4 6v6c0 5 3.5 9.5 8 10 4.5-.5 8-5 8-10V6l-8-4Zm-1 14-4-4 1.4-1.4L11 13.2l5.6-5.6L18 9l-7 7Z',
  },
  {
    title: 'Chuyên nghiệp',
    body: 'Tuân thủ nghiêm ngặt quy trình kỹ thuật và tiêu chuẩn TCVN trong từng hạng mục thử nghiệm.',
    icon: 'M12 2a5 5 0 0 1 5 5v3h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h1V7a5 5 0 0 1 5-5Zm-3 8h6V7a3 3 0 0 0-6 0v3Z',
  },
  {
    title: 'Đúng hẹn',
    body: 'Bảo đảm tiến độ thí nghiệm và bàn giao kết quả đúng cam kết, đồng hành cùng tiến độ công trình.',
    icon: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 11h-5v-2h3V6h2Z',
  },
  {
    title: 'Tận tâm',
    body: 'Luôn lắng nghe và đưa ra giải pháp kỹ thuật tối ưu, đặt lợi ích khách hàng lên hàng đầu.',
    icon: 'M12 21s-7-4.5-9.3-9.3A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.3 5.7C19 16.5 12 21 12 21Z',
  },
];

const LEADERSHIP = [
  {
    name: 'KS. Nguyễn Văn Gia',
    role: 'Giám đốc điều hành',
    bio: 'Hơn 20 năm kinh nghiệm trong lĩnh vực thí nghiệm và kiểm định chất lượng công trình xây dựng.',
  },
  {
    name: 'ThS. Trần Thị Hồng',
    role: 'Trưởng phòng Kỹ thuật',
    bio: 'Chuyên gia về thí nghiệm bê tông, đất, cát đá; phụ trách hệ thống quản lý chất lượng theo ISO/IEC 17025.',
  },
  {
    name: 'KS. Lê Quốc Bảo',
    role: 'Trưởng phòng Thí nghiệm hiện trường',
    bio: 'Trực tiếp quản lý đội ngũ kỹ sư hiện trường, đảm bảo chất lượng kiểm định trên toàn bộ dự án.',
  },
];

function ValueIcon({ d }) {
  return (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={d} />
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
          Giới thiệu
        </p>
        <h1 className="font-display text-4xl font-black uppercase leading-none tracking-tight text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.3)] md:text-6xl lg:text-7xl">
          Về Gia Nguyên
        </h1>
        <p className="mt-8 max-w-3xl border-l-4 border-accent-500 py-2 pl-6 text-lg font-light italic leading-relaxed text-slate-300 md:text-xl">
          Hơn một thập kỷ đồng hành cùng các công trình trọng điểm — chúng tôi đặt
          niềm tin của khách hàng làm kim chỉ nam cho mọi phép thử.
        </p>
      </div>
    </section>
  );
}

function History() {
  return (
    <section className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-container px-4">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-brand-700">
            Lịch sử phát triển
          </p>
          <h2 className="font-display text-3xl font-black uppercase leading-tight text-ink md:text-4xl">
            Hành trình kiến tạo niềm tin
          </h2>
        </div>

        <ol className="relative space-y-10 border-l-2 border-brand-100 pl-8 md:pl-12">
          {TIMELINE.map((item) => (
            <li key={item.year} className="relative">
              <span className="absolute -left-[42px] grid h-8 w-8 place-items-center rounded-full border-4 border-white bg-brand-500 shadow-md md:-left-[54px] md:h-10 md:w-10">
                <span className="h-2 w-2 rounded-full bg-white" />
              </span>
              <div className="mb-2 flex items-baseline gap-4">
                <span className="font-display text-3xl font-black text-accent-700 md:text-4xl">
                  {item.year}
                </span>
                <h3 className="font-display text-base font-black uppercase tracking-wide text-ink md:text-lg">
                  {item.title}
                </h3>
              </div>
              <p className="max-w-3xl leading-relaxed text-ink-muted">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function MissionVision() {
  return (
    <section className="bg-surface-subtle py-20 md:py-24">
      <div className="mx-auto grid max-w-container gap-8 px-4 md:grid-cols-2">
        <article className="relative overflow-hidden rounded-xl bg-white p-8 shadow-card md:p-10">
          <span className="absolute left-0 top-0 h-full w-1.5 bg-accent-500" aria-hidden="true" />
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-accent-700">
            Sứ mệnh
          </p>
          <h3 className="mb-5 font-display text-2xl font-black uppercase leading-tight text-ink md:text-3xl">
            Bảo chứng chất lượng cho mọi công trình
          </h3>
          <p className="leading-relaxed text-ink-muted">
            Cung cấp dịch vụ thí nghiệm và kiểm định chính xác, khách quan, kịp thời —
            góp phần nâng cao chất lượng và an toàn cho các công trình xây dựng tại
            Việt Nam.
          </p>
        </article>

        <article className="relative overflow-hidden rounded-xl bg-white p-8 shadow-card md:p-10">
          <span className="absolute left-0 top-0 h-full w-1.5 bg-brand-500" aria-hidden="true" />
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-brand-700">
            Tầm nhìn
          </p>
          <h3 className="mb-5 font-display text-2xl font-black uppercase leading-tight text-ink md:text-3xl">
            Đơn vị thí nghiệm hàng đầu khu vực
          </h3>
          <p className="leading-relaxed text-ink-muted">
            Trở thành đơn vị tư vấn — thí nghiệm xây dựng hàng đầu khu vực Nam Trung Bộ,
            được công nhận bởi tính chuyên nghiệp, độ tin cậy và năng lực kỹ thuật vượt trội.
          </p>
        </article>
      </div>
    </section>
  );
}

function Values() {
  return (
    <section className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-container px-4">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-brand-700">
            Giá trị cốt lõi
          </p>
          <h2 className="font-display text-3xl font-black uppercase leading-tight text-ink md:text-4xl">
            Bốn nguyên tắc dẫn lối
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value) => (
            <article
              key={value.title}
              className="group rounded-xl border border-brand-100 bg-brand-50/40 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:bg-white hover:shadow-card-hover"
            >
              <div className="mb-5 grid h-14 w-14 place-items-center rounded-lg bg-brand-700 text-white shadow-md transition-colors group-hover:bg-accent-500">
                <ValueIcon d={value.icon} />
              </div>
              <h3 className="mb-3 font-display text-lg font-black uppercase text-ink">
                {value.title}
              </h3>
              <p className="text-sm leading-relaxed text-ink-muted">{value.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Leadership() {
  return (
    <section className="bg-surface-subtle py-20 md:py-24">
      <div className="mx-auto max-w-container px-4">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-brand-700">
            Ban lãnh đạo
          </p>
          <h2 className="font-display text-3xl font-black uppercase leading-tight text-ink md:text-4xl">
            Đội ngũ dẫn dắt
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-muted">
            Những người trực tiếp định hình chiến lược kỹ thuật và bảo đảm chất lượng
            dịch vụ của Gia Nguyên qua từng dự án.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {LEADERSHIP.map((person) => (
            <article
              key={person.name}
              className="overflow-hidden rounded-xl bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="relative h-48 bg-gradient-to-br from-brand-700 to-brand-900">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_60%)]" />
                <div className="absolute bottom-4 left-6">
                  <span className="inline-block rounded-sm bg-accent-700 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.3em] text-white">
                    {person.role}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="mb-2 font-display text-lg font-black uppercase text-ink">
                  {person.name}
                </h3>
                <p className="text-sm leading-relaxed text-ink-muted">{person.bio}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-4">
          <Link
            to="/thu-vien/danh-sach-can-bo"
            className="inline-flex items-center gap-3 rounded-lg bg-brand-700 px-8 py-3.5 text-sm font-bold uppercase text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-brand-800 hover:shadow-xl md:text-base"
          >
            Xem danh sách cán bộ <ArrowIcon />
          </Link>
          <Link
            to="/lien-he"
            className="inline-flex items-center gap-3 rounded-lg border-2 border-brand-500 px-8 py-3 text-sm font-bold uppercase text-brand-700 transition-all duration-300 hover:-translate-y-1 hover:bg-brand-700 hover:text-white md:text-base"
          >
            Liên hệ hợp tác
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <>
      <SEO
        title="Về Gia Nguyên — Hành trình & Năng lực"
        description="Hơn một thập kỷ đồng hành cùng các công trình trọng điểm tại Khánh Hòa. Tìm hiểu lịch sử, sứ mệnh và đội ngũ kỹ sư của Gia Nguyên — đơn vị thí nghiệm LAS-XD."
      />
      <Hero />
      <History />
      <MissionVision />
      <Values />
      <Leadership />
    </>
  );
}
