import {
  FlaskConicalIcon,
  PillIcon,
  TrendingUpIcon,
  UsersIcon,
} from 'lucide-react';
import { Metadata } from 'next';
import DashboardContent from './DashboardContent';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';

export const metadata: Metadata = {
  title: 'Dashboard | Farmacia App',
  description: 'Painel de controle do sistema',
};

async function getStats() {
  return [
    {
      title: 'Total de Usuários',
      value: '1.234',
      change: '+12,5%',
      trend: 'up',
      icon: <UsersIcon size={28} />,
      color: 'blue' as const,
    },
    {
      title: 'Laboratórios',
      value: '89',
      change: '+3,2%',
      trend: 'up',
      icon: <FlaskConicalIcon size={28} />,
      color: 'green' as const,
    },
    {
      title: 'Remédios',
      value: '5.678',
      change: '-1,8%',
      trend: 'down',
      icon: <PillIcon size={28} />,
      color: 'purple' as const,
    },
    {
      title: 'Taxa de Crescimento',
      value: '24,7%',
      change: '+4,1%',
      trend: 'up',
      icon: <TrendingUpIcon size={28} />,
      color: 'orange' as const,
    },
  ];
}

async function getRecentActivities() {
  return [
    {
      id: 1,
      user: 'João Silva',
      action: 'criou um novo usuário',
      time: 'há 2 minutos',
      avatar: 'JS',
      status: 'success' as const,
    },
    {
      id: 2,
      user: 'Maria Santos',
      action: 'Atualizou laboratório',
      time: 'há 15 minutos',
      avatar: 'MS',
      status: 'info' as const,
    },
    {
      id: 3,
      user: 'Pedro Costa',
      action: 'cadastrou novo remédio',
      time: 'há 1 hora',
      avatar: 'PC',
      status: 'success' as const,
    },
    {
      id: 4,
      user: 'Ana Oliveira',
      action: 'removeu usuário inativo',
      time: 'há 2 horas',
      avatar: 'AO',
      status: 'warning' as const,
    },
  ];
}

async function getSystemStatus() {
  return [
    {
      name: 'API Status',
      status: 'online',
      color: 'green' as const,
    },
    {
      name: 'Database',
      status: 'conectado',
      color: 'green' as const,
    },
    {
      name: 'Backup',
      status: 'pendente',
      color: 'yellow' as const,
    },
    {
      name: 'Monitoramento',
      status: 'ativo',
      color: 'blue' as const,
    },
  ];
}

export default async function Dashboard() {
  const stats = await getStats();
  const recentActivities = await getRecentActivities();
  const systemStatus = await getSystemStatus();

  return (
    <ProtectedRoute>
      <DashboardContent
        stats={stats}
        recentActivities={recentActivities}
        systemStatus={systemStatus}
      />
    </ProtectedRoute>
  );
}
