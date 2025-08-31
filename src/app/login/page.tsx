import { Box, Card, Flex } from '@radix-ui/themes';
import { Metadata } from 'next';
import LoginForm from './LoginForm';
import MainLayout from '@/components/layout/MainLayout';
import { PublicRoute } from '@/components/layout/PublicRoute';

export const metadata: Metadata = {
  title: 'Login | Farmácia App',
  description: 'Acessar sua conta - Farmácia',
};

export default function LoginPage() {
  return (
    <PublicRoute>
      <MainLayout>
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
      </MainLayout>
    </PublicRoute>
  );
}
