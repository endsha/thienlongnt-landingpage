import LibraryPage from './LibraryPage.jsx';

export default function BusinessLicense() {
  return (
    <LibraryPage
      eyebrow="Công bố năng lực"
      breadcrumb="Giấy phép kinh doanh"
      title="Giấy phép kinh doanh"
      lead="Giấy chứng nhận đăng ký doanh nghiệp do Sở Kế hoạch & Đầu tư cấp — xác thực tư cách pháp nhân của Công ty TNHH Xây dựng và Thương mại Thiên Long Ninh Thuận."
      description={[
        'Giấy chứng nhận đăng ký doanh nghiệp là cơ sở pháp lý cao nhất xác lập quyền hoạt động của Thiên Long Ninh Thuận trong các lĩnh vực thí nghiệm vật liệu, kiểm định chất lượng và thi công xây dựng.',
        'Tài liệu được cập nhật theo lần đăng ký gần nhất, ghi đầy đủ ngành nghề kinh doanh, vốn điều lệ và người đại diện pháp luật.',
      ]}
      highlights={[
        'Cấp bởi Sở Kế hoạch & Đầu tư tỉnh Khánh Hòa',
        'Mã số doanh nghiệp duy nhất, có tra cứu trực tuyến',
        'Cập nhật ngành nghề thí nghiệm — kiểm định — thi công',
      ]}
      documents={[
        {
          title: 'Giấy chứng nhận đăng ký doanh nghiệp (bản mới nhất)',
          meta: 'PDF · 2 trang · Cập nhật 2024',
          url: '/library/giay-phep-kinh-doanh.pdf',
        },
      ]}
    />
  );
}
