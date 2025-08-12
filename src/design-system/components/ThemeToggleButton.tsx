import { Sun, Moon } from 'lucide-react';
import { Button } from './Button';
import { useTheme } from '@/context/ThemeContext';
import { EllipsisTooltip } from '@/design-system/components/EllipsisTooltip';

export function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  return (
    <EllipsisTooltip tooltip="Trocar de tema">
      <Button
        intent="ghost"
        size="md"
        type="button"
        aria-label={
          theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'
        }
        onClick={toggleTheme}
        className="flex items-center gap-2 w-10 sm:w-40 justify-center"
      >
        {theme === 'dark' ? (
          <Moon className="w-6 h-6 min-w-[24px] min-h-[24px]" />
        ) : (
          <Sun className="w-6 h-6 min-w-[24px] min-h-[24px]" />
        )}
        <span className="font-medium hidden sm:inline">
          {theme === 'dark' ? 'Modo Escuro' : 'Modo Claro'}
        </span>
      </Button>
    </EllipsisTooltip>
  );
}
