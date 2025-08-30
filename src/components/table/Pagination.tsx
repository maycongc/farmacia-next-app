'use client';
interface PaginationProps {
  totalItems: number;
  onChange: (params: { page: number; pageSize: number }) => void;
  initialPageSize?: number;
  pageSizeOptions?: number[];
  className?: string;
}

import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '@/design-system/components/Button';
import CustomSelect from '@/design-system/components/CustomSelect';

export function Pagination({
  totalItems,
  onChange,
  initialPageSize = 10,
  pageSizeOptions = [5, 10, 20, 50],
  className = '',
}: PaginationProps) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

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

  const pages = getPages(page, totalPages);

  function handleSetPage(p: number) {
    setPage(p);
    onChange({ page: p, pageSize });
  }

  function handlePageSizeChange(size: number) {
    setPageSize(size);
    setPage(0);
    onChange({ page: 0, pageSize: size });
  }

  return (
    <div className={`w-full mt-4 ${className}`}>
      <div className="mb-4 ml-2 w-full text-left">
        <span className="text-xs text-gray-700 dark:text-gray-100 max-w-full font-medium truncate whitespace-nowrap block">
          <span className="font-bold text-blue-500">
            {Math.min(pageSize * page + 1, totalItems)}
          </span>
          {' ao '}
          <span className="font-bold text-blue-500">
            {Math.min(pageSize * (page + 1), totalItems)}
          </span>
          {` de ${totalItems} registros`}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap items-center gap-2 w-full">
        <div className="flex flex-row flex-wrap items-center gap-1 w-full sm:w-auto justify-center">
          <Button
            intent="ghost"
            size="sm"
            onClick={() => handleSetPage(Math.max(page - 1, 0))}
            disabled={page === 0}
            className="rounded-full px-2 flex items-center justify-center"
            aria-label="Página anterior"
          >
            <ChevronLeft size={18} className="inline-block align-middle" />
          </Button>
          <nav
            aria-label="Navegação de páginas"
            className="flex items-center gap-0.5"
          >
            {pages.map((p, idx) =>
              typeof p === 'number' ? (
                <Button
                  key={`page-${p}`}
                  intent={p === page ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => handleSetPage(p)}
                  disabled={p === page}
                  className={`rounded px-2 transition-all duration-150 ${
                    p === page
                      ? 'bg-blue-600 text-white shadow'
                      : 'hover:bg-blue-100'
                  } ${p === page ? 'font-bold' : ''}`}
                  aria-current={p === page ? 'page' : undefined}
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
            intent="ghost"
            size="sm"
            onClick={() => handleSetPage(Math.min(page + 1, totalPages - 1))}
            disabled={page === totalPages - 1}
            className="rounded-full px-2 flex items-center justify-center"
            aria-label="Próxima página"
          >
            <ChevronRight size={18} className="inline-block align-middle" />
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
              value={pageSize}
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
              value={page}
              onChange={v => handleSetPage(Number(v))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
