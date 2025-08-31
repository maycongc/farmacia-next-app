import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Laboratórios | Farmacia App',
  description: 'Tela de laboratórios',
};

export default function LaboratorioLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
