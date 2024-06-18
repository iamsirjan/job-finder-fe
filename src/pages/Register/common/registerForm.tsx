import { Input, Select, VStack } from '@chakra-ui/react';
import FormField from 'components/form/FormField';
import { useFormContext } from 'react-hook-form';
import {
  IRegisterUserRequest,
  USERTYPE,
} from 'service/service-register-common';

const RegisterForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<IRegisterUserRequest>();

  return (
    <VStack gap={4}>
      <FormField label="Email" error={errors.email?.message}>
        <Input {...register('email')} name="email" size={'md'} />
      </FormField>
      <FormField label="Phone" error={errors.phone?.message}>
        <Input {...register('phone')} name="phone" size={'md'} type="number" />
      </FormField>
      <FormField label="Address" error={errors.address?.message}>
        <Input {...register('address')} name="address" size={'md'} />
      </FormField>
      <FormField label="Password" error={errors.password?.message}>
        <Input
          {...register('password')}
          name="password"
          size={'md'}
          type="password"
        />
      </FormField>
      <FormField
        label="Confirm Password"
        error={errors.confirm_password?.message}
      >
        <Input
          {...register('confirm_password')}
          name="confirm_password"
          size={'md'}
          type="password"
        />
      </FormField>
      <FormField label="User Type" error={errors.user_type?.message}>
        <Select {...register('user_type')} placeholder="Select option">
          {USERTYPE?.map((data) => (
            <option value={data.value}>{data.label}</option>
          ))}
        </Select>
      </FormField>
    </VStack>
  );
};

export default RegisterForm;
