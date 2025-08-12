'use client';
import React, { useRef, useState } from 'react';

export interface CustomSelectProps {
  label?: string;
  labelPosition?: 'top' | 'side';
  options: { value: string | number; label: string }[];
  value: string | number;
  onChange: (value: string | number) => void;
  error?: string;
  disabled?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  labelPosition = 'top',
  options,
  value,
  onChange,
  error,
  disabled,
}) => {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Fecha o dropdown ao clicar fora
  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  // Controla fadeIn/fadeOut
  React.useEffect(() => {
    if (open) {
      setVisible(true);
    } else if (visible) {
      const timeout = setTimeout(() => setVisible(false), 180);
      return () => clearTimeout(timeout);
    }
  }, [open, visible]);

  const selected = options.find(opt => opt.value === value);

  return (
    <div
      className={`relative ${
        labelPosition === 'side'
          ? 'flex flex-row items-center gap-2'
          : 'flex flex-col gap-0.5'
      } min-w-[120px] max-w-[220px] w-full`}
      ref={ref}
    >
      {label && (
        <div
          className={labelPosition === 'side' ? 'flex items-center mr-2' : ''}
        >
          <label className="text-xs font-medium text-gray-600 dark:text-gray-300 max-w-[90px] line-clamp-2">
            {label}
          </label>
        </div>
      )}
      <div className="relative w-full">
        <button
          type="button"
          className={`flex items-center justify-between px-2 py-1 rounded bg-transparent border border-gray-200 dark:border-gray-700 text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors min-w-[40px] max-w-[64px] w-full ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={() => !disabled && setOpen(o => !o)}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <span>{selected ? selected.label : 'Selecione...'}</span>
          <svg
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
            className="ml-2 text-gray-400"
          >
            <path
              d="M7 10l5 5 5-5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {visible && (
          <ul
            className={`absolute inset-x-0 top-full z-20 min-w-[40px] max-w-[64px] w-full max-h-48 overflow-y-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded shadow-lg text-sm ${
              open ? 'animate-fade-in' : 'animate-fade-out'
            }`}
            style={{ transition: 'opacity 0.18s ease' }}
          >
            {options.map(opt => (
              <li
                key={opt.value}
                className={`px-2 py-1 cursor-pointer select-none truncate transition-colors duration-150 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary-700 dark:hover:text-primary-300 ${
                  opt.value === value
                    ? 'bg-primary-50 dark:bg-primary-800 font-semibold'
                    : ''
                }`}
                style={{ maxWidth: '110px' }}
                onClick={() => {
                  setOpen(false);
                  onChange(opt.value);
                }}
                role="option"
                aria-selected={opt.value === value}
                title={opt.label}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && <span className="text-xs text-red-500 mt-0.5">{error}</span>}
    </div>
  );
};

export default CustomSelect;
