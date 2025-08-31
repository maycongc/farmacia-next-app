'use client';

import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  IconButton,
  Link as LinkRadix,
  Text,
  TextField,
  Tooltip,
} from '@radix-ui/themes';
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  LogInIcon,
  UserIcon,
  UserRoundPlusIcon,
} from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import SignupModal from '../signup/SignupModal';
import { CalloutMessage } from '@/design-system/components/CalloutMessage';
import { useAuth } from '@/hooks/useAuth';

export default function LoginForm() {
  const [showPassword, setShowpassword] = useState(false);
  const [errorMsg, setError] = useState<React.ReactNode | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);

  const router = useRouter();
  const { login } = useAuth();

  const searchParams = useSearchParams();

  const unauthorized = searchParams.get('unauthorized');
  const registered = searchParams.get('registered');

  const isLogout = searchParams.get('logout');

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    const data = {
      username: formData.get('username') as string,
      senha: formData.get('password') as string,
      rememberMe: formData.get('rememberMe') !== null,
    };

    try {
      await login(data);

      const returnUrl = sessionStorage.getItem('returnUrl');

      if (returnUrl) {
        sessionStorage.removeItem('returnUrl');
        router.push(returnUrl);
      } else {
        router.push('/dashboard');
      }
    } catch (e: any) {
      setError(<>{e.message}</>);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleLogin}>
        {isLogout && (
          <CalloutMessage type="success">
            <Text>Logout realizado com sucesso.</Text>
          </CalloutMessage>
        )}

        {unauthorized && (
          <CalloutMessage type="alert">
            <Text>
              Você precisa estar autenticado para acessar esta página.
            </Text>
          </CalloutMessage>
        )}

        {registered && (
          <CalloutMessage type="success">
            <Text>
              Usuário registrado com sucesso! Você já pode acessar a sua conta.
            </Text>
          </CalloutMessage>
        )}

        {errorMsg && <CalloutMessage type="error">{errorMsg}</CalloutMessage>}

        <Heading>Acessar conta</Heading>

        <Box className="flex flex-col gap-1">
          <Text weight={'medium'}>Login</Text>
          <TextField.Root
            placeholder="Login"
            name="username"
            type="text"
            size={'3'}
            disabled={isLoading}
            required
          >
            <TextField.Slot>
              <UserIcon />
            </TextField.Slot>
          </TextField.Root>
        </Box>

        <Box className="flex flex-col gap-1">
          <Flex justify={'between'} align={'end'}>
            <Text weight={'medium'}>Senha</Text>
            <LinkRadix href="#" size={'2'}>
              Recuperar senha
            </LinkRadix>
          </Flex>

          <TextField.Root
            placeholder="Senha"
            name="password"
            type={showPassword ? 'text' : 'password'}
            size={'3'}
            disabled={isLoading}
            required
          >
            <TextField.Slot>
              <LockIcon />
            </TextField.Slot>

            <TextField.Slot className="">
              <Tooltip
                content={showPassword ? 'Esconder senha' : 'Mostrar senha'}
              >
                <IconButton
                  size={'1'}
                  variant="ghost"
                  type="button"
                  disabled={isLoading}
                  onClick={e => setShowpassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon size={'1.3rem'} />
                  ) : (
                    <EyeIcon size={'1.3rem'} />
                  )}
                </IconButton>
              </Tooltip>
            </TextField.Slot>
          </TextField.Root>
        </Box>

        <Flex justify={'center'}>
          <Text as="label" size="2" className="w-fit cursor-pointer">
            <Flex gap="2">
              <Checkbox
                defaultChecked={false}
                name="rememberMe"
                id="rememberMe"
                variant="soft"
                size="2"
                disabled={isLoading}
                highContrast
              />
              Manter conectado
            </Flex>
          </Text>
        </Flex>

        <Box className="flex flex-col gap-4" mt={'2'}>
          <Button
            className="grow"
            type="submit"
            variant="solid"
            disabled={isLoading}
            loading={isLoading}
          >
            <LogInIcon />
            <Text>Entrar</Text>
          </Button>

          <Button
            className="grow"
            color="gray"
            variant="soft"
            type="button"
            disabled={isLoading}
            onClick={e => setModalAberto(true)}
          >
            <UserRoundPlusIcon />
            <Text>Criar conta</Text>
          </Button>
        </Box>
      </form>

      <SignupModal open={modalAberto} setOpen={setModalAberto} />
    </>
  );
}
