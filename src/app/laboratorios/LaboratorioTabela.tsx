'use client';

import { useQuery } from '@tanstack/react-query';
import { EditIcon, Trash2Icon } from 'lucide-react';
import { DataTable } from '@/components/table/DataTable';
import { DataTableSkeleton } from '@/components/table/DataTableSkeleton';
import { Pagination } from '@/components/table/Pagination';
import {
  TableAction,
  TableActionsProvider,
} from '@/context/TableActionsContext';
import { useTableSortAndPagination } from '@/hooks/useTableSortAndPagination';
import {
  deleteLaboratorio,
  listLaboratorios,
} from '@/services/laboratorioService';
import { LaboratorioResponse } from '@/types/laboratorio';
import { formatDateTime } from '@/utils/formatters';

export default function LaboratorioTabela() {
  const { sortByParam, orderParam, pagination, setPagination } =
    useTableSortAndPagination();

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

  const actions: TableAction<LaboratorioResponse>[] = [
    {
      label: 'Editar',
      icon: <EditIcon size={16} />,
      onClick: (row: LaboratorioResponse) => {
        console.log('Editar', row.id);
      },
    },
    {
      label: 'Deletar',
      icon: <Trash2Icon size={16} />,
      color: 'red',
      onClick: async (row: LaboratorioResponse) => {
        try {
          await deleteLaboratorio(row.id);
        } catch (error: any) {
          console.log(error.response.data.message);
        }
      },
    },
  ];

  return (
    <>
      {isLoading ? (
        <div className="transition-opacity duration-500 opacity-100">
          <DataTableSkeleton columns={7} rows={pagination.pageSize} />
        </div>
      ) : (
        <div className="min-h-fit">
          <div className="relative transition-opacity duration-500 opacity-100">
            <TableActionsProvider actions={actions}>
              <DataTable<LaboratorioResponse>
                rows={rows}
                selectable
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
            </TableActionsProvider>
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
