import LibraryPage from './LibraryPage.jsx';

export default function EligibilityCert() {
  return (
    <LibraryPage
      eyebrow="Công bố năng lực"
      breadcrumb="Chứng nhận đủ điều kiện"
      title="Chứng nhận đủ điều kiện hoạt động"
      lead="Quyết định và chứng nhận đủ điều kiện hoạt động thí nghiệm chuyên ngành xây dựng (LAS-XD) do cơ quan có thẩm quyền cấp."
      description={[
        'Phòng thí nghiệm Gia Nguyên được cấp mã LAS-XD và chứng nhận đủ điều kiện thực hiện các phép thử chuyên ngành xây dựng theo Nghị định 62/2016/NĐ-CP và các văn bản hiện hành.',
        'Chứng nhận xác nhận năng lực thiết bị, nhân sự, hệ thống quản lý và phạm vi các phép thử được phép cung cấp dịch vụ ra thị trường.',
      ]}
      highlights={[
        'Mã số LAS-XD do Bộ Xây dựng cấp',
        'Hệ thống quản lý chất lượng tham chiếu ISO/IEC 17025',
        'Phạm vi phép thử được công nhận đính kèm chứng nhận',
      ]}
      documents={[
        {
          title: 'Giấy chứng nhận đủ điều kiện hoạt động LAS-XD',
          meta: 'PDF · 6 trang · Cập nhật 2024',
          url: '/library/chung-nhan-du-dieu-kien.pdf',
        },
        {
          title: 'Phụ lục phạm vi phép thử được công nhận',
          meta: 'PDF · 12 trang',
          url: '/library/phu-luc-pham-vi-phep-thu.pdf',
        },
      ]}
    />
  );
}
