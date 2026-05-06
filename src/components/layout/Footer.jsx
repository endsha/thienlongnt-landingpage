import logo from '@/assets/logo.jpg';

const COMPANY_TAGLINE =
  'Uy tín – Chất lượng – Hiệu quả. Đồng hành cùng sự phát triển bền vững của Quý khách hàng.';

const CURRENT_YEAR = new Date().getFullYear();

const SOCIALS = [
  {
    label: 'Facebook',
    href: '#',
    path: 'M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.08 5.66 21.24 10.44 22v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.91h-2.33V22C18.34 21.24 22 17.08 22 12.06Z',
  },
  {
    label: 'YouTube',
    href: '#',
    path: 'M23.5 6.5a3 3 0 0 0-2.1-2.1C19.5 4 12 4 12 4s-7.5 0-9.4.4A3 3 0 0 0 .5 6.5C.1 8.4.1 12 .1 12s0 3.6.4 5.5a3 3 0 0 0 2.1 2.1C4.5 20 12 20 12 20s7.5 0 9.4-.4a3 3 0 0 0 2.1-2.1c.4-1.9.4-5.5.4-5.5s0-3.6-.4-5.5ZM9.75 15.5v-7l6.5 3.5-6.5 3.5Z',
  },
  {
    label: 'Email',
    href: '#',
    path: 'M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6Zm2.4.4 7.6 5.7 7.6-5.7H4.4ZM20 8.3l-7.4 5.6a1 1 0 0 1-1.2 0L4 8.3V18h16V8.3Z',
  },
];

function Icon({ d, className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

const PIN_PATH =
  'M12 2a8 8 0 0 0-8 8c0 5.5 8 12 8 12s8-6.5 8-12a8 8 0 0 0-8-8Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z';
const PHONE_PATH =
  'M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.5 11.5 0 0 0 3.6.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.5 11.5 0 0 0 .6 3.6 1 1 0 0 1-.25 1L6.6 10.8Z';
const ID_PATH =
  'M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6Zm2 0v12h14V6H5Zm2 3h6v2H7V9Zm0 4h10v2H7v-2Z';

function ContactRow({ iconPath, label, children }) {
  return (
    <div className="flex items-start gap-4">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent-500/20 text-accent-500">
        <Icon d={iconPath} className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <p className="mb-1 text-xs font-bold uppercase tracking-wide text-slate-400">{label}</p>
        <div className="text-[13px] leading-relaxed text-slate-300">{children}</div>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-900 pb-8 pt-16 font-sans text-white">
      <div className="relative z-10 mx-auto grid max-w-container grid-cols-1 gap-12 px-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-3 rounded-lg bg-white p-3 shadow-xl">
            <img
              src={logo}
              alt="Thiên Long Ninh Thuận"
              className="h-14 w-auto object-contain"
            />
          </div>
          <p className="max-w-sm text-sm italic leading-relaxed text-slate-400">
            {COMPANY_TAGLINE}
          </p>
          <div className="flex gap-4">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="grid h-11 w-11 place-items-center rounded-full bg-white/5 transition-all duration-300 hover:bg-accent-500"
              >
                <Icon d={s.path} className="h-4 w-4 text-white" />
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="border-l-4 border-accent-500 pl-4 text-lg font-black uppercase tracking-widest text-white">
            Thông tin liên hệ
          </h2>
          <div className="space-y-5">
            <ContactRow iconPath={PIN_PATH} label="Địa chỉ trụ sở">
              Đường Thống Nhất, thôn Tân Sơn 2, phường Bảo An, tỉnh Khánh Hoà
            </ContactRow>
            <ContactRow iconPath={PHONE_PATH} label="Hotline tư vấn">
              <span className="font-black tracking-widest">0949536128</span>
            </ContactRow>
            <ContactRow iconPath={ID_PATH} label="Mã số thuế">
              4500597737
            </ContactRow>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="border-l-4 border-accent-500 pl-4 text-lg font-black uppercase tracking-widest text-white">
            Vị trí trên bản đồ
          </h2>
          <div className="h-[220px] overflow-hidden rounded-xl border-2 border-white/5 shadow-2xl">
            <iframe
              title="Bản đồ Thiên Long Ninh Thuận Khánh Hòa"
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3908.433236406987!2d108.99131799999999!3d11.592430199999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTHCsDM1JzMyLjgiTiAxMDjCsDU5JzI4LjciRQ!5e0!3m2!1sen!2s!4v1778051922175!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-container flex-col items-center justify-between gap-4 border-t border-white/5 px-4 pt-8 text-xs text-slate-400 md:flex-row">
        <p>© {CURRENT_YEAR} Công ty Thiên Long Ninh Thuận. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="text-slate-400 transition hover:text-white">
            Chính sách bảo mật
          </a>
          <a href="#" className="text-slate-400 transition hover:text-white">
            Điều khoản sử dụng
          </a>
        </div>
      </div>
    </footer>
  );
}
