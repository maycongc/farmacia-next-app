'use client';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Protected } from '@/components/layout/Protected';
import { DataTable } from '@/components/table/DataTable';
import { DataTableSkeleton } from '@/components/table/DataTableSkeleton';
import { FloatingActionsMenu } from '@/components/table/FloatingActionsMenu';
import { Pagination } from '@/components/table/Pagination';
import { Badge } from '@/design-system/components/Badge';
import { Button } from '@/design-system/components/Button';
import { Dialog, DialogContent } from '@/design-system/components/Dialog';
import { Toast, ToastRoot } from '@/design-system/feedback/Toast';
import { queryClient } from '@/lib/react-query/queryClient';
import {
  deleteLaboratoriosEmLote,
  listLaboratorios,
} from '@/services/laboratorioService';
import { formatDateTime } from '@/utils/formatters';
import { PERMISSOES } from '@/utils/permissions';

export default function LaboratoriosPage() {
  const { selected, clear, loadingExclusao, setLoadingExclusao } =
    require('@/context/SelectionContext').useSelection();
  const selectedRows: Array<string | number> = Array.from(selected) as Array<
    string | number
  >;
  const [pagination, setPagination] = React.useState({ page: 0, pageSize: 10 });
  const [idsParaExcluir, setIdsParaExcluir] = React.useState<
    Array<string | number>
  >([]);

  const [modalAberto, setModalAberto] = React.useState(false);

  const [toast, setToast] = React.useState<{
    open: boolean;
    type: 'success' | 'error' | 'alert' | 'info';
    message: string;
    list?: React.ReactNode[];
  }>({ open: false, type: 'success', message: '', list: [] });

  const { data, isLoading } = useQuery({
    queryKey: ['laboratorios', pagination.page, pagination.pageSize],
    queryFn: () => listLaboratorios(pagination.page, pagination.pageSize),
  });

  const rows: any[] = data?.content || [];

  function handleEditar(ids: Array<string | number>) {
    // ...
  }

  function handleExcluir(ids: Array<string | number>) {
    setIdsParaExcluir(ids);
    setModalAberto(true);
  }

  function confirmarExclusao() {
    const numberIds = idsParaExcluir.map(id => Number(id));
    setLoadingExclusao(true);
    deleteLaboratoriosEmLote(numberIds)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ['laboratorios'] });
        setToast({
          open: true,
          type: 'success',
          message: 'Laboratório(s) excluído(s) com sucesso!',
        });
      })
      .catch(err => {
        const mainMsg =
          err?.response?.data?.message || 'Erro ao excluir laboratórios.';
        const fields = err?.response?.data?.fields;
        let list: React.ReactNode[] = [];
        if (fields && typeof fields === 'object') {
          list = Object.entries(fields).map(([lab, items]) =>
            Array.isArray(items) ? (
              <li key={lab} className="mb-2">
                <div className="flex flex-col">
                  <span className="font-semibold text-red-900 dark:text-red-400">
                    {lab}
                  </span>
                  <ul className="pl-6 border-l-2 border-red-200 dark:border-red-700 ml-2 mt-1">
                    {items.map(item => (
                      <li
                        key={lab + item}
                        className="text-sm ml-2 py-0.5 relative before:content-[''] before:absolute before:left-[-16px] before:top-2 before:w-2 before:h-2 before:bg-red-400 before:rounded-full"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ) : null,
          );
        }
        setToast({
          open: true,
          type: 'error',
          message: mainMsg,
          list,
        });
      })
      .finally(() => {
        setLoadingExclusao(false);
        setModalAberto(false);
        setIdsParaExcluir([]);
      });
  }

  return (
    <Protected>
      <ToastRoot>
        <Toast
          open={toast.open}
          onOpenChange={open => setToast(t => ({ ...t, open }))}
          title={toast.type}
          description={toast.message}
          type={toast.type}
          list={toast.list}
        />
      </ToastRoot>

      {selectedRows.length > 0 && (
        <FloatingActionsMenu
          selectedCount={selectedRows.length}
          actions={[
            {
              label: 'Editar',
              onClick: () => handleEditar(selectedRows),
              type: 'edit',
              permission: PERMISSOES.LABORATORIO_UPDATE,
            },
            {
              label: 'Excluir',
              onClick: () => handleExcluir(selectedRows),
              type: 'delete',
              permission: PERMISSOES.LABORATORIO_DELETE,
            },
          ]}
          onClear={clear}
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-2 sm:static sm:max-w-none sm:px-0"
        />
      )}

      <Dialog open={modalAberto} onOpenChange={setModalAberto}>
        <DialogContent>
          <DialogPrimitive.Title asChild>
            <h3 className="text-lg font-semibold mb-2">Confirmar exclusão</h3>
          </DialogPrimitive.Title>
          <p className="mb-4">
            Deseja realmente excluir {idsParaExcluir.length} laboratório(s)?
            Essa ação não pode ser desfeita.
          </p>
          <div className="flex gap-2 justify-end">
            <Button
              intent="ghost"
              onClick={() => setModalAberto(false)}
              disabled={loadingExclusao}
            >
              Cancelar
            </Button>
            <Button
              intent="danger"
              onClick={confirmarExclusao}
              disabled={loadingExclusao}
            >
              {loadingExclusao ? (
                <span className="flex items-center gap-2">
                  <span>Excluindo</span>
                  {/* @ts-ignore */}
                  {require('@/design-system/feedback/Loader').Loader()}
                </span>
              ) : (
                'Excluir'
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex items-center mb-4 gap-4">
        <h2 className="text-xl font-semibold">Laboratórios</h2>
        <Button intent="outline" size="sm" className="ml-auto w-full sm:w-auto">
          Novo
        </Button>
      </div>

      <div className="min-h-fit">
        {isLoading ? (
          <div className="transition-opacity duration-500 opacity-100">
            <DataTableSkeleton columns={7} rows={pagination.pageSize} />
          </div>
        ) : (
          <div className="transition-opacity duration-500 opacity-100 overflow-x-auto">
            <DataTable
              rows={rows}
              keyExtractor={r => r.id}
              columns={[
                { header: 'ID', accessor: r => r.id },
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
              selectable={true}
              className="min-w-[600px] sm:min-w-full"
            />
          </div>
        )}
      </div>

      <Pagination
        totalItems={data?.totalElements ?? 0}
        onChange={setPagination}
        initialPageSize={pagination.pageSize}
        className="w-full flex-1 justify-center mt-4"
      />
    </Protected>
  );
}
