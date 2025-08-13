import { clsx } from 'clsx';
import { X } from 'lucide-react';
import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { EllipsisTooltip } from '@/design-system/components/EllipsisTooltip';
import { useAuth } from '@/hooks/useAuth';
import { hasPermission } from '@/utils/permissions';

export type FloatingActionType = 'edit' | 'delete';
export interface ActionButton {
  label: string;
  onClick: () => void;
  color?: string;
  type?: FloatingActionType;
  icon?: ReactNode;
  permission?: string; // Permissão necessária para exibir o botão
}

interface FloatingActionsMenuProps {
  selectedCount: number;
  actions: ActionButton[];
  onClear: () => void;
  top?: number;
  className?: string; // Allow custom class names for styling
}

export function FloatingActionsMenu({
  selectedCount,
  actions,
  onClear,
  top = 85,
  className = '', // Default class name
}: FloatingActionsMenuProps) {
  const radixThemesDiv = document.querySelector('.radix-themes');
  const { user } = useAuth();

  return createPortal(
    <div
      style={{
        position: 'fixed',
        left: '50%',
        top,
        transform: 'translateX(-50%)',
        zIndex: 99,
        width: 'auto',
        maxWidth: '95vw',
        minWidth: 'min(220px, 95vw)',
      }}
      className={`relative flex items-center pl-4 pr-6 sm:pr-7 sm:pl-5 py-1.5 sm:py-2 rounded-lg bg-white dark:bg-gray-900 shadow-lg border h-fit border-[hsl(var(--color-border))] ${className}`}
    >
      <span className="text-[15px] sm:text-sm mr-3 sm:mr-6 whitespace-nowrap">
        {selectedCount} selecionado(s)
      </span>
      <div className="flex gap-3 sm:gap-5">
        {actions
          .filter(
            action =>
              !action.permission ||
              hasPermission(user ?? {}, action.permission),
          )
          .map((action, idx) => {
            let colorClass = action.color;
            if (!colorClass && action.type === 'edit') {
              colorClass = [
                'bg-blue-50 text-blue-700 border border-blue-200',
                'hover:bg-blue-100',
                'active:bg-blue-200',
                'dark:bg-blue-950 dark:text-blue-200 dark:border-blue-900',
                'dark:hover:bg-blue-900',
                'dark:active:bg-blue-800',
              ].join(' ');
            } else if (!colorClass && action.type === 'delete') {
              colorClass = [
                'bg-red-50 text-red-700 border border-red-200',
                'hover:bg-red-100',
                'active:bg-red-200',
                'dark:bg-red-950 dark:text-red-200 dark:border-red-900',
                'dark:hover:bg-red-900',
                'dark:active:bg-red-800',
              ].join(' ');
            }
            return (
              <button
                key={action.label}
                className={clsx(
                  'px-1.5 sm:px-2 py-1 sm:py-1 rounded-md transition-colors font-normal text-[15px] sm:text-sm shadow-sm border',
                  colorClass,
                )}
                style={{ minHeight: 28, minWidth: 0, lineHeight: 1.2 }}
                onClick={action.onClick}
              >
                {action.icon && (
                  <span className="mr-1 align-middle text-[16px] sm:text-[18px]">
                    {action.icon}
                  </span>
                )}
                <span className="align-middle">{action.label}</span>
              </button>
            );
          })}
      </div>
      <EllipsisTooltip
        tooltip="Desselecionar todos"
        className="absolute -top-2 -right-2 flex items-center justify-center size-6 sm:size-7"
      >
        <button
          className="bg-blue-800 text-white hover:bg-blue-700 dark:bg-gray-800 dark:hover:bg-gray-700 p-0.5 rounded-full border border-blue-900 dark:border-gray-700 shadow-lg transition-all duration-200"
          onClick={onClear}
          aria-label="Desselecionar todos"
        >
          <X size={14} className="sm:size-4" />
        </button>
      </EllipsisTooltip>
    </div>,
    radixThemesDiv ?? document.body,
  );
}
