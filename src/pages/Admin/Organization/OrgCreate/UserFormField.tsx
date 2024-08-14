import { Flex, Input } from '@chakra-ui/react';
import FormField from 'components/form/FormField';
import { useFormContext } from 'react-hook-form';
import { IRegisterUserRequest } from 'service/service-register-common';

const UserFormFields = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<{ user: IRegisterUserRequest }>();

  console.log(watch('user.password') === watch('user.confirm_password'));
  console.log(watch('user.confirm_password'));

  return (
    <>
      <Flex justifyContent={'space-between'} w={'100%'} gap={2}>
        <FormField error={errors.user?.email?.message}>
          <Input placeholder="Email" {...register('user.email')} size={'md'} />
        </FormField>
        <FormField error={errors.user?.phone?.message}>
          <Input
            placeholder="Phone"
            {...register('user.phone')}
            size={'md'}
            type="number"
          />
        </FormField>
      </Flex>
      <FormField error={errors.user?.address?.message}>
        <Input
          placeholder="Address"
          {...register('user.address')}
          size={'md'}
        />
      </FormField>
      <Flex justifyContent={'space-between'} w={'100%'} gap={2}>
        <FormField error={errors.user?.password?.message}>
          <Input
            placeholder="Password"
            {...register('user.password')}
            size={'md'}
            type="password"
          />
        </FormField>
        <FormField error={errors.user?.confirm_password?.message}>
          <Input
            placeholder="Confirm Password"
            {...register('user.confirm_password')}
            size={'md'}
            type="password"
          />
        </FormField>
      </Flex>
    </>
  );
};

export default UserFormFields;
