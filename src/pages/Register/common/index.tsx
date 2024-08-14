import { Box, Button, Text } from '@chakra-ui/react';
import { FormWrapper } from 'components/form/FormWrapper';
import {
  IRegisterUserRequest,
  useRegisterUser,
} from 'service/service-register-common';

import Wrapper from 'wrapper';
import { RegisterFormValidation } from './constant';
import RegisterForm from './registerForm';
import { NAVIGATION_ROUTES } from 'route/routes.constant';
import { Link } from 'react-router-dom';

const Register = () => {
  const registerUser = useRegisterUser({
    redirect: true,
  });
  const handleSubmit = async (data: IRegisterUserRequest) => {
    await registerUser.mutateAsync(data);
  };
  return (
    <Wrapper showNavbar={true} fullNavbar={false}>
      <Box
        display="flex"
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems="center"
        height={{ base: 'auto', md: '80vh' }}
      >
        <Box bg="#fff" padding={'40px 40px'} borderRadius={'6px'}>
          {' '}
          <FormWrapper<IRegisterUserRequest>
            validationSchema={RegisterFormValidation}
            onSubmit={handleSubmit}
          >
            <RegisterForm />

            <Button
              type="submit"
              w={'100%'}
              background={'#0a67c3'}
              borderRadius={'90px'}
              padding={'20px'}
              alignSelf={'self-start'}
              mt={'20px'}
              isLoading={registerUser.isLoading}
            >
              Register
            </Button>
            <Text color="secondary.900" mt={5} fontSize={'12px'}>
              By clicking continue you agree to our policy and our agrements
            </Text>
          </FormWrapper>
        </Box>
        <Text
          display={'flex'}
          color="secondary.900"
          mt={3}
          justifyContent={'center'}
          textAlign={'center'}
          fontSize={'16px'}
        >
          Already a user? &nbsp;
          <Link to={NAVIGATION_ROUTES.LOGIN}>
            <Text color="#0a67c3">Login here</Text>
          </Link>
        </Text>
      </Box>
    </Wrapper>
  );
};

export default Register;
