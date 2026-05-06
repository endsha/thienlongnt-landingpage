import { useEffect, useState } from 'react';
import SEO from '@/components/SEO.jsx';

const CONTACT_EMAIL = 'thienlongninhthuan@gmail.com';

const INFO = [
  {
    label: 'Địa chỉ',
    value: 'Đường Thống Nhất, thôn Tân Sơn 2, phường Bảo An, tỉnh Khánh Hoà',
    icon: 'M12 2a8 8 0 0 0-8 8c0 5.5 8 12 8 12s8-6.5 8-12a8 8 0 0 0-8-8Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z',
  },
  {
    label: 'Điện thoại',
    value: '0949536128',
    href: 'tel:0908700009',
    icon: 'M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.5 11.5 0 0 0 3.6.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.5 11.5 0 0 0 .6 3.6 1 1 0 0 1-.25 1L6.6 10.8Z',
  },
  {
    label: 'Email',
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    icon: 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 4 8 5 8-5V6l-8 5-8-5v2Z',
  },
  {
    label: 'Giờ làm việc',
    value: 'Thứ 2 – Thứ 7: 8:00 – 17:30',
    icon: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 11h-4V7h2v4h2Z',
  },
];

const INITIAL = { name: '', email: '', phone: '', subject: '', message: '' };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Vui lòng nhập họ và tên.';
  if (!values.email.trim()) errors.email = 'Vui lòng nhập email.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Email chưa đúng định dạng.';
  if (values.phone && !/^[0-9+\s().-]{8,}$/.test(values.phone)) errors.phone = 'Số điện thoại không hợp lệ.';
  if (!values.message.trim()) errors.message = 'Vui lòng nhập nội dung.';
  return errors;
}

function Toast({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex max-w-sm items-start gap-3 rounded-xl border border-brand-100 bg-white px-5 py-4 shadow-2xl"
    >
      <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent-700 text-white">
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4Z" />
        </svg>
      </span>
      <p className="text-sm font-medium text-ink">{message}</p>
    </div>
  );
}

function InfoIcon({ d }) {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-800 via-brand-700 to-brand-900 py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-[10%] -top-[20%] h-[60%] w-[60%] rounded-full bg-white/5 blur-[120px]" />
        <div className="absolute -bottom-[20%] -left-[10%] h-[50%] w-[50%] rounded-full bg-accent-500/10 blur-[100px]" />
      </div>
      <div className="relative mx-auto max-w-container px-4">
        <span className="mb-8 block h-1.5 w-20 rounded-full bg-accent-500 shadow-[0_0_25px_rgba(226,113,33,0.8)]" />
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.4em] text-accent-300">
          Liên hệ
        </p>
        <h1 className="font-display text-4xl font-black uppercase leading-none tracking-tight text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.3)] md:text-6xl lg:text-7xl">
          Bắt đầu cuộc trò chuyện
        </h1>
        <p className="mt-8 max-w-3xl border-l-4 border-accent-500 py-2 pl-6 text-lg font-light italic leading-relaxed text-slate-300 md:text-xl">
          Gửi yêu cầu để đội ngũ kỹ sư Thiên Long Ninh Thuận tư vấn giải pháp thí nghiệm, kiểm định
          phù hợp cho công trình của bạn.
        </p>
      </div>
    </section>
  );
}

function Field({ id, label, error, children, required }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs font-bold uppercase tracking-widest text-ink">
        {label}
        {required && (
          <>
            <span className="ml-1 text-accent-700" aria-hidden="true">*</span>
            <span className="sr-only"> (bắt buộc)</span>
          </>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-accent-600">
          {error}
        </p>
      )}
    </div>
  );
}

