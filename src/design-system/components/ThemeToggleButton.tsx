import { Button } from './Button';
import { useTheme } from '@/context/ThemeContext';

export function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button
      intent="ghost"
      size="md"
      type="button"
      aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
      onClick={toggleTheme}
      className="flex items-center gap-2 w-40 justify-center"
    >
      <span className="text-xl">{theme === 'dark' ? '🌙' : '☀️'}</span>
      <span className="font-medium">
        {theme === 'dark' ? 'Modo Escuro' : 'Modo Claro'}
      </span>
    </Button>
  );
}
