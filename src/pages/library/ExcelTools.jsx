import LibraryPage from './LibraryPage.jsx';

export default function ExcelTools() {
  return (
    <LibraryPage
      eyebrow="Thư viện"
      breadcrumb="Excel ứng dụng"
      title="Excel ứng dụng trong xây dựng"
      lead="Bộ công cụ Excel chuyên dụng giúp kỹ sư hiện trường tính toán, lập biểu mẫu và xử lý số liệu thí nghiệm nhanh chóng."
      description={[
        'Các bảng tính được Thiên Long Ninh Thuận xây dựng và sử dụng nội bộ — chia sẻ ra cộng đồng kỹ thuật như một nguồn tham khảo miễn phí.',
        'Mỗi tệp đi kèm hướng dẫn sử dụng ngắn ở sheet đầu tiên và đã khóa các ô công thức để tránh chỉnh sửa nhầm.',
      ]}
      highlights={[
        'Tương thích Microsoft Excel 2016 trở lên',
        'Đã khóa công thức, mở vùng nhập liệu',
        'Sử dụng đúng hệ đơn vị TCVN',
      ]}
      documents={[
        {
          title: 'Bảng tính cấp phối bê tông theo TCVN 4453',
          meta: 'XLSX · 6 sheet',
          url: '/library/cap-phoi-be-tong.xlsx',
          format: 'excel',
          kind: 'Bảng tính Excel',
        },
        {
          title: 'Mẫu báo cáo thí nghiệm nén mẫu bê tông',
          meta: 'XLSX · Có macro tạo biểu đồ',
          url: '/library/bao-cao-nen-be-tong.xlsx',
          format: 'excel',
          kind: 'Bảng tính Excel',
        },
        {
          title: 'Bảng tính khối lượng đất đắp theo lớp',
          meta: 'XLSX · Tính theo phương pháp mặt cắt',
          url: '/library/khoi-luong-dat-dap.xlsx',
          format: 'excel',
          kind: 'Bảng tính Excel',
        },
        {
          title: 'Mẫu nhật ký thi công hiện trường',
          meta: 'XLSX · 1 sheet · In khổ A4',
          url: '/library/nhat-ky-thi-cong.xlsx',
          format: 'excel',
          kind: 'Bảng tính Excel',
        },
      ]}
    />
  );
}
