import clsx from 'clsx';

const VARIANTS = {
  default: 'py-12 md:py-16',
  hero: 'py-16 md:py-24',
};

export default function Section({ as: Tag = 'section', variant = 'default', className, children, ...rest }) {
  return (
    <Tag className={clsx(VARIANTS[variant], className)} {...rest}>
      {children}
    </Tag>
  );
}
