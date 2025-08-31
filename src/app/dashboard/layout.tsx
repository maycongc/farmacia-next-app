import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Dashboard | Farmacia App',
  description: 'Painel de controle do sistema',
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
