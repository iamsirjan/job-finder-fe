import { Input, VStack } from '@chakra-ui/react';
import FormField from 'components/form/FormField';
import { useFormContext } from 'react-hook-form';
import { IGradeRequest } from 'service/master/service-grade';

const CreateUpdateForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<IGradeRequest>();
  return (
    <VStack gap={4}>
      <FormField label="Name" error={errors.name?.message}>
        <Input {...register('name')} name="name" maxLength={30} size={'md'} />
      </FormField>
    </VStack>
  );
};

export default CreateUpdateForm;
