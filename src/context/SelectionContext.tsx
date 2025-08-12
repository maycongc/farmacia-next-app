import React, { createContext, useContext, useState, useCallback } from 'react';

interface SelectionContextProps {
  selected: Set<string | number>;
  select: (id: string | number) => void;
  deselect: (id: string | number) => void;
  clear: () => void;
  isSelected: (id: string | number) => boolean;
  selectMany: (ids: Array<string | number>) => void;
  loadingExclusao: boolean;
  setLoadingExclusao: (loading: boolean) => void;
}

const SelectionContext = createContext<SelectionContextProps | undefined>(
  undefined,
);

export const SelectionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selected, setSelected] = useState<Set<string | number>>(new Set());
  const [loadingExclusao, setLoadingExclusao] = useState(false);

  const select = useCallback((id: string | number) => {
    setSelected(prev => new Set(prev).add(id));
  }, []);

  const deselect = useCallback((id: string | number) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setSelected(new Set());
  }, []);

  const isSelected = useCallback(
    (id: string | number) => {
      return selected.has(id);
    },
    [selected],
  );

  const selectMany = useCallback((ids: Array<string | number>) => {
    setSelected(prev => {
      const next = new Set(prev);
      ids.forEach(id => next.add(id));
      return next;
    });
  }, []);

  return (
    <SelectionContext.Provider
      value={{
        selected,
        select,
        deselect,
        clear,
        isSelected,
        selectMany,
        loadingExclusao,
        setLoadingExclusao,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
};

export function useSelection() {
  const ctx = useContext(SelectionContext);
  if (!ctx)
    throw new Error('useSelection deve ser usado dentro de SelectionProvider');
  return ctx;
}
