'use client';

import { Theme } from '@radix-ui/themes';
import { createContext, ReactNode, useEffect, useState } from 'react';
import PortalClienteInitializer from '@/components/portal/PortalClientInitializer.client';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined,
);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');

  useEffect(() => {
    const stored = localStorage.getItem('theme');

    if (!stored) {
      localStorage.setItem('theme', 'light');
      return;
    }

    if (stored === 'dark' || stored === 'light') {
      setThemeState(stored);

      const radixTheme = document.getElementById('radix-theme');

      if (radixTheme?.classList.contains('dark')) {
        radixTheme?.classList.remove('dark');
      }

      if (radixTheme?.classList.contains('light')) {
        radixTheme?.classList.remove('light');
      }

      radixTheme?.classList.add(stored);
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);

    const radixTheme = document.getElementById('radix-theme');

    if (radixTheme?.classList.contains('dark')) {
      radixTheme?.classList.remove('dark');
    }

    if (radixTheme?.classList.contains('light')) {
      radixTheme?.classList.remove('light');
    }

    radixTheme?.classList.add(newTheme);
  };

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      <Theme
        accentColor="blue"
        grayColor="slate"
        radius="large"
        scaling="100%"
        id="radix-theme"
        panelBackground="translucent"
        appearance={theme}
      >
        <PortalClienteInitializer />
        {children}
      </Theme>
    </ThemeContext.Provider>
  );
}
