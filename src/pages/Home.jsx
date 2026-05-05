import SEO from '@/components/SEO.jsx';
import HeroBanner from '@/components/sections/HeroBanner.jsx';
import BrandRibbon from '@/components/sections/BrandRibbon.jsx';
import AboutSummary from '@/components/sections/AboutSummary.jsx';
import CoreCapabilities from '@/components/sections/CoreCapabilities.jsx';
import ServicesGrid from '@/components/sections/ServicesGrid.jsx';
import FeaturedProjects from '@/components/sections/FeaturedProjects.jsx';
import NewsTeaser from '@/components/sections/NewsTeaser.jsx';
import OfficeLocation from '@/components/sections/OfficeLocation.jsx';

export default function Home() {
  return (
    <>
      <SEO />
      <HeroBanner />
      <BrandRibbon />
      <section id="phan-gioi-thieu" className="bg-white py-20">
        <div className="mx-auto grid max-w-container grid-cols-1 items-start gap-16 px-4 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <AboutSummary />
          </div>
          <div className="lg:col-span-5">
            <CoreCapabilities />
          </div>
        </div>
      </section>
      <ServicesGrid />
      <OfficeLocation />
      <FeaturedProjects />
      <NewsTeaser />
    </>
  );
}
