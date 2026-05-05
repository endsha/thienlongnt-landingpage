import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '@/components/layout/RootLayout.jsx';
import Home from '@/pages/Home.jsx';

const About = lazy(() => import('@/pages/About.jsx'));
const Services = lazy(() => import('@/pages/Services.jsx'));
const Contact = lazy(() => import('@/pages/Contact.jsx'));
const Projects = lazy(() => import('@/pages/Projects.jsx'));
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail.jsx'));
const News = lazy(() => import('@/pages/News.jsx'));
const NewsDetail = lazy(() => import('@/pages/NewsDetail.jsx'));
const BusinessLicense = lazy(() => import('@/pages/library/BusinessLicense.jsx'));
const CapacityDeclaration = lazy(() => import('@/pages/library/CapacityDeclaration.jsx'));
const EligibilityCert = lazy(() => import('@/pages/library/EligibilityCert.jsx'));
const CalibrationCert = lazy(() => import('@/pages/library/CalibrationCert.jsx'));
const EquipmentList = lazy(() => import('@/pages/library/EquipmentList.jsx'));
const StaffList = lazy(() => import('@/pages/library/StaffList.jsx'));
const CompanyProfile = lazy(() => import('@/pages/library/CompanyProfile.jsx'));
const ConstructionStandards = lazy(() => import('@/pages/library/ConstructionStandards.jsx'));
const TestingStandards = lazy(() => import('@/pages/library/TestingStandards.jsx'));
const ExcelTools = lazy(() => import('@/pages/library/ExcelTools.jsx'));
const NotFound = lazy(() => import('@/pages/NotFound.jsx'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'gioi-thieu', element: <About /> },
      { path: 'dich-vu', element: <Services /> },
      { path: 'du-an', element: <Projects /> },
      { path: 'du-an/:slug', element: <ProjectDetail /> },
      { path: 'tin-tuc', element: <News /> },
      { path: 'tin-tuc/:slug', element: <NewsDetail /> },
      { path: 'lien-he', element: <Contact /> },
      { path: 'thu-vien/giay-phep-kinh-doanh', element: <BusinessLicense /> },
      { path: 'thu-vien/cong-bo-nang-luc', element: <CapacityDeclaration /> },
      { path: 'thu-vien/chung-nhan-du-dieu-kien', element: <EligibilityCert /> },
      { path: 'thu-vien/hieu-chuan-thiet-bi', element: <CalibrationCert /> },
      { path: 'thu-vien/danh-muc-thiet-bi', element: <EquipmentList /> },
      { path: 'thu-vien/danh-sach-can-bo', element: <StaffList /> },
      { path: 'thu-vien/ho-so-nang-luc', element: <CompanyProfile /> },
      { path: 'thu-vien/tieu-chuan-thi-cong', element: <ConstructionStandards /> },
      { path: 'thu-vien/tieu-chuan-thi-nghiem', element: <TestingStandards /> },
      { path: 'thu-vien/excel-ung-dung', element: <ExcelTools /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
