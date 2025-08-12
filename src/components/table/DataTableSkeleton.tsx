import React from 'react';

interface DataTableSkeletonProps {
  columns: number;
  rows: number;
}

export function DataTableSkeleton({ columns, rows }: DataTableSkeletonProps) {
  return (
    <div className="overflow-x-auto overflow-y-auto border border-[hsl(var(--color-border))] rounded-lg max-h-[60vh] animate-pulse">
      <table className="min-w-full text-sm">
        <thead className="bg-[hsl(var(--color-bg-alt))]">
          <tr>
            {Array.from({ length: columns }).map((_, i) => (
              <th key={i} className="px-3 py-2">
                <div className="h-4 w-20 rounded bg-gray-400 dark:bg-gray-700" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, r) => (
            <tr key={r}>
              {Array.from({ length: columns }).map((_, c) => (
                <td key={c} className="px-3 py-2">
                  <div className="h-4 w-full rounded bg-gray-300 dark:bg-gray-800" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
