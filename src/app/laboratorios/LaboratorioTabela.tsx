'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { DataTable } from '@/components/table/DataTable';
import { DataTableSkeleton } from '@/components/table/DataTableSkeleton';
import { Pagination } from '@/components/table/Pagination';
import { listLaboratorios } from '@/services/laboratorioService';
import { LaboratorioResponse } from '@/types/laboratorio';
import { formatDateTime } from '@/utils/formatters';

export default function LaboratorioTabela() {
  const [pagination, setPagination] = useState({ page: 0, pageSize: 10 });

  const router = useRouter();
  const searchParams = useSearchParams();

  const sortByParam = searchParams.get('sortBy');
  const orderParam = (searchParams.get('order') ?? 'asc') as 'asc' | 'desc';

  const { data, isLoading } = useQuery({
    queryKey: [
      'laboratorios',
      pagination.page,
      pagination.pageSize,
      sortByParam,
      orderParam,
    ],
    queryFn: async () =>
      await listLaboratorios(
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
    <>
      {isLoading ? (
        <div className="transition-opacity duration-500 opacity-100">
          <DataTableSkeleton columns={7} rows={pagination.pageSize} />
        </div>
      ) : (
        <div className="min-h-fit">
          <div className="relative transition-opacity duration-500 opacity-100">
            <DataTable<LaboratorioResponse>
              rows={rows}
              selectable
              handleSortClick={handleSortClick}
              className="min-w-[600px] sm:min-w-full"
              columns={[
                {
                  header: 'ID',
                  accessor: r => r.id,
                  sortBy: 'id',
                  align: 'right',
                },
                { header: 'Nome', accessor: r => r.nome, sortBy: 'nome' },
                {
                  header: 'Endereço',
                  accessor: r => r.endereco,
                  sortBy: 'endereco',
                },
                {
                  header: 'Telefone',
                  accessor: r => r.telefone,
                  sortBy: 'telefone',
                },
                { header: 'Email', accessor: r => r.email, sortBy: 'email' },
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
        </div>
      )}

      <Pagination
        totalItems={data?.totalElements ?? 0}
        onChange={setPagination}
        pagination={pagination}
        className="w-full flex-1 justify-center mt-4"
      />
    </>
  );
}
