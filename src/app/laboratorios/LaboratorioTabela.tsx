'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { DataTable } from '@/components/table/DataTable';
import { DataTableSkeleton } from '@/components/table/DataTableSkeleton';
import { Pagination } from '@/components/table/Pagination';
import { listLaboratorios } from '@/services/laboratorioService';
import { LaboratorioResponse } from '@/types/laboratorio';
import { formatDateTime } from '@/utils/formatters';

export default function LaboratorioTabela() {
  const [pagination, setPagination] = useState({ page: 0, pageSize: 10 });

  const { data, isLoading } = useQuery({
    queryKey: ['laboratorios', pagination.page, pagination.pageSize],
    queryFn: async () =>
      await listLaboratorios(pagination.page, pagination.pageSize),
  });

  const rows: any[] = data?.content || [];

  return (
    <>
      {isLoading ? (
        <div className="transition-opacity duration-500 opacity-100">
          <DataTableSkeleton columns={7} rows={10} />
        </div>
      ) : (
        <div className="min-h-fit">
          <div className="relative transition-opacity duration-500 opacity-100">
            <DataTable<LaboratorioResponse>
              rows={rows}
              keyExtractor={r => r.id}
              selectable
              className="min-w-[600px] sm:min-w-full"
              columns={[
                { header: 'ID', accessor: r => r.id, align: 'right' },
                { header: 'Nome', accessor: r => r.nome },
                { header: 'Endereço', accessor: r => r.endereco },
                { header: 'Telefone', accessor: r => r.telefone },
                { header: 'Email', accessor: r => r.email },
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
        </div>
      )}

      <Pagination
        totalItems={data?.totalElements ?? 0}
        onChange={setPagination}
        initialPageSize={pagination.pageSize}
        className="w-full flex-1 justify-center mt-4"
      />
    </>
  );
}
