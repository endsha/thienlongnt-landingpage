import LibraryPage from './LibraryPage.jsx';

export default function StaffList() {
  return (
    <LibraryPage
      eyebrow="Công bố năng lực"
      breadcrumb="Danh sách cán bộ"
      title="Danh sách cán bộ chủ chốt"
      lead="Đội ngũ kỹ sư — thí nghiệm viên có chứng chỉ hành nghề, được đào tạo bài bản và có kinh nghiệm thực tế trên các dự án trọng điểm."
      description={[
        'Đội ngũ Gia Nguyên gồm các kỹ sư xây dựng, kỹ sư vật liệu, thí nghiệm viên cấp III/IV và kỹ thuật viên hiện trường — tất cả đều có chứng chỉ hành nghề phù hợp.',
        'Danh sách công bố nhằm minh bạch năng lực nhân sự với chủ đầu tư và phục vụ công tác đấu thầu, công bố thông tin theo quy định.',
      ]}
      highlights={[
        'Hơn 50 cán bộ kỹ thuật toàn thời gian',
        'Tỉ lệ trên 70% có trình độ đại học chuyên ngành',
        'Chứng chỉ hành nghề cập nhật theo Thông tư 17/2016/TT-BXD',
      ]}
      documents={[
        {
          title: 'Danh sách cán bộ chủ chốt — kèm chứng chỉ hành nghề',
          meta: 'PDF · 18 trang · Cập nhật 2024',
          url: '/library/danh-sach-can-bo.pdf',
        },
        {
          title: 'Sơ đồ tổ chức công ty',
          meta: 'PDF · 1 trang',
          url: '/library/so-do-to-chuc.pdf',
        },
      ]}
    />
  );
}
