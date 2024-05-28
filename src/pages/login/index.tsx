import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from 'components/form';
import { useLoginMutation } from 'service/service-auth';
import Wrapper from 'wrapper';

export interface LoginDetails {
  email: string;
  password: string;
}

const defaultValues: LoginDetails = {
  email: '',
  password: '',
};

const schema = z.object({
  email: z.string().min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
});

const Login = () => {
  const login = useLoginMutation();
  const { control, handleSubmit } = useForm({
    mode: 'onBlur',
    defaultValues: defaultValues,
    resolver: zodResolver(schema),
  });

  const onSubmitHandler = async (loginDetails: LoginDetails) => {
    await login.mutateAsync({
      email: loginDetails.email,
      password: loginDetails.password,
    });
  };
  return (
    <Wrapper showNavbar={false}>
      <Box
        display="flex"
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems="center"
        height={{ base: 'auto', md: '100vh' }}
      >
        <Box bg="#fff" w={'30%'} padding={'40px 40px'} borderRadius={'6px'}>
          <Flex justifyContent={'center'}>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <Text fontSize={'3xl'} fontWeight={'semibold'}>
                {'Login'}
              </Text>
              <VStack pt={6} spacing={8}>
                <Input
                  name={'email'}
                  label={'Email'}
                  control={control}
                  w={'full'}
                />
                <Input
                  name={'password'}
                  label={'Password'}
                  type={'password'}
                  width={'full'}
                  control={control}
                />
                <Button
                  type="submit"
                  w={'100%'}
                  alignSelf={'self-start'}
                  background={'main.100'}
                  // isLoading={isLoading}
                >
                  {'Login'}
                </Button>
              </VStack>
            </form>
          </Flex>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default Login;
