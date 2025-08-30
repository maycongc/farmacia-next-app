import { TextField } from '@radix-ui/themes';
import React from 'react';

type TextFieldProps = React.ComponentPropsWithoutRef<typeof TextField.Root>;

type DialogTextFieldProps = Omit<TextFieldProps, 'size'>;

export const DialogTextFieldRoot = React.forwardRef<
  HTMLInputElement,
  DialogTextFieldProps
>(function DialogTextFieldRoot({ children, variant, ...props }, forwardedRef) {
  return (
    <TextField.Root
      variant={variant ? variant : 'surface'}
      size={{
        sm: '3',
      }}
      {...props}
      ref={forwardedRef}
    >
      {children}
    </TextField.Root>
  );
});
