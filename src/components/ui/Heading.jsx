import clsx from 'clsx';

const SIZES = {
  1: 'text-4xl md:text-5xl font-bold tracking-tight',
  2: 'text-3xl md:text-4xl font-bold tracking-tight',
  3: 'text-2xl md:text-3xl font-semibold',
  4: 'text-xl md:text-2xl font-semibold',
  5: 'text-lg font-semibold',
  6: 'text-base font-semibold',
};

export default function Heading({ level = 2, as, className, children, ...rest }) {
  const Tag = as ?? `h${level}`;
  return (
    <Tag className={clsx(SIZES[level], 'text-slate-900', className)} {...rest}>
      {children}
    </Tag>
  );
}
