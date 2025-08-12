import { useState } from 'react';

export function usePagination(initialPage = 0, initialSize = 10) {
  const [page, setPage] = useState(initialPage);
  const [size, setSize] = useState(initialSize);

  function next(totalPages?: number) {
    setPage(p =>
      totalPages !== undefined ? Math.min(p + 1, totalPages - 1) : p + 1,
    );
  }

  function prev() {
    setPage(p => Math.max(p - 1, 0));
  }

  return { page, size, setPage, setSize, next, prev };
}
