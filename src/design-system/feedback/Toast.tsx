import { info } from 'console';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { X } from 'lucide-react';
import React from 'react';

export function ToastRoot({ children }: { children: React.ReactNode }) {
  return (
    <ToastPrimitive.Provider swipeDirection="right">
      {children}
      <ToastPrimitive.Viewport className="fixed bottom-4 right-4 z-[99999] flex flex-col gap-2 min-w-[340px] max-w-[45vw] outline-none items-end" />
    </ToastPrimitive.Provider>
  );
}

const colorMap = {
  success: 'bg-white dark:bg-zinc-900 text-green-700 dark:text-green-400',
  error:
    'bg-white dark:bg-zinc-900 text-red-900 dark:text-red-400 border border-red-900 dark:border-red-700',
  alert: 'bg-white dark:bg-zinc-900 text-yellow-700 dark:text-yellow-400',
  info: 'bg-white dark:bg-zinc-900 text-blue-700 dark:text-blue-400',
};

export function Toast({
  open,
  onOpenChange,
  title,
  description,
  list,
  type,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  type: keyof typeof colorMap;
  list?: React.ReactNode[];
}) {
  const isError = type === 'error';
  return (
    <ToastPrimitive.Root
      open={open}
      onOpenChange={isError ? undefined : onOpenChange}
      className={`relative rounded-xl px-5 py-3 shadow-sm min-w-[340px] max-w-[95vw] ${colorMap[type]} data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out`}
      duration={isError ? undefined : 30000}
    >
      <ToastPrimitive.Title className="font-medium text-base mb-2">
        {title}
      </ToastPrimitive.Title>
      {description && (
        <ToastPrimitive.Description className="text-sm opacity-80">
          {description}
        </ToastPrimitive.Description>
      )}
      {Array.isArray(list) && list.length > 0 && (
        <ul className="mt-2 text-sm opacity-80 list-disc list-outside space-y-2">
          {list.map((item, idx) =>
            React.isValidElement(item) ? item : <li key={idx}>{item}</li>,
          )}
        </ul>
      )}
      {isError && (
        <button
          type="button"
          className="absolute -top-2 -right-2 flex items-center justify-center size-7 bg-red-900/80 text-white hover:bg-red-800/90 dark:bg-red-900 dark:hover:bg-red-800 p-0.5 rounded-full border border-red-900 dark:border-red-700 shadow-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-red-900/40"
          style={{ position: 'absolute' }}
          onClick={() => onOpenChange(false)}
          aria-label="Fechar"
        >
          <X size={16} strokeWidth={2.2} />
        </button>
      )}
    </ToastPrimitive.Root>
  );
}
