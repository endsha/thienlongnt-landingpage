const PIN_PATH =
  'M12 2a8 8 0 0 0-8 8c0 5.5 8 12 8 12s8-6.5 8-12a8 8 0 0 0-8-8Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z';
const PHONE_PATH =
  'M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.5 11.5 0 0 0 3.6.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.5 11.5 0 0 0 .6 3.6 1 1 0 0 1-.25 1L6.6 10.8Z';
const CLOCK_PATH =
  'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 11h-4V7h2v4h2Z';

const VIETNAM_OUTLINE =
  'M16 16 L60 30 L110 38 L150 42 L183 47 L170 64 L142 76 L150 105 L168 140 L185 175 L205 210 L220 248 L215 278 L196 302 L160 326 L118 348 L78 358 L40 348 L34 322 L60 302 L90 278 L110 244 L132 218 L138 192 L122 162 L100 132 L72 102 L48 74 L28 48 Z';

function InfoRow({ iconPath, label, children }) {
  return (
    <div className="flex items-start gap-5">
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-brand-700 shadow-md">
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d={iconPath} />
        </svg>
      </div>
      <div className="pt-1">
        <h3 className="mb-1 font-display text-sm font-black uppercase text-ink">{label}</h3>
        <div className="max-w-sm text-sm leading-relaxed text-ink-muted">{children}</div>
      </div>
    </div>
  );
}

function VietnamMap() {
  return (
    <svg
      viewBox="0 0 250 380"
      role="img"
      aria-label="Bản đồ Việt Nam, đánh dấu vị trí Khánh Hòa"
      className="h-full w-full"
    >
      <defs>
        <linearGradient id="vn-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#0e3b86" />
          <stop offset="1" stopColor="#0a2a63" />
        </linearGradient>
      </defs>

      <path
        d={VIETNAM_OUTLINE}
        fill="url(#vn-fill)"
        stroke="#1a4ba0"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      <g aria-hidden="true">
        <circle cx="232" cy="170" r="2" fill="#cbd5e1" />
        <circle cx="238" cy="166" r="1.5" fill="#cbd5e1" />
        <circle cx="228" cy="178" r="1.5" fill="#cbd5e1" />
        <text x="218" y="158" fontSize="9" fill="#94a3b8" fontFamily="inherit">
          Hoàng Sa
        </text>
      </g>

      <g aria-hidden="true">
        <circle cx="238" cy="290" r="2" fill="#cbd5e1" />
        <circle cx="244" cy="286" r="1.5" fill="#cbd5e1" />
        <circle cx="240" cy="300" r="1.5" fill="#cbd5e1" />
        <text x="218" y="316" fontSize="9" fill="#94a3b8" fontFamily="inherit">
          Trường Sa
        </text>
      </g>

      <g transform="translate(212 262)">
        <circle r="14" fill="#e27121" opacity="0.18" />
        <circle r="6" fill="#e27121" stroke="#fff" strokeWidth="2" />
      </g>
      <text
        x="155"
        y="266"
        fontSize="11"
        fontWeight="700"
        fill="#0a2a63"
        fontFamily="inherit"
      >
        Khánh Hòa
      </text>
    </svg>
  );
}

export default function OfficeLocation() {
  return (
    <section id="phan-van-phong" className="overflow-hidden bg-white py-20">
      <div className="mx-auto max-w-container px-4">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="space-y-10">
            <div>
              <p className="mb-2 text-sm font-bold uppercase tracking-widest text-accent-700">
                Liên hệ trực tiếp
              </p>
              <h2 className="mb-4 font-display text-2xl font-black uppercase tracking-tight text-brand-700 md:text-3xl">
                Văn phòng tại Khánh Hòa
              </h2>
              <span className="block h-1 w-16 bg-brand-500" aria-hidden="true" />
            </div>

            <div className="space-y-8">
              <InfoRow iconPath={PIN_PATH} label="Địa chỉ">
                Số 6 đường Lê Nại, phường Bảo An, tỉnh Khánh Hoà
              </InfoRow>
              <InfoRow iconPath={PHONE_PATH} label="Số điện thoại">
                <a href="tel:0908700009" className="font-bold text-ink transition-colors hover:text-accent-700">
                  0908.700009
                </a>
              </InfoRow>
              <InfoRow iconPath={CLOCK_PATH} label="Giờ làm việc">
                Thứ 2 – Thứ 7: 8:00 – 17:30
              </InfoRow>
            </div>
          </div>

          <div className="relative">
            <div className="relative mx-auto aspect-[2/3] max-h-[520px] w-full max-w-sm">
              <VietnamMap />
            </div>
            <div
              className="pointer-events-none absolute -bottom-4 -right-4 -z-10 h-32 w-32 rounded-full bg-accent-500/20 blur-2xl"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
