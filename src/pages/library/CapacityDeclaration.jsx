import LibraryPage from './LibraryPage.jsx';

export default function CapacityDeclaration() {
  return (
    <LibraryPage
      eyebrow="Công bố năng lực"
      breadcrumb="Công bố năng lực"
      title="Công bố năng lực hoạt động xây dựng"
      lead="Hồ sơ công bố thông tin năng lực thí nghiệm — tư vấn — thi công của Thiên Long Ninh Thuận trên hệ thống công khai của cơ quan quản lý xây dựng."
      description={[
        'Theo quy định, các tổ chức hoạt động trong lĩnh vực xây dựng phải công bố công khai năng lực hành nghề trên cổng thông tin của Bộ Xây dựng và Sở Xây dựng địa phương.',
        'Bộ hồ sơ tổng hợp đầy đủ thông tin năng lực, phạm vi hoạt động và các chứng nhận đi kèm để chủ đầu tư và đối tác kiểm tra, đối chiếu.',
      ]}
      highlights={[
        'Đăng ký năng lực hạng II trên hệ thống Bộ Xây dựng',
        'Phạm vi hoạt động: thí nghiệm, tư vấn giám sát, thiết kế, thi công',
        'Cập nhật định kỳ theo quy định pháp luật hiện hành',
      ]}
      documents={[
        {
          title: 'Bản công bố năng lực hoạt động xây dựng',
          meta: 'PDF · 8 trang · Cập nhật 2024',
          url: '/library/cong-bo-nang-luc.pdf',
        },
        {
          title: 'Quyết định công nhận năng lực — Sở Xây dựng',
          meta: 'PDF · 4 trang',
          url: '/library/quyet-dinh-cong-nhan.pdf',
        },
      ]}
    />
  );
}
