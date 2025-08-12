'use client';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Button } from './Button';

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export function DialogContent({ children }: { children: React.ReactNode }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm data-[state=open]:animate-fade-in z-[100]" />
      <DialogPrimitive.Content className="fixed left-1/2 top-1/2 w-[min(500px,90vw)] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-[hsl(var(--color-border))] bg-[hsl(var(--color-bg))] p-6 shadow-xl focus:outline-none z-[100]">
        {children}
        <DialogPrimitive.Close asChild>
          <Button intent="ghost" size="sm" className="absolute top-2 right-2">
            X
          </Button>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
