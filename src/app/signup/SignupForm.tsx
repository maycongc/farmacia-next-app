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
import z from 'zod';
import TextErrorFormValidation from '@/components/TextErrorFormValidation';
import { CalloutMessage } from '@/design-system/components/CalloutMessage';
import { DialogTextFieldRoot } from '@/components/layout/dialog/DialogTextFieldRoot';
import { useAuth } from '@/hooks/useAuth';

type ValidationErroProps = {
  message: string;
  fields: Record<string, string>;
};

type FormErrosProps = {
  nome?: string[] | undefined;
  username?: string[] | undefined;
  email?: string[] | undefined;
  cpf?: string[] | undefined;
  dataNascimento?: string[] | undefined;
  senha?: string[] | undefined;
  confirmarSenha?: string[] | undefined;
};

const signupSchema = z
  .object({
    nome: z
      .string()
      .min(1, 'Campo obrigatório')
      .transform(v => v.trim()),

    username: z
      .string()
      .min(1, 'Campo obrigatório')
      .transform(v => v.trim()),

    email: z
      .string()
      .min(1, 'Campo obrigatório')
      .email('Email inválido')
      .transform(e => e.toLowerCase()),

    cpf: z.string().min(1, 'Campo obrigatório'),

    dataNascimento: z.string().min(1, 'Campo obrigatório'),

    senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
    confirmarSenha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  })
  .refine(data => data.senha === data.confirmarSenha, {
    path: ['confirmarSenha'],
    message: 'Senhas não coincidem',
  });

export default function SignupForm({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<ValidationErroProps | null>(null);
  const [formErros, setFormErros] = useState<FormErrosProps | null>(null);

  const { register } = useAuth();
  const router = useRouter();

  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    erro && setErro(null);
    formErros && setFormErros(null);
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

    const { success, error } = signupSchema.safeParse(data);

    if (!success) {
      setFormErros(() => error.flatten().fieldErrors);
      setLoading(false);
      return;
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
    <Inset clip={'padding-box'} side={'bottom'}>
      <ScrollArea
        className="min-w-full max-w-[28rem] max-h-[70dvh]"
        type="auto"
        scrollbars="vertical"
      >
        <Flex direction={'column'}>
          {erro && (
            <CalloutMessage
              type="error"
              mt={'1'}
              size={{ initial: '1', sm: '2' }}
              mx={'4'}
            >
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
            id="formModalSignup"
            onSubmit={handleSignUp}
            method="POST"
            className="flex flex-col gap-4 pt-1 pb-5 px-3"
          >
            <Box className="table table-fixed w-full h-full max-h-[20dvh] box-border">
              <Flex direction={'column'} gap={{ initial: '2', sm: '3' }}>
                <Box>
                  <Text as="label" weight={{ sm: 'medium' }}>
                    Nome
                  </Text>
                  <DialogTextFieldRoot
                    autoFocus
                    placeholder="Nome"
                    disabled={loading}
                    mt={'1'}
                    name="nome"
                  >
                    <TextField.Slot>
                      <ALargeSmallIcon size={20} />
                    </TextField.Slot>
                  </DialogTextFieldRoot>
                  <TextErrorFormValidation campo={formErros?.nome} />
                </Box>

                <Box>
                  <Text as="label" weight={{ sm: 'medium' }}>
                    Login
                  </Text>
                  <DialogTextFieldRoot
                    placeholder="Login"
                    disabled={loading}
                    mt={'1'}
                    name="username"
                  >
                    <TextField.Slot>
                      <UserIcon size={20} />
                    </TextField.Slot>
                  </DialogTextFieldRoot>
                  <TextErrorFormValidation campo={formErros?.username} />
                </Box>

                <Box>
                  <Text as="label" weight={{ sm: 'medium' }}>
                    Email
                  </Text>
                  <DialogTextFieldRoot
                    placeholder="Email"
                    disabled={loading}
                    mt={'1'}
                    name="email"
                  >
                    <TextField.Slot>
                      <MailIcon size={20} />
                    </TextField.Slot>
                  </DialogTextFieldRoot>
                  <TextErrorFormValidation campo={formErros?.email} />
                </Box>

                <Box>
                  <Text as="label" weight={{ sm: 'medium' }}>
                    CPF
                  </Text>
                  <DialogTextFieldRoot
                    placeholder="xxx.xxx.xxx-xx"
                    disabled={loading}
                    mt={'1'}
                    name="cpf"
                  >
                    <TextField.Slot>
                      <IdCardIcon size={20} />
                    </TextField.Slot>
                  </DialogTextFieldRoot>
                  <TextErrorFormValidation campo={formErros?.cpf} />
                </Box>

                <Box>
                  <Text as="label" weight={{ sm: 'medium' }}>
                    Data de nascimento
                  </Text>
                  <DialogTextFieldRoot
                    placeholder="dd/mm/aaaa"
                    disabled={loading}
                    mt={'1'}
                    name="dataNascimento"
                  >
                    <TextField.Slot>
                      <Calendar1Icon size={20} />
                    </TextField.Slot>
                  </DialogTextFieldRoot>
                  <TextErrorFormValidation campo={formErros?.dataNascimento} />
                </Box>

                <Box>
                  <Text as="label" weight={{ sm: 'medium' }}>
                    Senha
                  </Text>

                  <Flex direction={'column'} gap={'2'}>
                    <Box>
                      <DialogTextFieldRoot
                        placeholder="Senha"
                        type="password"
                        disabled={loading}
                        mt={'1'}
                        name="password"
                      >
                        <TextField.Slot>
                          <LockIcon size={20} />
                        </TextField.Slot>
                      </DialogTextFieldRoot>
                      <TextErrorFormValidation campo={formErros?.senha} />
                    </Box>
                    <Box>
                      <DialogTextFieldRoot
                        placeholder="Confirmar senha"
                        type="password"
                        disabled={loading}
                        name="confirmPassword"
                      >
                        <TextField.Slot>
                          <LockIcon size={20} />
                        </TextField.Slot>
                      </DialogTextFieldRoot>
                      <TextErrorFormValidation
                        campo={formErros?.confirmarSenha}
                      />
                    </Box>
                  </Flex>
                </Box>
              </Flex>
            </Box>
          </form>
        </Flex>
      </ScrollArea>

      <Box className="sticky bottom-0 bg-[var(--color-panel-solid)]">
        <Separator size={'4'} />

        <Flex justify={'end'} className="p-3">
          <Box
            width={{
              initial: '100%',
              sm: 'fit-content',
            }}
            asChild
          >
            <Button
              form="formModalSignup"
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
      </Box>
    </Inset>
  );
}
