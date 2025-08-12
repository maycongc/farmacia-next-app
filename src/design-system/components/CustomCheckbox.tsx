'use client';
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
    className={`inline-flex items-center justify-center w-5 h-5 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 cursor-pointer ${
      checked ? 'bg-primary-100 dark:bg-primary-900' : ''
    } ${className ?? ''}`}
  >
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="sr-only"
      aria-checked={checked}
      readOnly={!onChange}
    />
    {indeterminate ? (
      <span className="block w-3 h-0.5 bg-primary-600 rounded" />
    ) : checked ? (
      <svg
        width="16"
        height="16"
        viewBox="0 0 20 20"
        fill="none"
        className="text-primary-600"
      >
        <path
          d="M5 10l3 3 7-7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ) : null}
  </label>
);

export default CustomCheckbox;
