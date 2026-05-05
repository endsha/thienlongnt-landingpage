import clsx from 'clsx';

export default function Card({ as: Tag = 'div', className, children, ...rest }) {
  return (
    <Tag
      className={clsx(
        'rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
