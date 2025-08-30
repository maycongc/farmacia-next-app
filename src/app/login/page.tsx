import { Box, Card, Flex } from '@radix-ui/themes';
import LoginForm from './LoginForm';

export const metadata = {
  title: 'Login - Farmácia',
  description: 'Acessar sua conta - Farmácia',
};

export default function LoginPage() {
  return (
    <>
      <Flex className="justify-center w-full h-full">
        <Box
          className="w-full h-fit px-6 py-8 shadow-lg"
          maxWidth={'436px'}
          asChild
        >
          <Card>
            <LoginForm />
          </Card>
        </Box>
      </Flex>
    </>
  );
}
