import { createContext, useContext } from 'react';

export type TableAction<T = any> = {
  label: string;
  icon?: React.ReactNode;
  onClick: (row: T) => void | Promise<void>;
  color?:
    | 'ruby'
    | 'gray'
    | 'gold'
    | 'bronze'
    | 'brown'
    | 'yellow'
    | 'amber'
    | 'orange'
    | 'tomato'
    | 'red'
    | 'crimson'
    | 'pink'
    | 'plum'
    | 'purple'
    | 'violet'
    | 'iris'
    | 'indigo'
    | 'blue'
    | 'cyan'
    | 'teal'
    | 'jade'
    | 'green'
    | 'grass'
    | 'lime'
    | 'mint'
    | 'sky'
    | undefined;
};

type TableActionsContextType<T = any> = {
  actions: TableAction<T>[];
};

const TableActionsContext = createContext<TableActionsContextType<any>>({
  actions: [],
});

export function useTableActions<T = any>() {
  return useContext(TableActionsContext) as TableActionsContextType<T>;
}

export function TableActionsProvider({
  actions,
  children,
}: {
  actions: TableAction[];
  children: React.ReactNode;
}) {
  return (
    <TableActionsContext.Provider value={{ actions }}>
      {children}
    </TableActionsContext.Provider>
  );
}
