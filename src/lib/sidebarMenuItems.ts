import { FlaskConicalIcon, PillIcon, UsersIcon } from 'lucide-react';
import { PERMISSOES } from '@/utils/permissions';

export interface MenuItem {
  label: string;
  href?: string;
  permission?: string;
  submenu?: MenuItem[];
  icon?: React.ComponentType<{ size?: number; className?: string }>;
}

export const sidebarMenuItems: MenuItem[] = [
  {
    label: 'Usuários',
    href: '/usuarios',
    permission: PERMISSOES.USUARIO_READ,
    icon: UsersIcon,
  },
  {
    label: 'Laboratórios',
    href: '/laboratorios',
    permission: PERMISSOES.LABORATORIO_READ,
    icon: FlaskConicalIcon,
  },
  {
    label: 'Remédios',
    href: '/remedios',
    permission: PERMISSOES.REMEDIO_READ,
    icon: PillIcon,
  },
];
