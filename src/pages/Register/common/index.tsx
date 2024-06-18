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
  const registerUser = useRegisterUser();
  const handleSubmit = async (data: IRegisterUserRequest) => {
    await registerUser.mutateAsync(data);
  };
  return (
    <Wrapper showNavbar={false}>
      <Box
        display="flex"
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems="center"
        height={{ base: 'auto', md: '80vh' }}
      >
        <Box bg="#fff" w={'30%'} padding={'40px 40px'} borderRadius={'6px'}>
          <FormWrapper<IRegisterUserRequest>
            validationSchema={RegisterFormValidation}
            onSubmit={handleSubmit}
          >
            <RegisterForm />

            <Button
              w={'100%'}
              type="submit"
              mt={'40px'}
              isLoading={registerUser.isLoading}
            >
              Register
            </Button>
            <Text textAlign={'end'} mt={4} fontSize={'13px'}>
              Already User?{' '}
              <Link to={NAVIGATION_ROUTES.LOGIN}>
                <Text cursor={'pointer'} as={'span'} color="blue">
                  Login here
                </Text>
              </Link>
            </Text>
          </FormWrapper>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default Register;
