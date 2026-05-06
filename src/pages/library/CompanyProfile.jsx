import LibraryPage from './LibraryPage.jsx';

export default function CompanyProfile() {
  return (
    <LibraryPage
      eyebrow="Thư viện"
      breadcrumb="Hồ sơ năng lực"
      title="Hồ sơ năng lực Thiên Long Ninh Thuận"
      lead="Bộ hồ sơ năng lực tổng hợp giới thiệu Công ty TNHH Xây dựng Thiên Long Ninh Thuận — phù hợp dùng kèm hồ sơ thầu, hồ sơ chào giá."
      description={[
        'Hồ sơ năng lực tập hợp đầy đủ thông tin pháp lý, năng lực tài chính, năng lực kỹ thuật, danh mục dự án tiêu biểu và các chứng nhận đi kèm của Thiên Long Ninh Thuận.',
        'Bản trình bày dạng PDF được chuẩn hóa để chủ đầu tư, ban quản lý dự án và đối tác có thể đánh giá nhanh năng lực thực tế của đơn vị.',
      ]}
      highlights={[
        'Trình bày song ngữ Việt — Anh (theo yêu cầu)',
        'Cập nhật danh mục dự án và doanh thu theo năm gần nhất',
        'Đính kèm bản tóm tắt 1 trang dùng cho hồ sơ chào giá nhanh',
      ]}
      documents={[
        {
          title: 'Hồ sơ năng lực Thiên Long Ninh Thuận — bản đầy đủ',
          meta: 'PDF · 48 trang · Cập nhật 2024',
          url: '/library/ho-so-nang-luc-day-du.pdf',
        },
        {
          title: 'Hồ sơ năng lực — bản tóm tắt 1 trang',
          meta: 'PDF · 1 trang',
          url: '/library/ho-so-nang-luc-tom-tat.pdf',
        },
      ]}
    />
  );
}
