// src/design-system/components/Button.tsx
'use client';
import { Slot } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import * as React from 'react';
import { cva, type VariantProps } from '../cva';

const buttonStyles = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      intent: {
        primary: 'bg-brand-600 text-white hover:bg-brand-700',
        outline: 'border border-brand-600 text-brand-600 hover:bg-brand-600/10',
        ghost: 'text-brand-600 hover:bg-brand-600/10',
        danger: 'bg-red-600 text-white hover:bg-red-700',
      },
      size: {
        sm: 'text-sm h-8 px-3',
        md: 'text-sm h-10 px-4',
        lg: 'h-12 px-6 text-base',
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'md',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  asChild?: boolean;
  className?: string;
}

export function Button({
  intent,
  size,
  asChild,
  className,
  ...rest
}: ButtonProps) {
  const Comp: any = asChild ? Slot : 'button';
  return (
    <Comp
      className={clsx(buttonStyles({ intent, size }), className)}
      {...rest}
    />
  );
}
