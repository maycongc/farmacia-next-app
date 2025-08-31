'use client';

import {
  Box,
  Button,
  Flex,
  Inset,
  ScrollArea,
  Separator,
  Strong,
  Text,
  TextField,
} from '@radix-ui/themes';
import {
  ALargeSmallIcon,
  Calendar1Icon,
  IdCardIcon,
  LockIcon,
  MailIcon,
  UserIcon,
  UserRoundPlusIcon,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CalloutMessage } from '@/design-system/components/CalloutMessage';
import { DialogTextFieldRoot } from '@/design-system/components/dialog/DialogTextFieldRoot';
import { useAuth } from '@/hooks/useAuth';

type ValidationErroProps = {
  message: string;
  fields: Record<string, string>;
};

export default function SignupForm({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [alertas, setAlertas] = useState<Array<React.ReactNode>>([]);
  const [erro, setErro] = useState<ValidationErroProps | null>(null);

  const { register } = useAuth();
  const router = useRouter();

  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAlertas([]);
    setErro(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const data = {
      nome: formData.get('nome') as string,
      username: formData.get('username') as string,
      email: formData.get('email') as string,
      cpf: formData.get('cpf') as string,
      dataNascimento: formData.get('dataNascimento') as string,
      senha: formData.get('password') as string,
      confirmarSenha: formData.get('confirmPassword') as string,
    };

    if (data.senha !== data.confirmarSenha) {
      const msgAlerta = (
        <>
          Os campos de <Strong>senha</Strong> não correspondem.
        </>
      );
      setAlertas(prev => [...prev, msgAlerta]);
      return setLoading(false);
    }

    try {
      const success = await register(data);

      if (success) {
        router.replace('/login?registered=1');
        setOpen(false);
      }
    } catch (error: any) {
      const data: ValidationErroProps = error.response.data;
      setErro(() => data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Flex direction={'column'} gap={'4'}>
      {alertas.map((alerta, index) => (
        <CalloutMessage
          type="alert"
          mt={'1'}
          size={{ initial: '1', sm: '2' }}
          key={index}
        >
          <Text key={index}>{alerta}</Text>
        </CalloutMessage>
      ))}

      {erro && (
        <CalloutMessage type="error" mt={'1'} size={{ initial: '1', sm: '2' }}>
          <Text weight={'bold'}>{erro.message}</Text>
          {Object.entries(erro.fields).map(([key, value]) => (
            <li key={key}>
              <Strong>{`${key}`}</Strong>
              {`: ${value}`}
            </li>
          ))}
        </CalloutMessage>
      )}

      <form
        onSubmit={handleSignUp}
        method="POST"
        className="flex flex-col gap-4"
      >
        <ScrollArea className="max-h-40dvh">
          <Box className="table table-fixed w-full h-full max-h-[20dvh] box-border">
            <Flex direction={'column'} gap={'4'}>
              <Box>
                <Text as="label" weight={{ sm: 'medium' }}>
                  Nome
                </Text>
                <DialogTextFieldRoot
                  placeholder="Nome"
                  autoFocus
                  required
                  disabled={loading}
                  mt={'1'}
                  name="nome"
                >
                  <TextField.Slot>
                    <ALargeSmallIcon size={20} />
                  </TextField.Slot>
                </DialogTextFieldRoot>
              </Box>

              <Box>
                <Text as="label" weight={{ sm: 'medium' }}>
                  Login
                </Text>
                <DialogTextFieldRoot
                  placeholder="Login"
                  autoFocus
                  required
                  disabled={loading}
                  mt={'1'}
                  name="username"
                >
                  <TextField.Slot>
                    <UserIcon size={20} />
                  </TextField.Slot>
                </DialogTextFieldRoot>
              </Box>

              <Box>
                <Text as="label" weight={{ sm: 'medium' }}>
                  Email
                </Text>
                <DialogTextFieldRoot
                  placeholder="Email"
                  type="email"
                  required
                  disabled={loading}
                  mt={'1'}
                  name="email"
                >
                  <TextField.Slot>
                    <MailIcon size={20} />
                  </TextField.Slot>
                </DialogTextFieldRoot>
              </Box>

              <Box>
                <Text as="label" weight={{ sm: 'medium' }}>
                  CPF
                </Text>
                <DialogTextFieldRoot
                  placeholder="xxx.xxx.xxx-xx"
                  required
                  disabled={loading}
                  mt={'1'}
                  name="cpf"
                >
                  <TextField.Slot>
                    <IdCardIcon size={20} />
                  </TextField.Slot>
                </DialogTextFieldRoot>
              </Box>

              <Box>
                <Text as="label" weight={{ sm: 'medium' }}>
                  Data de nascimento
                </Text>
                <DialogTextFieldRoot
                  placeholder="dd/mm/aaaa"
                  required
                  disabled={loading}
                  mt={'1'}
                  name="dataNascimento"
                >
                  <TextField.Slot>
                    <Calendar1Icon size={20} />
                  </TextField.Slot>
                </DialogTextFieldRoot>
              </Box>

              <Box>
                <Text as="label" weight={{ sm: 'medium' }}>
                  Senha
                </Text>

                <Flex direction={'column'} gap={'2'}>
                  <DialogTextFieldRoot
                    placeholder="Senha"
                    type="password"
                    required
                    disabled={loading}
                    mt={'1'}
                    name="password"
                  >
                    <TextField.Slot>
                      <LockIcon size={20} />
                    </TextField.Slot>
                  </DialogTextFieldRoot>
                  <DialogTextFieldRoot
                    placeholder="Confirmar senha"
                    type="password"
                    required
                    disabled={loading}
                    name="confirmPassword"
                  >
                    <TextField.Slot>
                      <LockIcon size={20} />
                    </TextField.Slot>
                  </DialogTextFieldRoot>
                </Flex>
              </Box>
            </Flex>
          </Box>
        </ScrollArea>

        <Inset clip={'border-box'} side={'x'} mt={'2'} mb={'1'}>
          <Separator size={'4'} />
        </Inset>

        <Flex justify={'end'}>
          <Box
            width={{
              initial: '100%',
              sm: 'fit-content',
            }}
            asChild
          >
            <Button
              variant="solid"
              color="green"
              size={{
                initial: '2',
              }}
              type="submit"
              loading={loading}
              disabled={loading}
            >
              <UserRoundPlusIcon />
              <Text>Cadastrar usuário</Text>
            </Button>
          </Box>
        </Flex>
      </form>
    </Flex>
  );
}
