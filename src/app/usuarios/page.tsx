'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { DataTable } from '@/components/table/DataTable';
import { DataTableSkeleton } from '@/components/table/DataTableSkeleton';
import { Pagination } from '@/components/table/Pagination';
import { listUsuarios } from '@/services/usuarioService';
import { UsuarioResponse } from '@/types/usuario';
import { formatDate } from '@/utils/formatters';

export default function UsuariosPage() {
  const [pagination, setPagination] = React.useState({ page: 0, pageSize: 10 });

  const router = useRouter();
  const searchParams = useSearchParams();

  const sortByParam = searchParams.get('sortBy');
  const orderParam = (searchParams.get('order') ?? 'asc') as 'asc' | 'desc';

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
                handleSortClick={handleSortClick}
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
