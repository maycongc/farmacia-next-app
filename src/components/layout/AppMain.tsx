'use client';

import { Box, ScrollArea } from '@radix-ui/themes';
import { useAuth } from '@/hooks/useAuth';

export function AppMain({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  return (
    <ScrollArea
      id="corpo"
      type="hover"
      scrollbars="both"
      className={`max-h-[calc(100dvh-64px)] bg-[hsl(var(--color-bg-alt))] transition-all duration-200 ml-0 ${
        isAuthenticated && 'sm:ml-[40px] sm:max-w-[calc(100%-40px)]'
      }`}
    >
      <Box className="table table-fixed w-full max-w-full box-border px-[0.7rem] xs:px-[1rem] sm:px-[1.3rem] py-[1rem]">
        {children}
      </Box>
    </ScrollArea>
  );
}
