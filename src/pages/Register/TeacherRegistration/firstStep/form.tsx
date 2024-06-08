import { Flex, Input, Select, Switch, VStack } from '@chakra-ui/react';
import FormField from 'components/form/FormField';
import { useFormContext } from 'react-hook-form';
import { GENDER } from './constant';

const Form = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<IFirstStep>();
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
        <FormField
          label="Experience"
          error={errors.experience_in_years?.message}
        >
          <Input
            {...register('experience_in_years')}
            name="experience_in_years"
            size={'md'}
          />
        </FormField>
      </Flex>
      <Flex justifyContent={'space-between'} w={'100%'} gap={2}>
        <FormField
          label="Expected Salary(Low)"
          error={errors.expected_salary_low?.message}
        >
          <Input
            {...register('expected_salary_low')}
            name="expected_salary_low"
            size={'md'}
          />
        </FormField>
        <FormField
          label="Expected Salary(High)"
          error={errors.expected_salary_high?.message}
        >
          <Input
            {...register('expected_salary_high')}
            name="expected_salary_high"
            size={'md'}
          />
        </FormField>
      </Flex>
      <Flex justifyContent={'space-between'} w={'100%'}>
        <FormField label="Are you available?">
          <Switch size="sm" />
        </FormField>
        <FormField label="Permanent location?">
          <Switch size="sm" />
        </FormField>
      </Flex>
    </VStack>
  );
};

export default Form;
