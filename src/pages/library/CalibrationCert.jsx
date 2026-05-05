import LibraryPage from './LibraryPage.jsx';

export default function CalibrationCert() {
  return (
    <LibraryPage
      eyebrow="Công bố năng lực"
      breadcrumb="Hiệu chuẩn thiết bị"
      title="Hiệu chuẩn — kiểm định thiết bị"
      lead="Hồ sơ hiệu chuẩn định kỳ toàn bộ thiết bị thí nghiệm theo quy định pháp luật về đo lường — bảo đảm độ tin cậy của số liệu thử nghiệm."
      description={[
        'Toàn bộ thiết bị đo lường, máy thử nghiệm tại phòng thí nghiệm Gia Nguyên được hiệu chuẩn — kiểm định bởi các tổ chức được Bộ Khoa học & Công nghệ chỉ định.',
        'Bộ hồ sơ tổng hợp các giấy chứng nhận hiệu chuẩn còn hiệu lực, là cơ sở để xác nhận độ chính xác của kết quả thí nghiệm bàn giao cho khách hàng.',
      ]}
      highlights={[
        'Hiệu chuẩn định kỳ 12 tháng theo Thông tư 24/2013/TT-BKHCN',
        'Tổ chức hiệu chuẩn được Bộ KH&CN chỉ định',
        'Lưu vết hồ sơ hiệu chuẩn cho từng thiết bị',
      ]}
      documents={[
        {
          title: 'Tổng hợp giấy chứng nhận hiệu chuẩn thiết bị',
          meta: 'PDF · 24 trang · Cập nhật 2024',
          url: '/library/hieu-chuan-thiet-bi.pdf',
        },
        {
          title: 'Lịch hiệu chuẩn định kỳ năm 2024',
          meta: 'PDF · 3 trang',
          url: '/library/lich-hieu-chuan.pdf',
        },
      ]}
    />
  );
}
