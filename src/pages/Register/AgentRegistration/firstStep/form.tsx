import { Flex, Input, Select, VStack } from '@chakra-ui/react';
import FormField from 'components/form/FormField';
import { GENDER } from 'pages/Register/TeacherRegistration/firstStep/constant';
import { useFormContext } from 'react-hook-form';

const Form = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<IFirstStepStudent>();
  return (
    <VStack gap={5}>
      <Flex justifyContent={'space-between'} w={'100%'} gap={2}>
        <FormField label="First Name" error={errors.first_name?.message}>
          <Input {...register('first_name')} name="first_name" size={'md'} />
        </FormField>
        <FormField label="Middle Name" error={errors.middle_name?.message}>
          <Input {...register('middle_name')} name="middle_name" size={'md'} />
        </FormField>
      </Flex>
      <FormField label="Last Name" error={errors.last_name?.message}>
        <Input {...register('last_name')} name="last_name" size={'md'} />
      </FormField>
      <FormField label="Gender" error={errors.gender?.message}>
        <Select {...register('gender')} placeholder="Select option">
          {GENDER?.map((data) => (
            <option value={data.value}>{data.label}</option>
          ))}
        </Select>
      </FormField>
      <Flex justifyContent={'space-between'} w={'100%'} gap={2}>
        <FormField label="Date of birth" error={errors.date_of_birth?.message}>
          <Input
            {...register('date_of_birth')}
            name="date_of_birth"
            type="date"
          />
        </FormField>
      </Flex>
    </VStack>
  );
};

export default Form;
