import { Box, Button } from '@chakra-ui/react';
import { FormWrapper } from 'components/form/FormWrapper';
import {
  IRegisterUserRequest,
  useRegisterUser,
} from 'service/service-register-common';

import Wrapper from 'wrapper';
import { RegisterFormValidation } from './constant';
import RegisterForm from './registerForm';

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
        height={{ base: 'auto', md: '100vh' }}
      >
        <Box bg="#fff" w={'30%'} padding={'40px 40px'} borderRadius={'6px'}>
          <FormWrapper<IRegisterUserRequest>
            validationSchema={RegisterFormValidation}
            onSubmit={handleSubmit}
          >
            <RegisterForm />

            <Button type="submit" mt={4} isLoading={registerUser.isLoading}>
              Register
            </Button>
          </FormWrapper>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default Register;