function ContactForm({ onSuccess }) {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});

  const inputClass = (field) =>
    `w-full border-0 border-b-2 bg-transparent px-0 py-3 text-base text-ink placeholder:text-slate-400 focus:outline-none focus:ring-0 focus-visible:bg-brand-50/40 ${
      errors[field]
        ? 'border-accent-500 focus:border-b-[3px] focus:border-accent-600'
        : 'border-slate-200 focus:border-b-[3px] focus:border-brand-500'
    }`;

  const ariaProps = (field) => ({
    'aria-invalid': errors[field] ? 'true' : undefined,
    'aria-describedby': errors[field] ? `${field}-error` : undefined,
    'aria-required': ['name', 'email', 'message'].includes(field) ? 'true' : undefined,
  });

  function update(field) {
    return (e) => {
      setValues((v) => ({ ...v, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };
  }

  function handleSubmit(event) {
    event.preventDefault();
    const v = validate(values);
    setErrors(v);
    if (Object.keys(v).length > 0) return;
    console.log('[Contact form] submission', values);
    onSuccess();
    setValues(INITIAL);
  }

  return (
    <form
      method="POST"
      action={`mailto:${CONTACT_EMAIL}`}
      encType="text/plain"
      onSubmit={handleSubmit}
      noValidate
      className="space-y-7"
    >
      <div className="grid gap-7 md:grid-cols-2">
        <Field id="name" label="Họ và tên" error={errors.name} required>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={update('name')}
            className={inputClass('name')}
            placeholder="Nguyễn Văn A"
            {...ariaProps('name')}
          />
        </Field>
        <Field id="email" label="Email" error={errors.email} required>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={update('email')}
            className={inputClass('email')}
            placeholder="ban@congty.vn"
            {...ariaProps('email')}
          />
        </Field>
        <Field id="phone" label="Số điện thoại" error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={update('phone')}
            className={inputClass('phone')}
            placeholder="0908 700 009"
            {...ariaProps('phone')}
          />
        </Field>
        <Field id="subject" label="Chủ đề">
          <input
            id="subject"
            name="subject"
            type="text"
            value={values.subject}
            onChange={update('subject')}
            className={inputClass('subject')}
            placeholder="Yêu cầu báo giá thí nghiệm"
          />
        </Field>
      </div>

      <Field id="message" label="Nội dung" error={errors.message} required>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={update('message')}
          className={`${inputClass('message')} resize-none`}
          placeholder="Mô tả ngắn về công trình, hạng mục cần thí nghiệm, tiến độ mong muốn…"
          {...ariaProps('message')}
        />
      </Field>

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-ink-muted">
          Bằng việc gửi biểu mẫu, bạn đồng ý cho Thiên Long Ninh Thuận liên hệ lại qua email/điện thoại.
        </p>
        <button
          type="submit"
          className="group inline-flex items-center justify-center gap-3 rounded-lg bg-accent-700 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-accent-600 hover:shadow-xl"
        >
          Gửi yêu cầu
          <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-5-5 5 5-5 5" />
          </svg>
        </button>
      </div>
    </form>
  );
}

function ContactBody() {
  const [toast, setToast] = useState(false);

  return (
    <section className="bg-white py-20 md:py-24">
      <div className="mx-auto grid max-w-container gap-12 px-4 lg:grid-cols-12 lg:gap-16">
        <section className="lg:col-span-5" aria-labelledby="contact-info-heading">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-brand-700">
            Thông tin liên hệ
          </p>
          <h2
            id="contact-info-heading"
            className="mb-6 font-display text-3xl font-black uppercase leading-tight text-ink md:text-4xl"
          >
            Văn phòng tại Khánh Hòa
          </h2>
          <p className="mb-10 max-w-md leading-relaxed text-ink-muted">
            Đội ngũ tư vấn của Thiên Long Ninh Thuận sẵn sàng hỗ trợ trong giờ hành chính —
            cam kết phản hồi trong vòng 24 giờ làm việc.
          </p>

          <ul className="space-y-7">
            {INFO.map((item) => (
              <li key={item.label} className="flex items-start gap-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700">
                  <InfoIcon d={item.icon} />
                </span>
                <div className="pt-1">
                  <p className="mb-1 font-display text-xs font-black uppercase tracking-[0.2em] text-ink-muted">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-base font-semibold text-ink transition-colors hover:text-accent-700"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-base font-semibold text-ink">{item.value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <div className="lg:col-span-7">
          <div className="relative rounded-2xl border border-slate-100 bg-white p-8 shadow-card md:p-12">
            <span className="absolute left-0 top-10 h-12 w-1.5 bg-accent-500" aria-hidden="true" />
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-accent-700">
              Gửi yêu cầu
            </p>
            <h3 className="mb-8 font-display text-2xl font-black uppercase leading-tight text-ink md:text-3xl">
              Để lại thông tin — chúng tôi sẽ liên hệ lại
            </h3>
            <ContactForm onSuccess={() => setToast(true)} />
          </div>
        </div>
      </div>

      {toast && (
        <Toast
          message="Đã gửi yêu cầu thành công. Thiên Long Ninh Thuận sẽ liên hệ lại trong 24h."
          onClose={() => setToast(false)}
        />
      )}
    </section>
  );
}

function MapBlock() {
  return (
    <section className="bg-surface-subtle py-20 md:py-24">
      <div className="mx-auto max-w-container px-4">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-brand-700">
            Bản đồ
          </p>
          <h2 className="font-display text-3xl font-black uppercase leading-tight text-ink md:text-4xl">
            Đường đến văn phòng
          </h2>
        </div>

        <div className="relative">
          <div className="aspect-[16/8] overflow-hidden rounded-2xl border border-slate-200 shadow-card">
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
          <div
            className="pointer-events-none absolute -bottom-6 -right-6 -z-10 h-40 w-40 rounded-full bg-accent-500/20 blur-3xl"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}

export default function Contact() {
  return (
    <>
      <SEO
        title="Liên hệ Thiên Long Ninh Thuận — Văn phòng Khánh Hòa"
        description="Liên hệ tư vấn dịch vụ thí nghiệm, kiểm định, thi công của Thiên Long Ninh Thuận tại Khánh Hòa. Phản hồi yêu cầu trong 24h. Hotline 0949536128."
      />
      <Hero />
      <ContactBody />
      <MapBlock />
    </>
  );
}
