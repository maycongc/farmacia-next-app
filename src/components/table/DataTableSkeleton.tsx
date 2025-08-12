import React from 'react';

interface DataTableSkeletonProps {
  columns: number;
  rows: number;
}

export function DataTableSkeleton({ columns, rows }: DataTableSkeletonProps) {
  return (
    <div className="w-full max-w-full overflow-x-auto overflow-y-auto border border-[hsl(var(--color-border))] rounded-lg max-h-[60vh] relative animate-pulse">
      <table className="w-full min-w-max text-sm">
        <thead className="bg-[hsl(var(--color-bg-alt))] sticky top-0 z-10">
          <tr style={{ height: '42.5px', maxHeight: '42.5px' }}>
            {/* Coluna de seleção */}
            <th className="px-3 py-2 w-10 max-w-[64px]">
              <div className="flex items-center justify-center h-full min-h-[26px]">
                <div className="h-4 w-4 rounded bg-gray-400 dark:bg-gray-700" />
              </div>
            </th>
            {Array.from({ length: columns }).map((_, i) => (
              <th
                key={i}
                className={`${
                  i === 0 ? 'max-w-[64px] w-[64px]' : 'max-w-[180px] px-3'
                }`}
                style={
                  i === 0 ? { maxWidth: 64, width: 64 } : { maxWidth: 180 }
                }
              >
                <div className="h-4 w-full rounded bg-gray-400 dark:bg-gray-700" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, r) => (
            <tr key={r} style={{ height: '36.5px', maxHeight: '36.5px' }}>
              {/* Coluna de seleção */}
              <td className="w-10 max-w-[64px]">
                <div className="flex items-center justify-center h-full min-h-[26px]">
                  <div className="h-4 w-4 rounded bg-gray-300 dark:bg-gray-800" />
                </div>
              </td>
              {Array.from({ length: columns }).map((_, c) => (
                <td
                  key={c}
                  className={`${
                    c === 0 ? 'max-w-[64px] w-[64px]' : 'max-w-[180px] px-3'
                  }`}
                  style={
                    c === 0 ? { maxWidth: 64, width: 64 } : { maxWidth: 180 }
                  }
                >
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
