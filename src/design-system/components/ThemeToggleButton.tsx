import { Button, IconButton, Text, Tooltip } from '@radix-ui/themes';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

export function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Tooltip content="Trocar de tema">
      <Button
        variant="ghost"
        size="3"
        type="button"
        onClick={toggleTheme}
        className="m-0"
      >
        {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
        <Text as="span" weight={'medium'} className="hidden sm:inline">
          {theme === 'dark' ? 'Modo Escuro' : 'Modo Claro'}
        </Text>
      </Button>
    </Tooltip>
  );
}
