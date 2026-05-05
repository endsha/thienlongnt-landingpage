import clsx from 'clsx';

export default function Icon({
  size = 20,
  label,
  className,
  children,
  viewBox = '0 0 24 24',
  ...rest
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? 'img' : 'presentation'}
      aria-hidden={label ? undefined : 'true'}
      aria-label={label}
      className={clsx('inline-block shrink-0', className)}
      {...rest}
    >
      {children}
    </svg>
  );
}
