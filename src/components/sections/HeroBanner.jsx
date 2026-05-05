export default function HeroBanner() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-800">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 100 L100 0" stroke="white" strokeWidth="0.15" fill="none" />
        <path d="M0 80 L80 0" stroke="white" strokeWidth="0.15" fill="none" />
        <path d="M20 100 L100 20" stroke="white" strokeWidth="0.15" fill="none" />
        <path d="M0 60 L60 0" stroke="white" strokeWidth="0.15" fill="none" />
        <path d="M40 100 L100 40" stroke="white" strokeWidth="0.15" fill="none" />
      </svg>

      <div className="relative mx-auto max-w-container px-4 py-24 md:py-28 lg:py-32">
        <span
          className="mb-8 block h-1.5 w-20 rounded-full bg-accent-500 shadow-[0_0_20px_rgba(226,113,33,0.6)]"
          aria-hidden="true"
        />

        <div className="max-w-4xl space-y-6">
          <h1 className="font-display text-5xl font-black uppercase leading-[0.95] tracking-tighter text-white md:text-7xl lg:text-[88px]">
            Uy tín
            <br />
            <span className="text-accent-500">Chất lượng</span>
            <br />
            <span className="flex items-center gap-6">
              Hiệu quả
              <span
                aria-hidden="true"
                className="hidden h-[2px] flex-1 bg-white/30 lg:block"
              />
            </span>
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
            Khẳng định giá trị qua từng phép thử, kiến tạo niềm tin bền vững qua mỗi công trình.
          </p>
        </div>
      </div>
    </section>
  );
}
