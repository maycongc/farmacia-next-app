'use client';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { DataTable } from '@/components/table/DataTable';
import { DataTableSkeleton } from '@/components/table/DataTableSkeleton';
import { Pagination } from '@/components/table/Pagination';
import { listUsuarios } from '@/services/usuarioService';
import { formatDate, formatDateTime } from '@/utils/formatters';

export default function UsuariosPage() {
  const [pagination, setPagination] = React.useState({ page: 0, pageSize: 10 });
  const { data, isLoading } = useQuery({
    queryKey: ['usuarios', pagination.page, pagination.pageSize],
    queryFn: () => listUsuarios(pagination.page, pagination.pageSize),
  });

  const rows: any[] = data?.content || [];
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Usuários</h2>
      <div className="min-h-fit">
        {isLoading ? (
          <div className="transition-opacity duration-500 opacity-100">
            <DataTableSkeleton columns={16} rows={pagination.pageSize} />
          </div>
        ) : (
          <div className="transition-opacity duration-500 opacity-100">
            <DataTable
              rows={rows}
              keyExtractor={r => r.id}
              columns={[
                { header: 'ID', accessor: r => r.id },
                { header: 'Usuario', accessor: r => r.username },
                { header: 'Nome', accessor: r => r.nome },
                { header: 'Email', accessor: r => r.email },
                { header: 'CPF', accessor: r => r.cpf },
                {
                  header: 'Data de nascimento',
                  accessor: r => formatDate(r.dataNascimento),
                },
                { header: 'Telefone', accessor: r => r.telefone },
                { header: 'CEP', accessor: r => r.cep },
                { header: 'Endereço', accessor: r => r.email },
                { header: 'Complemento', accessor: r => r.email },
                { header: 'Cidade', accessor: r => r.email },
                { header: 'UF', accessor: r => r.email },
                {
                  header: 'Admin',
                  accessor: r => !!r.isAdmin,
                },
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
    </>
  );
}
