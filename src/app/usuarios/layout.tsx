import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Usuários | Farmacia App',
  description: 'Tela de usuários',
};

export default function UsuarioLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
