import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import * as Dialog from '@radix-ui/react-dialog';
import * as Accordion from '@radix-ui/react-accordion';
import { navigation } from '@/data/navigation.js';

function ChevronDown() {
  return (
    <svg
      className="h-3 w-3 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

const linkClass = ({ isActive }) =>
  `flex min-h-[44px] items-center rounded-md px-3 text-sm font-bold uppercase tracking-tight transition-colors ${
    isActive ? 'bg-accent-50 text-accent-700' : 'text-brand-800 hover:bg-surface-subtle hover:text-accent-700'
  }`;

const subLinkClass = ({ isActive }) =>
  `flex min-h-[40px] items-center rounded-md px-3 text-[13px] font-semibold normal-case transition-colors ${
    isActive ? 'text-accent-700' : 'text-brand-800 hover:text-accent-700'
  }`;

export default function MobileDrawer({ open, onOpenChange }) {
  const location = useLocation();

  useEffect(() => {
    onOpenChange(false);
  }, [location.pathname, onOpenChange]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          className="fixed inset-y-0 right-0 z-50 flex h-full w-[85%] max-w-sm flex-col bg-white shadow-2xl outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right"
          aria-describedby={undefined}
        >
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <Dialog.Title className="font-display text-sm font-bold uppercase tracking-tight text-brand-800">
              Menu
            </Dialog.Title>
            <Dialog.Close
              aria-label="Đóng menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md text-brand-800 hover:bg-surface-subtle"
            >
              <CloseIcon />
            </Dialog.Close>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <Accordion.Root type="multiple" className="flex flex-col gap-1">
              {navigation.map((item) =>
                item.children ? (
                  <Accordion.Item key={item.label} value={item.label} className="rounded-md">
                    <Accordion.Header asChild>
                      <Accordion.Trigger className="group flex min-h-[44px] w-full items-center justify-between rounded-md px-3 text-sm font-bold uppercase tracking-tight text-brand-800 transition-colors hover:bg-surface-subtle hover:text-accent-700 data-[state=open]:text-accent-700">
                        <span>{item.label}</span>
                        <ChevronDown />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-top-1 data-[state=open]:slide-in-from-top-1">
                      <ul className="ml-3 flex flex-col gap-0.5 border-l border-slate-100 pl-2 pt-1">
                        {item.children.map((child) => (
                          <li key={child.path}>
                            <NavLink to={child.path} className={subLinkClass}>
                              {child.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </Accordion.Content>
                  </Accordion.Item>
                ) : (
                  <NavLink key={item.path} to={item.path} end={item.path === '/'} className={linkClass}>
                    {item.label}
                  </NavLink>
                ),
              )}
            </Accordion.Root>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
