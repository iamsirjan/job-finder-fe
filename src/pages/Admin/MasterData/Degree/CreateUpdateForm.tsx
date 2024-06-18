import { Input, VStack } from '@chakra-ui/react';
import FormField from 'components/form/FormField';
import { useFormContext } from 'react-hook-form';
import { IDegreeRequest } from 'service/master/service-degree';

const CreateUpdateForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<IDegreeRequest>();

  return (
    <VStack gap={4}>
      <FormField label="Name" error={errors.name?.message}>
        <Input {...register('name')} name="name" size={'md'} />
      </FormField>
    </VStack>
  );
};

export default CreateUpdateForm;
