import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from 'components/form';
import { useLoginMutation } from 'service/service-auth';
import Wrapper from 'wrapper';
import { Link } from 'react-router-dom';
import { NAVIGATION_ROUTES } from 'route/routes.constant';

export interface LoginDetails {
  phone: string;
  password: string;
}

const defaultValues: LoginDetails = {
  phone: '',
  password: '',
};

const schema = z.object({
  phone: z.string().min(1, 'Phone is required'),
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
    console.log('login');
    await login.mutateAsync({
      phone_number: loginDetails.phone,
      password: loginDetails.password,
    });
  };
  return (
    <Wrapper showNavbar={true} fullNavbar={false}>
      <Box
        display="flex"
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems="center"
        height={{ base: 'auto', md: '70vh' }}
      >
        <Box bg="#fff" padding={'40px 40px'} borderRadius={'12px'}>
          <Flex>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <Text fontSize={'3xl'} fontWeight={'semibold'}>
                {'Login'}
              </Text>
              <Text fontSize={'medium'} fontWeight={300}>
                Stay connected to vacancies and organization
              </Text>
              <VStack pt={6} spacing={4}>
                <Input
                  name={'phone'}
                  placeholder="Phone"
                  control={control}
                  w={'full'}
                />
                <Input
                  name={'password'}
                  placeholder="Password"
                  type={'password'}
                  width={'full'}
                  control={control}
                />
              </VStack>
              <Text mt={2} fontWeight={800} color={'#0a67c3'}>
                Forgot Password?
              </Text>
              <Button
                type="submit"
                mt={4}
                w={'100%'}
                background={'#0a67c3'}
                borderRadius={'90px'}
                padding={'20px'}
                alignSelf={'self-start'}
                isLoading={login.isLoading}
              >
                {'Login'}
              </Button>
              <Text color="secondary.900" mt={5} fontSize={'12px'}>
                By clicking continue you agree to our policy and our agrements
              </Text>
            </form>
          </Flex>
        </Box>
        <Text
          display={'flex'}
          color="secondary.900"
          mt={6}
          justifyContent={'center'}
          textAlign={'center'}
          fontSize={'16px'}
        >
          New here? &nbsp;
          <Link to={NAVIGATION_ROUTES.REGISTER}>
            <Text color="#0a67c3">Register here</Text>
          </Link>
        </Text>
      </Box>
    </Wrapper>
  );
};

export default Login;
