import { Input, VStack } from '@chakra-ui/react';
import FormField from 'components/form/FormField';
import { useFormContext } from 'react-hook-form';
import { IUniversityRequest } from 'service/master/service-university';

const CreateUpdateForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<IUniversityRequest>();
  return (
    <VStack gap={4}>
      <FormField label="Name" error={errors.name?.message}>
        <Input {...register('name')} name="name" maxLength={30} size={'md'} />
      </FormField>
      <FormField label="Location" error={errors.name?.message}>
        <Input {...register('location')} name="location" size={'md'} />
      </FormField>
    </VStack>
  );
};

export default CreateUpdateForm;
