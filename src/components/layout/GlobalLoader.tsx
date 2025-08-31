import { Card, Flex, Text } from '@radix-ui/themes';
import MainLayout from './MainLayout';
import { Loader } from '@/design-system/feedback/Loader';

export default function GlobalLoader() {
  return (
    <MainLayout>
      <Flex
        justify={'center'}
        align={'center'}
        className="fixed inset-[0px] z-9999 pointer-events-none"
      >
        <Card>
          <Flex gap={'1'} p={'3'} align={'center'} justify={'center'}>
            <Loader size="3" />
            <Text>Carregando...</Text>
          </Flex>
        </Card>
      </Flex>
    </MainLayout>
  );
}
