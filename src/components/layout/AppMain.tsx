export function AppMain({ children }: { children: React.ReactNode }) {
  return (
    <main
      className="flex-1 h-[calc(100vh-65px)] overflow-auto px-2 sm:px-6 py-6 w-auto max-w-full"
      style={{ minHeight: 0 }}
    >
      {children}
    </main>
  );
}
