import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { navigation } from '@/data/navigation.js';
import MobileDrawer from '@/components/layout/MobileDrawer.jsx';

const linkBase =
  'relative py-2 transition-colors hover:text-accent-700 outline-none focus-visible:text-accent-700';

function activeClass({ isActive }) {
  return `${linkBase} ${isActive ? 'text-accent-700' : ''}`;
}

function ChevronDown() {
  return (
    <svg
      className="h-2.5 w-2.5 opacity-60 transition-transform duration-200 group-data-[state=open]:rotate-180"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a8 8 0 0 0-8 8c0 5.5 8 12 8 12s8-6.5 8-12a8 8 0 0 0-8-8Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm0 2v.4l8 5.2 8-5.2V8H4Zm16 2.6-7.5 4.9a1 1 0 0 1-1 0L4 10.6V16h16v-5.4Z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.5 11.5 0 0 0 3.6.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.5 11.5 0 0 0 .6 3.6 1 1 0 0 1-.25 1L6.6 10.8Z" />
    </svg>
  );
}

function DropdownItem({ to, children }) {
  return (
    <NavigationMenu.Link asChild>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `block border-b border-gray-50 px-6 py-3 text-sm font-semibold normal-case transition-colors last:border-b-0 hover:bg-gray-50 hover:text-accent-700 ${
            isActive ? 'text-accent-700' : 'text-brand-800'
          }`
        }
      >
        {children}
      </NavLink>
    </NavigationMenu.Link>
  );
}

function NavDropdown({ label, items, contentClass = 'w-72' }) {
  return (
    <NavigationMenu.Item>
      <NavigationMenu.Trigger className="group flex items-center gap-1 py-2 uppercase outline-none transition-colors hover:text-accent-700 focus-visible:text-accent-700 data-[state=open]:text-accent-700">
        {label}
        <ChevronDown />
      </NavigationMenu.Trigger>
      <NavigationMenu.Content
        className={`absolute left-0 top-full mt-0 overflow-hidden rounded-b-lg border-t-2 border-accent-500 bg-white shadow-2xl ${contentClass}`}
      >
        <ul className="flex flex-col">
          {items.map((item) => (
            <li key={item.path}>
              <DropdownItem to={item.path}>{item.label}</DropdownItem>
            </li>
          ))}
        </ul>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  );
}

function UtilityBar() {
  return (
    <div className="hidden bg-brand-900 text-[12px] text-slate-200 md:block">
      <div className="mx-auto flex max-w-container items-center justify-between gap-6 px-4 py-2">
        <span className="flex items-center gap-2 uppercase tracking-wide">
          <PinIcon />
          Phường Bảo An, tỉnh Khánh Hòa
        </span>
        <a
          href="mailto:thienlongninhthuan@gmail.com"
          className="flex items-center gap-2 uppercase tracking-wide text-slate-200 transition-colors hover:text-accent-500"
        >
          <MailIcon />
          thienlongninhthuan@gmail.com
        </a>
        <a
          href="tel:0908700009"
          className="flex items-center gap-2 font-bold tracking-wide text-accent-500 transition-colors hover:text-white"
        >
          <PhoneIcon />
          0949536128
        </a>
      </div>
    </div>
  );
}

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <UtilityBar />

      <div className="bg-white">
        <div className="mx-auto flex max-w-container items-center justify-between gap-6 px-4 py-3">
          <Link
            to="/"
            className="flex items-center gap-3 shrink-0"
            aria-label="Thiên Long Ninh Thuận Khánh Hòa"
          >
            <span
              aria-hidden="true"
              className="grid h-12 w-12 place-items-center rounded-md bg-brand-800 font-display text-base font-black text-white shadow-md"
            >
              GN
            </span>
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent-700">
                Công ty TNHH
              </span>
              <span className="font-display text-[13px] font-black uppercase tracking-tight text-brand-800">
                Xây dựng
              </span>
              <span className="font-display text-base font-black uppercase tracking-tight text-brand-800">
                Thiên Long Ninh Thuận
              </span>
            </span>
          </Link>

          <NavigationMenu.Root className="relative hidden lg:block">
            <NavigationMenu.List className="flex items-center gap-6 text-[14px] font-bold uppercase tracking-tight text-brand-800">
              {navigation.map((item) =>
                item.children ? (
                  <NavDropdown key={item.label} label={item.label} items={item.children} />
                ) : (
                  <NavigationMenu.Item key={item.path}>
                    <NavigationMenu.Link asChild>
                      <NavLink to={item.path} end={item.path === '/'} className={activeClass}>
                        {item.label}
                      </NavLink>
                    </NavigationMenu.Link>
                  </NavigationMenu.Item>
                ),
              )}
            </NavigationMenu.List>

            <div className="absolute left-0 top-full flex w-full justify-start">
              <NavigationMenu.Viewport className="origin-top data-[state=open]:animate-in data-[state=closed]:animate-out" />
            </div>
          </NavigationMenu.Root>

          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-brand-800 hover:bg-surface-subtle lg:hidden"
            aria-label="Mở menu"
            aria-expanded={drawerOpen}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <MobileDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
    </header>
  );
}
