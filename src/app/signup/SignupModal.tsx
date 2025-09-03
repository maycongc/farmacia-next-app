'use client';

import { Dialog, Inset, Separator } from '@radix-ui/themes';
import SignupForm from './SignupForm';
import { DialogContent } from '@/components/layout/dialog/Dialog';

export default function SignupModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <DialogContent className="overflow-none w-fit relative">
        <Dialog.Title
          size={{ initial: '4', xs: '5', sm: '6' }}
          weight={'medium'}
        >
          Cadastrar novo usuário
        </Dialog.Title>

        <Inset clip={'padding-box'} side={'x'} my={'1'}>
          <Separator size={'4'} />
        </Inset>

        <SignupForm setOpen={setOpen} />
      </DialogContent>
    </Dialog.Root>
  );
}
