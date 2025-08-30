import { Portal } from '@radix-ui/themes';
import { ReactNode } from 'react';
import { usePortalContainer } from '@/hooks/usePortalContainer';

export function ThemeAwarePortal({ children }: { children: ReactNode }) {
  const container = usePortalContainer();

  return <Portal container={container ?? undefined}>{children}</Portal>;
}
