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
import { useEffect, useState } from 'react';
import { z } from 'zod';
import SignupModal from '../signup/SignupModal';
import {
  CalloutMessage,
  CalloutTypes,
} from '@/design-system/components/CalloutMessage';
import { useAuth } from '@/hooks/useAuth';

type MsgProps = {
  message: string;
  type: CalloutTypes;
};

type ErroProps = {
  username?: string[] | undefined;
  senha?: string[] | undefined;
  rememberMe?: string[] | undefined;
};

const loginSchema = z.object({
  username: z
    .string()
    .min(3, 'Login deve ter no mínimo 3 caracteres.')
    .transform(v => v.trim()),

  senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres.'),
  rememberMe: z.boolean().optional(),
});

export default function LoginForm() {
  const [showPassword, setShowpassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [msg, setMsg] = useState<MsgProps | null>();
  const [erros, setErros] = useState<ErroProps | null>();

  const router = useRouter();
  const { login } = useAuth();

  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.has('unauthorized', '1')) {
      setMsg(() => ({
        type: 'alert',
        message: 'Você precisa estar autenticado para acessar esta página.',
      }));
    }

    if (searchParams.has('unauthorized', '2')) {
      setMsg(() => ({
        type: 'alert',
        message:
          'Sua sessão expirou, realize login novamente para retomar de onde parou!',
      }));
    }

    if (searchParams.has('registered')) {
      setMsg(() => ({
        type: 'success',
        message:
          'Usuário registrado com sucesso! Você já pode acessar a sua conta.',
      }));
    }

    if (searchParams.has('logout')) {
      setMsg(() => ({
        type: 'success',
        message: 'Logout realizado com sucesso!',
      }));
    }
  }, [searchParams]);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    msg && setMsg(null);
    erros && setErros(null);

    const formData = new FormData(e.currentTarget);

    const data = {
      username: formData.get('username') as string,
      senha: formData.get('password') as string,
      rememberMe: formData.get('rememberMe') !== null,
    };

    const parsed = loginSchema.safeParse(data);

    if (!parsed.success) {
      setErros(() => parsed.error.flatten().fieldErrors);
      setIsLoading(false);
      return;
    }

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
      setMsg(() => ({
        message:
          (e?.response?.data?.message as string) || (e?.message as string),

        type: 'error',
      }));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleLogin}>
        {msg && (
          <CalloutMessage type={msg.type}>
            <Text>{msg.message}</Text>
          </CalloutMessage>
        )}

        <Heading>Acessar conta</Heading>

        <Box className="flex flex-col gap-1">
          <Text weight={'medium'}>Login</Text>
          <TextField.Root
            placeholder="Login"
            name="username"
            type="text"
            size={'3'}
            disabled={isLoading}
          >
            <TextField.Slot>
              <UserIcon />
            </TextField.Slot>
          </TextField.Root>
          <Text hidden={!erros?.username} color="red">
            {erros?.username}
          </Text>
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
          <Text hidden={!erros?.senha} color="red">
            {erros?.senha}
          </Text>
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
