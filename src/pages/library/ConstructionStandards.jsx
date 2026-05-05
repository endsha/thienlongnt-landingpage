import LibraryPage from './LibraryPage.jsx';

export default function ConstructionStandards() {
  return (
    <LibraryPage
      eyebrow="Thư viện"
      breadcrumb="Tiêu chuẩn thi công"
      title="Tiêu chuẩn thi công"
      lead="Tổng hợp các tiêu chuẩn TCVN, TCXDVN và quy chuẩn kỹ thuật hiện hành liên quan đến công tác thi công và nghiệm thu công trình xây dựng."
      description={[
        'Bộ tài liệu được sưu tầm và sắp xếp theo nhóm hạng mục công trình — phục vụ tham khảo cho kỹ sư hiện trường, tư vấn giám sát và bộ phận quản lý chất lượng.',
        'Các tiêu chuẩn được cập nhật theo phiên bản mới nhất do Bộ Xây dựng / Bộ Khoa học & Công nghệ ban hành.',
      ]}
      highlights={[
        'Phân loại theo hạng mục: nền — móng, bê tông, kết cấu thép, hoàn thiện',
        'Đánh dấu rõ phiên bản hiện hành / đã thay thế',
        'Có thể tra cứu theo mã số TCVN trong mục lục',
      ]}
      documents={[
        {
          title: 'TCVN 4453:1995 — Kết cấu bê tông & bê tông cốt thép toàn khối',
          meta: 'PDF · Quy phạm thi công và nghiệm thu',
          url: '/library/tcvn-4453-1995.pdf',
        },
        {
          title: 'TCVN 9362:2012 — Tiêu chuẩn thiết kế nền nhà & công trình',
          meta: 'PDF',
          url: '/library/tcvn-9362-2012.pdf',
        },
        {
          title: 'TCVN 5641:2012 — Bể chứa bằng bê tông cốt thép — Thi công & nghiệm thu',
          meta: 'PDF',
          url: '/library/tcvn-5641-2012.pdf',
        },
        {
          title: 'TCVN 9395:2012 — Cọc khoan nhồi — Thi công & nghiệm thu',
          meta: 'PDF',
          url: '/library/tcvn-9395-2012.pdf',
        },
      ]}
    />
  );
}
