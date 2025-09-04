'use client';

import { useQuery } from '@tanstack/react-query';
import MainLayout from '@/components/layout/MainLayout';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { DataTable } from '@/components/table/DataTable';
import { DataTableSkeleton } from '@/components/table/DataTableSkeleton';
import { Pagination } from '@/components/table/Pagination';
import { useTableSortAndPagination } from '@/hooks/useTableSortAndPagination';
import { listUsuarios } from '@/services/usuarioService';
import { UsuarioResponse } from '@/types/usuario';
import { formatDate } from '@/utils/formatters';

export default function UsuariosPage() {
  const { orderParam, sortByParam, pagination, setPagination } =
    useTableSortAndPagination();

  const { data, isLoading } = useQuery({
    queryKey: [
      'usuarios',
      pagination.page,
      pagination.pageSize,
      sortByParam,
      orderParam,
    ],
    queryFn: () =>
      listUsuarios(
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
        <h2 className="text-xl font-semibold mb-4">Usuários</h2>
        <div className="min-h-fit">
          {isLoading ? (
            <div className="transition-opacity duration-500 opacity-100">
              <DataTableSkeleton columns={16} rows={pagination.pageSize} />
            </div>
          ) : (
            <div className="transition-opacity duration-500 opacity-100">
              <DataTable<UsuarioResponse>
                rows={rows}
                columns={[
                  {
                    header: 'ID',
                    accessor: r => r.id,
                    sortBy: 'id',
                    align: 'right',
                  },
                  {
                    header: 'Usuario',
                    accessor: r => r.username,
                    sortBy: 'username',
                  },
                  { header: 'Nome', accessor: r => r.nome, sortBy: 'nome' },
                  { header: 'Email', accessor: r => r.email, sortBy: 'email' },
                  { header: 'CPF', accessor: r => r.cpf, sortBy: 'cpf' },
                  {
                    header: 'Data de nascimento',
                    accessor: r => formatDate(r.dataNascimento),
                    sortBy: 'dataNascimento',
                  },
                  {
                    header: 'Telefone',
                    accessor: r => r.telefone,
                    sortBy: 'telefone',
                  },
                  { header: 'CEP', accessor: r => r.cep, sortBy: 'cep' },
                  {
                    header: 'Endereço',
                    accessor: r => r.endereco,
                    sortBy: 'endereco',
                  },
                  {
                    header: 'Complemento',
                    accessor: r => r.complemento,
                    sortBy: 'complemento',
                  },
                  {
                    header: 'Cidade',
                    accessor: r => r.cidade,
                    sortBy: 'cidade',
                  },
                  {
                    header: 'UF',
                    accessor: r => r.uf,
                    sortBy: 'uf',
                  },
                  {
                    header: 'Admin',
                    accessor: r => !!r.isAdmin,
                    sortBy: 'isAdmin',
                    align: 'center',
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
