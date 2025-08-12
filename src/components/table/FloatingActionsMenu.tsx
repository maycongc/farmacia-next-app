import { X } from 'lucide-react';
import React from 'react';
import { createPortal } from 'react-dom';
import { EllipsisTooltip } from '@/design-system/components/EllipsisTooltip';

export interface ActionButton {
  label: string;
  onClick: () => void;
  color?: string;
  icon?: React.ReactNode;
}

interface FloatingActionsMenuProps {
  selectedCount: number;
  actions: ActionButton[];
  onClear: () => void;
  top?: number;
}

export function FloatingActionsMenu({
  selectedCount,
  actions,
  onClear,
  top = 90,
}: FloatingActionsMenuProps) {
  return createPortal(
    <div
      style={{
        position: 'fixed',
        left: '50%',
        top,
        transform: 'translateX(-50%)',
        zIndex: 99,
        minWidth: 320,
      }}
      className="relative flex gap-2 items-center px-4 py-2 rounded-lg bg-white dark:bg-gray-900 shadow-lg border border-[hsl(var(--color-border))]"
    >
      <span className="text-sm">{selectedCount} selecionado(s)</span>
      {actions.map(action => (
        <button
          key={action.label}
          className={`text-xs px-2 py-1 rounded ${
            action.color ?? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
          }`}
          onClick={action.onClick}
        >
          {action.icon}
          {action.label}
        </button>
      ))}
      <EllipsisTooltip
        tooltip="Desselecionar todos"
        className="absolute -top-2 -right-2 flex items-center justify-center size-7"
      >
        <button
          className="bg-blue-800 text-white hover:bg-blue-700 dark:bg-gray-800 dark:hover:bg-gray-700 p-0.5 rounded-full border border-blue-900 dark:border-gray-700 shadow-lg transition-all duration-200"
          onClick={onClear}
          aria-label="Desselecionar todos"
        >
          <X size={16} />
        </button>
      </EllipsisTooltip>
    </div>,
    document.body,
  );
}
