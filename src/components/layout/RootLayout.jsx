import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/layout/Header.jsx';
import Footer from '@/components/layout/Footer.jsx';
import OrganizationSchema from '@/components/OrganizationSchema.jsx';
import { useScrollToTop } from '@/hooks/useScrollToTop.js';

function RouteFallback() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[60vh] items-center justify-center"
    >
      <span className="h-10 w-10 animate-spin rounded-full border-2 border-brand-100 border-t-accent-500" />
      <span className="sr-only">Đang tải…</span>
    </div>
  );
}

export default function RootLayout() {
  useScrollToTop();

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-white">
      <OrganizationSchema />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent-500 focus:px-4 focus:py-2 focus:font-bold focus:text-white focus:shadow-xl"
      >
        Bỏ qua tới nội dung chính
      </a>
      <Header />
      <main id="main-content" tabIndex="-1" className="flex-1 focus:outline-none">
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
