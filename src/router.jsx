import { createBrowserRouter, Link, useParams } from 'react-router-dom';
import RootLayout from '@/components/layout/RootLayout.jsx';

function Placeholder({ name }) {
  return (
    <section className="mx-auto max-w-3xl p-8">
      <p className="text-xs uppercase tracking-wide text-slate-500">Placeholder</p>
      <h1 className="mt-1 text-2xl font-bold text-slate-900">{name}</h1>
      <Link to="/" className="mt-4 inline-block text-sm text-blue-600 underline">
        ← Trang chủ
      </Link>
    </section>
  );
}

function SlugPlaceholder({ name }) {
  const { slug } = useParams();
  return <Placeholder name={`${name} — ${slug}`} />;
}

function NotFound() {
  return (
    <section className="mx-auto max-w-3xl p-8">
      <h1 className="text-2xl font-bold text-slate-900">404 — không tìm thấy trang</h1>
      <Link to="/" className="mt-4 inline-block text-sm text-blue-600 underline">
        ← Trang chủ
      </Link>
    </section>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Placeholder name="Home" /> },
      { path: 'gioi-thieu', element: <Placeholder name="About" /> },
      { path: 'dich-vu', element: <Placeholder name="Services" /> },
      { path: 'du-an', element: <Placeholder name="Projects" /> },
      { path: 'du-an/:slug', element: <SlugPlaceholder name="ProjectDetail" /> },
      { path: 'tin-tuc', element: <Placeholder name="News" /> },
      { path: 'tin-tuc/:slug', element: <SlugPlaceholder name="NewsDetail" /> },
      { path: 'lien-he', element: <Placeholder name="Contact" /> },
      { path: 'thu-vien/giay-phep-kinh-doanh', element: <Placeholder name="BusinessLicense" /> },
      { path: 'thu-vien/cong-bo-nang-luc', element: <Placeholder name="CapacityDeclaration" /> },
      { path: 'thu-vien/chung-nhan-du-dieu-kien', element: <Placeholder name="EligibilityCert" /> },
      { path: 'thu-vien/hieu-chuan-thiet-bi', element: <Placeholder name="CalibrationCert" /> },
      { path: 'thu-vien/danh-muc-thiet-bi', element: <Placeholder name="EquipmentList" /> },
      { path: 'thu-vien/danh-sach-can-bo', element: <Placeholder name="StaffList" /> },
      { path: 'thu-vien/ho-so-nang-luc', element: <Placeholder name="CompanyProfile" /> },
      { path: 'thu-vien/tieu-chuan-thi-cong', element: <Placeholder name="ConstructionStandards" /> },
      { path: 'thu-vien/tieu-chuan-thi-nghiem', element: <Placeholder name="TestingStandards" /> },
      { path: 'thu-vien/excel-ung-dung', element: <Placeholder name="ExcelTools" /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
