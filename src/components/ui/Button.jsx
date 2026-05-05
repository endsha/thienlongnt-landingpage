import { forwardRef } from 'react';
import clsx from 'clsx';

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ' +
  'disabled:pointer-events-none disabled:opacity-50';

const VARIANTS = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'border border-slate-300 bg-white text-slate-900 hover:bg-slate-50',
  ghost: 'text-slate-700 hover:bg-slate-100',
};

const SIZES = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
};

const Button = forwardRef(function Button(
  { as: Tag = 'button', variant = 'primary', size = 'md', className, type, ...rest },
  ref,
) {
  return (
    <Tag
      ref={ref}
      type={Tag === 'button' ? (type ?? 'button') : type}
      className={clsx(BASE, VARIANTS[variant], SIZES[size], className)}
      {...rest}
    />
  );
});

export default Button;
