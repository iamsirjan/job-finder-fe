import { Input, Textarea, VStack } from '@chakra-ui/react';
import FormField from 'components/form/FormField';
import { useFormContext } from 'react-hook-form';
import { IStreamRequest } from 'service/master/service-stream';

const CreateUpdateForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<IStreamRequest>();
  return (
    <VStack gap={4}>
      <FormField label="Name" error={errors.name?.message}>
        <Input {...register('name')} name="name" maxLength={30} size={'md'} />
      </FormField>
      <FormField label="Description" error={errors.description?.message}>
        <Textarea {...register('description')} size={'md'} height={'200px'} />
      </FormField>
    </VStack>
  );
};

export default CreateUpdateForm;
