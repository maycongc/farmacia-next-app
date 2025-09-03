import { Text } from '@radix-ui/themes';

export default function TextErrorFormValidation({
  campo,
}: {
  campo: string[] | undefined;
}) {
  return (
    <>
      {campo && (
        <Text as="p" color="red" mt={'1'} ml={'2'} size={'2'}>
          {campo.join(', ')}
        </Text>
      )}
    </>
  );
}
