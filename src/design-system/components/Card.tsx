import { clsx } from 'clsx';

export function Card(props: React.HTMLAttributes<HTMLDivElement>) {
  const { className, ...rest } = props;
  return (
    <div
      className={clsx(
        'rounded-lg border border-[hsl(var(--color-border))] bg-[hsl(var(--color-bg-alt))] p-4 shadow-sm',
        className,
      )}
      {...rest}
    />
  );
}
