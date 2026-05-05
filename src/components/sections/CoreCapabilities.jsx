const CARDS = [
  {
    title: 'Thiết bị hiện đại',
    body: 'Hệ thống máy nén, máy kéo và thiết bị đo lường được hiệu chuẩn định kỳ, đảm bảo độ tin cậy của kết quả.',
    accent: 'border-brand-500',
  },
  {
    title: 'Đội ngũ chuyên môn',
    body: 'Kỹ sư và thí nghiệm viên trình độ cao, am hiểu các quy chuẩn và tiêu chuẩn TCVN hiện hành.',
    accent: 'border-accent-500',
  },
  {
    title: 'Pháp lý minh bạch',
    body: 'Hoạt động dựa trên giấy chứng nhận đủ điều kiện thí nghiệm chuyên ngành do cơ quan có thẩm quyền cấp.',
    accent: 'border-ink-muted',
  },
];

export default function CoreCapabilities() {
  return (
    <div className="space-y-6">
      {CARDS.map((card) => (
        <article
          key={card.title}
          className={`rounded-lg border-l-4 bg-surface-subtle p-7 shadow-sm transition-shadow hover:shadow-md md:p-8 ${card.accent}`}
        >
          <h3 className="mb-3 font-display text-base font-black uppercase text-ink">{card.title}</h3>
          <p className="text-sm leading-relaxed text-ink-muted">{card.body}</p>
        </article>
      ))}
    </div>
  );
}
