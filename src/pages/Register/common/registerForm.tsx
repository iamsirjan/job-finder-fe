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
      <FormField error={errors.email?.message}>
        <Input
          placeholder="Email"
          {...register('email')}
          name="email"
          size={'md'}
        />
      </FormField>
      <FormField error={errors.phone?.message}>
        <Input
          placeholder="Phone"
          {...register('phone')}
          name="phone"
          size={'md'}
          type="number"
        />
      </FormField>
      <FormField error={errors.address?.message}>
        <Input
          placeholder="Address"
          {...register('address')}
          name="address"
          size={'md'}
        />
      </FormField>
      <FormField error={errors.password?.message}>
        <Input
          {...register('password')}
          name="password"
          size={'md'}
          placeholder="Password"
          type="password"
        />
      </FormField>
      <FormField error={errors.confirm_password?.message}>
        <Input
          {...register('confirm_password')}
          name="confirm_password"
          size={'md'}
          type="password"
          placeholder="Confirm Password"
        />
      </FormField>
      <FormField error={errors.user_type?.message}>
        <Select {...register('user_type')} placeholder="Select User Type">
          {USERTYPE?.map((data) => (
            <option key={data.value} value={data.value}>
              {data.label}
            </option>
          ))}
        </Select>
      </FormField>
    </VStack>
  );
};

export default RegisterForm;
