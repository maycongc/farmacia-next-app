import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export function useTableSortAndPagination(defaultPageSize = 10) {
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: defaultPageSize,
  });
  const router = useRouter();
  const searchParams = useSearchParams();

  const sortByParam = searchParams.get('sortBy');
  const orderParam = (searchParams.get('order') ?? 'asc') as 'asc' | 'desc';

  function handleSortClick(column: string) {
    const isSame = sortByParam === column;
    const nextOrder: 'asc' | 'desc' | null = isSame
      ? orderParam === 'asc'
        ? 'desc'
        : orderParam === 'desc'
        ? null
        : 'asc'
      : 'asc';

    const params = new URLSearchParams(searchParams.toString());

    if (!nextOrder) {
      params.delete('sortBy');
      params.delete('order');
    } else {
      params.set('sortBy', column);
      params.set('order', nextOrder);
    }

    setPagination(prev => ({ ...prev, page: 0 }));

    const qs = '?' + params.toString();
    router.replace(qs);
  }

  return {
    pagination,
    setPagination,
    sortByParam,
    orderParam,
    handleSortClick,
  };
}
