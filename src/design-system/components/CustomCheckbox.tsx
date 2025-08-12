'use client';
import { Check } from 'lucide-react';
import React from 'react';

interface CustomCheckboxProps {
  checked: boolean;
  className?: string;
  indeterminate?: boolean;
  onChange?: () => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  className,
  indeterminate = false,
  onChange,
}) => (
  <label
    className={`inline-flex items-center justify-center w-5 h-5 rounded border
      ${
        checked
          ? 'border-blue-400 dark:border-primary-600'
          : 'border-gray-300 dark:border-gray-700'
      }
      bg-white dark:bg-gray-900
      ${checked ? 'bg-blue-400/90 dark:bg-blue-800' : ''}
      ${onChange ? 'cursor-pointer' : 'opacity-60 cursor-not-allowed'}
      ${className ?? ''}`}
  >
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="sr-only"
      aria-checked={checked}
      readOnly={!onChange}
      disabled={!onChange}
    />
    {indeterminate ? (
      <span className="block w-3 h-0.5 bg-primary-600 rounded" />
    ) : checked ? (
      <Check size={16} className="text-primary-600" />
    ) : null}
  </label>
);

export default CustomCheckbox;
