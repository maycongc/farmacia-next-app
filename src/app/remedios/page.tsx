'use client';

import { useQuery } from '@tanstack/react-query';
import MainLayout from '@/components/layout/MainLayout';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { DataTable } from '@/components/table/DataTable';
import { DataTableSkeleton } from '@/components/table/DataTableSkeleton';
import { Pagination } from '@/components/table/Pagination';
import { useTableSortAndPagination } from '@/hooks/useTableSortAndPagination';
import { listRemedios } from '@/services/remedioService';
import { formatDate, formatDateTime } from '@/utils/formatters';

export default function RemediosPage() {
  const { orderParam, sortByParam, pagination, setPagination } =
    useTableSortAndPagination();

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
