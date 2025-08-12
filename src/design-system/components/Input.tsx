import { clsx } from 'clsx';
import * as React from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...rest }, ref) => {
    return (
      <label className="flex flex-col gap-1 text-sm">
        {label && <span className="font-medium">{label}</span>}
        <input
          ref={ref}
          className={clsx(
            'h-10 px-3 rounded-md border bg-[hsl(var(--color-bg-alt))] border-[hsl(var(--color-border))] focus-ring transition-fast ease-standard',
            error && 'border-red-500',
            className,
          )}
          {...rest}
        />
        {error && <span className="text-xs text-red-600">{error}</span>}
      </label>
    );
  },
);

Input.displayName = 'Input';
