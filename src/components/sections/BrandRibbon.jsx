import logo from '@/assets/logo.jpg';

export default function BrandRibbon() {
  return (
    <section
      aria-label="Công ty TNHH Xây dựng Thiên Long Ninh Thuận"
      className="border-y border-slate-100 bg-white py-6"
    >
      <div className="mx-auto flex max-w-container items-center gap-5 px-4">
        <img
          src={logo}
          alt="Thiên Long Ninh Thuận"
          className="h-16 w-auto shrink-0 object-contain"
        />
        <div className="flex flex-col leading-tight">
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent-700">
            Công ty TNHH
          </span>
          <span className="font-display text-base font-black uppercase tracking-tight text-brand-800 md:text-lg">
            Xây dựng
          </span>
          <span className="font-display text-xl font-black uppercase tracking-tight text-brand-800 md:text-2xl">
            Thiên Long Ninh Thuận
          </span>
        </div>
        <span
          aria-hidden="true"
          className="ml-auto hidden h-1 w-24 rounded-full bg-accent-500 md:block"
        />
      </div>
    </section>
  );
}
