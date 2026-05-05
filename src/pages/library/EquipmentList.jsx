import LibraryPage from './LibraryPage.jsx';

export default function EquipmentList() {
  return (
    <LibraryPage
      eyebrow="Công bố năng lực"
      breadcrumb="Danh mục thiết bị"
      title="Danh mục thiết bị thí nghiệm"
      lead="Hệ thống thiết bị thí nghiệm — kiểm định hiện đại của Gia Nguyên, phục vụ đầy đủ phạm vi các phép thử cơ — lý — hóa trong xây dựng."
      description={[
        'Phòng thí nghiệm được trang bị đồng bộ các thiết bị nén bê tông, kéo thép, đầm chặt, xuyên động, siêu âm cốt thép, lấy mẫu khoan… từ các nhà sản xuất uy tín.',
        'Danh mục được cập nhật theo từng đợt đầu tư mới, kèm thông tin xuất xứ, model và tình trạng hiệu chuẩn.',
      ]}
      highlights={[
        'Trên 80 đầu thiết bị chuyên dụng',
        'Xuất xứ từ Mỹ, Đức, Nhật Bản, Hàn Quốc',
        'Tích hợp thiết bị thí nghiệm hiện trường lưu động',
      ]}
      documents={[
        {
          title: 'Danh mục thiết bị thí nghiệm — phòng và hiện trường',
          meta: 'PDF · 16 trang · Cập nhật 2024',
          url: '/library/danh-muc-thiet-bi.pdf',
        },
      ]}
    />
  );
}
