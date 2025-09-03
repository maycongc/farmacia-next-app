'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { DataTable } from '@/components/table/DataTable';
import { DataTableSkeleton } from '@/components/table/DataTableSkeleton';
import { Pagination } from '@/components/table/Pagination';
import { listRemedios } from '@/services/remedioService';
import { formatDate, formatDateTime } from '@/utils/formatters';

export default function RemediosPage() {
  const [pagination, setPagination] = React.useState({ page: 0, pageSize: 10 });

  const router = useRouter();
  const searchParams = useSearchParams();

  const sortByParam = searchParams.get('sortBy');
  const orderParam = (searchParams.get('order') ?? 'asc') as 'asc' | 'desc';

  const { data, isLoading } = useQuery({
    queryKey: [
      'remedios',
      pagination.page,
      pagination.pageSize,
      sortByParam,
      orderParam,
    ],
    queryFn: () =>
      listRemedios(
        pagination.page,
        pagination.pageSize,
        sortByParam,
        orderParam,
      ),
  });

  const rows: any[] = data?.content || [];

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

  return (
    <ProtectedRoute>
      <MainLayout>
        <h2 className="text-xl font-semibold mb-4">Remédios</h2>
        <div className="min-h-fit">
          {isLoading ? (
            <div className="transition-opacity duration-500 opacity-100">
              <DataTableSkeleton columns={9} rows={pagination.pageSize} />
            </div>
          ) : (
            <div className="transition-opacity duration-500 opacity-100">
              <DataTable
                rows={rows}
                handleSortClick={handleSortClick}
                columns={[
                  {
                    header: 'ID',
                    accessor: r => r.id,
                    sortBy: 'id',
                    align: 'right',
                  },
                  { header: 'Nome', accessor: r => r.nome, sortBy: 'nome' },
                  { header: 'Via', accessor: r => r.via, sortBy: 'via' },
                  { header: 'Lote', accessor: r => r.lote, sortBy: 'lote' },
                  {
                    header: 'Validade',
                    accessor: r => formatDate(r.validade),
                    sortBy: 'validade',
                  },
                  {
                    header: 'Laboratório',
                    accessor: r => r.laboratorio.nome,
                    sortBy: 'laboratorio.nome',
                  },
                  {
                    header: 'Criado em',
                    accessor: r => formatDateTime(r.createdAt),
                    sortBy: 'createdAt',
                  },
                  {
                    header: 'Atualizado em',
                    accessor: r => formatDateTime(r.updatedAt),
                    sortBy: 'updatedAt',
                  },
                ]}
              />
            </div>
          )}
        </div>
        <Pagination
          totalItems={data?.totalElements ?? 0}
          onChange={setPagination}
          pagination={pagination}
        />
      </MainLayout>
    </ProtectedRoute>
  );
}
