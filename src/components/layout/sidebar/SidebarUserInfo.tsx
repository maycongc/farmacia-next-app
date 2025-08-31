import { LogOut, User } from 'lucide-react';
import { EllipsisTooltip } from '@/design-system/components/EllipsisTooltip';
import { useAuth } from '@/hooks/useAuth';
interface SidebarUserInfoProps {
  expanded: boolean;
}

export function SidebarUserInfo({ expanded }: SidebarUserInfoProps) {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div
      className={`w-full flex items-center gap-3 px-4 py-3 mb-3 bg-[hsl(var(--color-bg-alt)/0.97)] dark:bg-[hsl(var(--color-bg)/0.7)] border border-transparent shadow-sm ${
        !expanded && 'hidden'
      }`}
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[hsl(var(--color-bg)/0.2)]">
        <User size={20} className="text-brand-500 dark:text-brand-300" />
      </div>
      <div className="flex flex-col min-w-0 max-w-full transition-all duration-300 overflow-hidden flex-1">
        <span className="text-sm text-gray-400 dark:text-gray-400 whitespace-nowrap overflow-hidden text-ellipsis block">
          Bem-vindo
        </span>
        <span className="font-semibold text-gray-900 dark:text-gray-100 truncate whitespace-nowrap overflow-hidden text-ellipsis block">
          {user.nome}
        </span>
      </div>
      <EllipsisTooltip tooltip="Sair">
        <button
          title="Sair"
          onClick={logout}
          className="ml-2 p-2 rounded-lg hover:bg-brand-100/10 text-gray-400 dark:text-gray-500 hover:text-red-500 transition-colors active:bg-red-500/20 active:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-400/40"
          aria-label="Deslogar"
        >
          <LogOut size={18} className="text-red-500" />
        </button>
      </EllipsisTooltip>
    </div>
  );
}
