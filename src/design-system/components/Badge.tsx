import { clsx } from 'clsx';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: 'neutral' | 'success' | 'danger' | 'info';
}

export function Badge({ tone = 'neutral', className, ...rest }: BadgeProps) {
  const tones: Record<string, string> = {
    neutral: 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200',
    success:
      'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100',
    danger: 'bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100',
    info: 'bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-blue-100',
  };

  return (
    <span
      className={clsx(
        'w-fit px-2 py-0.5 text-xs rounded-md',
        tones[tone],
        className,
      )}
      {...rest}
    />
  );
}
