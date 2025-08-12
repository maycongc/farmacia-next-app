'use client';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import { Button } from '@/design-system/components/Button';
import { Card } from '@/design-system/components/Card';
import { Input } from '@/design-system/components/Input';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}

function LoginContent() {
  const searchParams = useSearchParams();
  const unauthorized = searchParams.get('unauthorized');
  const { login } = useAuth();
  const router = useRouter();
  const [username, setU] = useState('');
  const [senha, setS] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      await login(username, senha);
      router.push('/');
    } catch {
      setError('Credenciais inválidas');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex w-full justify-center pt-16">
      <Card className="w-full max-w-sm">
        {unauthorized && (
          <div className="mb-4 text-sm text-red-600">
            Você precisa estar autenticado para acessar esta página.
          </div>
        )}
        <h1 className="text-lg font-semibold mb-4">Login</h1>
        <form className="flex flex-col gap-4" onSubmit={submit}>
          <Input
            label="Usuário"
            value={username}
            onChange={e => setU(e.target.value)}
            required
          />
          <Input
            label="Senha"
            type="password"
            value={senha}
            onChange={e => setS(e.target.value)}
            required
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
