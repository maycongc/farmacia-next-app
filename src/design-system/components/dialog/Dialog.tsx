'use client';
import { IconButton, Tooltip, Dialog } from '@radix-ui/themes';
import { XIcon } from 'lucide-react';
import React from 'react';
import { ThemeAwarePortal } from '@/components/portal/ThemeAwarePortal';

type DialogContentProps = React.ComponentPropsWithoutRef<typeof Dialog.Content>;

export const DialogContent = React.forwardRef<
  HTMLDivElement,
  DialogContentProps
>(function DialogContent({ children, ...props }, forwardedRef) {
  return (
    <ThemeAwarePortal>
      <Dialog.Content
        aria-describedby={undefined}
        {...props}
        ref={forwardedRef}
      >
        {children}

        <Tooltip content="Fechar">
          <Dialog.Close>
            <IconButton
              radius="full"
              variant="ghost"
              className="absolute top-3 right-3 w-22px h-22px]"
              color="gray"
            >
              <XIcon width={22} color="tomato" />
            </IconButton>
          </Dialog.Close>
        </Tooltip>
      </Dialog.Content>
    </ThemeAwarePortal>
  );
});
