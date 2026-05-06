import { Link } from 'react-router-dom';

const TEST_CAPABILITIES = [
  'Thử nghiệm Bê tông & Xi măng',
  'Thử nghiệm Đất, Cát & Đá',
  'Thử nghiệm Kim loại & Mối hàn',
  'Thí nghiệm kiểm định hiện trường',
];

function CheckIcon() {
  return (
    <svg className="h-4 w-4 shrink-0 text-brand-700" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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

export default function AboutSummary() {
  return (
    <div className="space-y-8">
      <div>
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-brand-700">
          Về Công ty TNHH Xây dựng và Thương mại Thiên Long Ninh Thuận
        </p>
        <h2 className="mb-6 font-display text-3xl font-black uppercase leading-tight text-ink md:text-4xl">
          Nền tảng vững chắc cho mọi công trình
        </h2>

        <div className="space-y-5 text-justify leading-relaxed text-ink-muted">
          <p>
            <strong>Thiên Long Ninh Thuận</strong> là đơn vị tư vấn và thí nghiệm chuyên ngành xây dựng,
            vận hành phòng thí nghiệm đáp ứng các tiêu chuẩn khắt khe phục vụ kiểm soát
            chất lượng công trình.
          </p>
          <p>
            Đội ngũ kỹ sư giàu kinh nghiệm cùng hệ thống thiết bị hiện đại đảm bảo các
            dự án giao thông, dân dụng và công nghiệp đạt chuẩn kỹ thuật, đúng tiến độ
            và an toàn.
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-brand-100 bg-brand-50 p-6 md:p-8">
        <span className="absolute left-0 top-0 h-full w-1.5 bg-brand-500" aria-hidden="true" />
        <h3 className="mb-6 flex items-center gap-3 font-display text-sm font-black uppercase text-brand-800 md:text-base">
          <span className="h-[2px] w-8 bg-brand-500" aria-hidden="true" />
          Năng lực thử nghiệm trọng tâm
        </h3>
        <ul className="grid grid-cols-1 gap-y-4 gap-x-8 md:grid-cols-2">
          {TEST_CAPABILITIES.map((item) => (
            <li key={item} className="flex items-center gap-3 text-sm font-medium text-ink-muted md:text-base">
              <CheckIcon />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <Link
        to="/thu-vien/ho-so-nang-luc"
        className="inline-flex items-center gap-3 rounded-lg bg-brand-700 px-8 py-3.5 text-sm font-bold uppercase text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-brand-800 hover:shadow-xl md:text-base"
      >
        Chi tiết hồ sơ năng lực <ArrowIcon />
      </Link>
    </div>
  );
}
