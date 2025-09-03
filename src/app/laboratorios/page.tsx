import { Metadata } from 'next';
import LaboratorioTabela from './LaboratorioTabela';
import MainLayout from '@/components/layout/MainLayout';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { Button } from '@/design-system/components/Button';

export const metadata: Metadata = {
  title: 'Laboratórios | Farmacia App',
  description: 'Tela de laboratórios',
};

export default function LaboratoriosPage() {
  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="flex items-center mb-4 gap-4">
          <h2 className="text-xl font-semibold">Laboratórios</h2>
          <Button
            intent="outline"
            size="sm"
            className="ml-auto w-full sm:w-auto"
          >
            Novo
          </Button>
        </div>

        <LaboratorioTabela />
      </MainLayout>
    </ProtectedRoute>
  );
}
