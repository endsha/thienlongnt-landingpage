import LibraryPage from './LibraryPage.jsx';

export default function TestingStandards() {
  return (
    <LibraryPage
      eyebrow="Thư viện"
      breadcrumb="Tiêu chuẩn thí nghiệm"
      title="Tiêu chuẩn thí nghiệm"
      lead="Bộ tiêu chuẩn TCVN — TCXDVN áp dụng trong các phép thử cơ — lý — hóa cho vật liệu xây dựng và nền móng."
      description={[
        'Đây là tập hợp các tiêu chuẩn được phòng thí nghiệm Gia Nguyên áp dụng làm cơ sở phương pháp thử trong từng phép đo — phù hợp với phạm vi LAS-XD đã đăng ký.',
        'Tài liệu công bố nhằm minh bạch phương pháp thử với khách hàng và phục vụ tra cứu nội bộ.',
      ]}
      highlights={[
        'Phân nhóm theo vật liệu: bê tông, xi măng, cốt thép, đất, cát đá',
        'Đối chiếu chéo với tiêu chuẩn quốc tế (ASTM, BS, JIS) khi liên quan',
        'Cập nhật phiên bản theo công bố mới nhất',
      ]}
      documents={[
        {
          title: 'TCVN 3105:1993 — Hỗn hợp bê tông & bê tông nặng — Lấy mẫu, chế tạo và bảo dưỡng',
          meta: 'PDF',
          url: '/library/tcvn-3105-1993.pdf',
        },
        {
          title: 'TCVN 3118:1993 — Bê tông nặng — Phương pháp xác định cường độ chịu nén',
          meta: 'PDF',
          url: '/library/tcvn-3118-1993.pdf',
        },
        {
          title: 'TCVN 197-1:2014 — Vật liệu kim loại — Thử kéo ở nhiệt độ phòng',
          meta: 'PDF',
          url: '/library/tcvn-197-1-2014.pdf',
        },
        {
          title: 'TCVN 4198:2014 — Đất xây dựng — Phương pháp xác định thành phần hạt',
          meta: 'PDF',
          url: '/library/tcvn-4198-2014.pdf',
        },
        {
          title: 'TCVN 9354:2012 — Đất xây dựng — Phương pháp xác định mô đun đàn hồi tại hiện trường',
          meta: 'PDF',
          url: '/library/tcvn-9354-2012.pdf',
        },
      ]}
    />
  );
}
