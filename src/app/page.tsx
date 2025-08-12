import { Protected } from '@/components/layout/Protected';

export default function HomePage() {
  return (
    <Protected>
      <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
      <p className="text-sm opacity-80">Bem-vindo ao painel da Farmácia.</p>
    </Protected>
  );
}
