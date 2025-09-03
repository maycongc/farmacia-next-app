'use client';
interface PaginationProps {
  totalItems: number;
  onChange: (params: { page: number; pageSize: number }) => void;
  pagination?: { page: number; pageSize: number };
  pageSizeOptions?: number[];
  className?: string;
}

import { Button } from '@radix-ui/themes';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import CustomSelect from '@/design-system/components/CustomSelect';

export function Pagination({
  totalItems,
  onChange,
  pagination = { page: 0, pageSize: 10 },
  pageSizeOptions = [5, 10, 20, 50],
  className = '',
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pagination.pageSize));

  // Gera páginas com reticências, mostrando sempre as 2 primeiras, 2 últimas, página atual e vizinhas
  const getPages = (page: number, maxPages: number): (number | string)[] => {
    if (maxPages <= 1) return [0];
    if (maxPages <= 7) return Array.from({ length: maxPages }, (_, i) => i);
    const pages: (number | string)[] = [];
    // Sempre mostra as duas primeiras
    pages.push(0);
    if (maxPages > 1) pages.push(1);

    // Reticências antes do bloco central
    if (page > 3) pages.push('prev-ellipsis');

    // Bloco central: página atual -1, atual, atual +1
    for (
      let i = Math.max(2, page - 1);
      i <= Math.min(maxPages - 3, page + 1);
      i++
    ) {
      pages.push(i);
    }

    // Reticências depois do bloco central
    if (page < maxPages - 4) pages.push('next-ellipsis');

    // Sempre mostra as duas últimas
    if (maxPages > 4) pages.push(maxPages - 2);
    if (maxPages > 3) pages.push(maxPages - 1);

    // Remove duplicados e ordena
    return Array.from(new Set(pages)).sort((a, b) =>
      typeof a === 'number' && typeof b === 'number' ? a - b : 0,
    );
  };

  const pages = getPages(pagination.page, totalPages);

  function handleSetPage(p: number) {
    onChange({ page: p, pageSize: pagination.pageSize });
  }

  function handlePageSizeChange(size: number) {
    onChange({ page: 0, pageSize: size });
  }

  return (
    <div className={`w-full mt-4 ${className}`}>
      <div className="mb-4 ml-2 w-full text-left">
        <span className="text-xs text-gray-700 dark:text-gray-100 max-w-full font-medium truncate whitespace-nowrap block">
          <span className="font-bold text-blue-500">
            {Math.min(pagination.pageSize * pagination.page + 1, totalItems)}
          </span>
          {' ao '}
          <span className="font-bold text-blue-500">
            {Math.min(pagination.pageSize * (pagination.page + 1), totalItems)}
          </span>
          {` de ${totalItems} registros`}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap items-center gap-2 w-full">
        <div className="flex flex-row flex-wrap items-center gap-1 w-full sm:w-auto justify-center">
          <Button
            variant="ghost"
            size="2"
            onClick={() => handleSetPage(Math.max(pagination.page - 1, 0))}
            disabled={pagination.page === 0}
            className="m-0 rounded-full px-2 flex items-center justify-center"
            aria-label="Página anterior"
          >
            <ChevronLeftIcon size={18} className="inline-block align-middle" />
          </Button>
          <nav
            aria-label="Navegação de páginas"
            className="flex items-center gap-0.5"
          >
            {pages.map((p, idx) =>
              typeof p === 'number' ? (
                <Button
                  key={`page-${p}`}
                  variant={p === pagination.page ? 'surface' : 'ghost'}
                  size="2"
                  onClick={() => handleSetPage(p)}
                  disabled={p === pagination.page}
                  className={`m-0 rounded px-2 transition-all duration-150 ${
                    p === pagination.page
                      ? 'bg-blue-600 text-white shadow w-[32px]'
                      : 'hover:bg-blue-100 w-[12px]'
                  } ${p === pagination.page ? 'font-bold' : ''}`}
                  aria-current={p === pagination.page ? 'page' : undefined}
                  aria-label={`Ir para página ${p + 1}`}
                >
                  {p + 1}
                </Button>
              ) : (
                <span
                  key={p}
                  className="text-sm px-2 text-gray-400 select-none font-bold"
                  aria-hidden="true"
                >
                  ...
                </span>
              ),
            )}
          </nav>
          <Button
            variant="ghost"
            size="2"
            onClick={() =>
              handleSetPage(Math.min(pagination.page + 1, totalPages - 1))
            }
            disabled={pagination.page === totalPages - 1}
            className="m-0 rounded-full px-2 flex items-center justify-center"
            aria-label="Próxima página"
          >
            <ChevronRightIcon size={18} className="inline-block align-middle" />
          </Button>
        </div>
        <div className="flex flex-row flex-wrap gap-2 w-full sm:w-auto justify-center">
          <div className="flex-shrink-0 min-w-[120px] max-w-[220px] w-fit flex items-center">
            <CustomSelect
              label="Itens por página"
              labelPosition="side"
              options={pageSizeOptions.map(v => ({
                value: v,
                label: String(v),
              }))}
              value={pagination.pageSize}
              onChange={v => handlePageSizeChange(Number(v))}
            />
          </div>
          <div className="flex-shrink-0 min-w-[120px] max-w-[220px] w-fit flex items-center">
            <CustomSelect
              label="Ir para página"
              labelPosition="side"
              options={Array.from({ length: totalPages }, (_, i) => ({
                value: i,
                label: String(i + 1),
              }))}
              value={pagination.page}
              onChange={v => handleSetPage(Number(v))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
