import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Remédios | Farmacia App',
  description: 'Tela de remédios',
};

export default function RemedioLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
