'use client';

import { useQuery } from '@tanstack/react-query';
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
  const { data, isLoading } = useQuery({
    queryKey: ['remedios', pagination.page, pagination.pageSize],
    queryFn: () => listRemedios(pagination.page, pagination.pageSize),
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
                keyExtractor={r => r.id}
                columns={[
                  { header: 'ID', accessor: r => r.id },
                  { header: 'Nome', accessor: r => r.nome },
                  { header: 'Via', accessor: r => r.via },
                  { header: 'Lote', accessor: r => r.lote },
                  { header: 'Validade', accessor: r => formatDate(r.validade) },
                  { header: 'Laboratório', accessor: r => r.laboratorio.nome },
                  {
                    header: 'Criado em',
                    accessor: r => formatDateTime(r.createdAt),
                  },
                  {
                    header: 'Atualizado em',
                    accessor: r => formatDateTime(r.updatedAt),
                  },
                ]}
              />
            </div>
          )}
        </div>
        <Pagination
          totalItems={data?.totalElements ?? 0}
          onChange={setPagination}
          initialPageSize={pagination.pageSize}
        />
      </MainLayout>
    </ProtectedRoute>
  );
}
