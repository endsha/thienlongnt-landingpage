export const navigation = [
  { label: 'Trang chủ', path: '/' },
  { label: 'Giới thiệu', path: '/gioi-thieu' },
  {
    label: 'Công bố năng lực',
    children: [
      // { label: 'Giấy đăng ký kinh doanh', path: '/thu-vien/giay-phep-kinh-doanh' },
      {
        label: 'Bản công bố thông tin năng lực hoạt động thí nghiệm',
        path: '/thu-vien/cong-bo-nang-luc',
      },
      // {
      //   label: 'Giấy chứng nhận đủ điều kiện hoạt động thí nghiệm',
      //   path: '/thu-vien/chung-nhan-du-dieu-kien',
      // },
      // {
      //   label: 'Giấy chứng nhận hiệu chuẩn thiết bị',
      //   path: '/thu-vien/hieu-chuan-thiet-bi',
      // },
      // { label: 'Danh mục thiết bị', path: '/thu-vien/danh-muc-thiet-bi' },
      // { label: 'Danh sách cán bộ', path: '/thu-vien/danh-sach-can-bo' },
    ],
  },
  { label: 'Dịch vụ', path: '/dich-vu' },
  { label: 'Dự án', path: '/du-an' },
  { label: 'Tin tức', path: '/tin-tuc' },
  // {
  //   label: 'Thư viện',
  //   children: [
  //     { label: 'Hồ sơ năng lực', path: '/thu-vien/ho-so-nang-luc', icon: 'file-pdf' },
  //     { label: 'Tiêu chuẩn thi công', path: '/thu-vien/tieu-chuan-thi-cong', icon: 'file-contract' },
  //     { label: 'Tiêu chuẩn thí nghiệm', path: '/thu-vien/tieu-chuan-thi-nghiem', icon: 'vial' },
  //     { label: 'Excel - Ứng dụng', path: '/thu-vien/excel-ung-dung', icon: 'file-excel' },
  //   ],
  // },
  { label: 'Liên hệ', path: '/lien-he' },
];
