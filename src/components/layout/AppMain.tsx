'use client';
import { Box, ScrollArea } from '@radix-ui/themes';

export function AppMain({
  children,
  isPublicRoute,
}: {
  children: React.ReactNode;
  isPublicRoute: () => boolean;
}) {
  return (
    <ScrollArea
      id="corpo"
      type="hover"
      scrollbars="both"
      className={`max-h-[calc(100dvh-64px)] bg-[hsl(var(--color-bg-alt))] transition-all duration-200 ml-0 ${
        !isPublicRoute() && 'ml-0 sm:ml-[40px] sm:max-w-[calc(100%-40px)]'
      }`}
    >
      <Box className="table table-fixed w-full max-w-full box-border px-[0.7rem] xs:px-[1rem] sm:px-[1.3rem] py-[1rem]">
        {children}
      </Box>
    </ScrollArea>
  );
}
