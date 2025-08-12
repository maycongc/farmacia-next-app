import { createContext, useContext, useState, ReactNode } from 'react';

interface SidebarContextProps {
  sidebarVisible: boolean;
  setSidebarVisible: (visible: boolean) => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined,
);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <SidebarContext.Provider value={{ sidebarVisible, setSidebarVisible }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar deve ser usado dentro de SidebarProvider');
  }
  return context;
};
