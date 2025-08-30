'use client';

import { Dialog, Inset, Separator } from '@radix-ui/themes';
import SignupForm from './SignupForm';
import { DialogContent } from '@/design-system/components/dialog/Dialog';

export default function SignupModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <DialogContent
        aria-describedby={undefined}
        maxHeight={'90dvh'}
        maxWidth={{
          initial: '26rem',
        }}
        className="overflow-none"
      >
        <Dialog.Title
          size={{ initial: '4', xs: '5', sm: '6' }}
          weight={'medium'}
        >
          Cadastrar novo usuário
        </Dialog.Title>

        <Inset clip={'padding-box'} side={'x'} my={'2'}>
          <Separator size={'4'} />
        </Inset>

        <SignupForm setOpen={setOpen} />
      </DialogContent>
    </Dialog.Root>
  );
}
