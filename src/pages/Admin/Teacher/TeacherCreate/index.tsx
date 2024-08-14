import {
  IRegisterUserRequest,
  useRegisterUser,
} from 'service/service-register-common';
import { IFirstStep } from 'pages/Register/TeacherRegistration/firstStep/interface';
import { FormWrapper } from 'components/form/FormWrapper';
import { CombinedDefaultValues, CombinedFormValidation } from './constant';
import { Button, Flex, VStack } from '@chakra-ui/react';
import CombinedForm from './CombinedForm';
import { Layout } from 'components/layout/Layout';
import { PageHeader } from 'components/pageHeader';
import { useNavigate } from 'react-router-dom';
import { useRegisterTeacherStepFirst } from 'service/service-teacher-register';

interface Form {
  user: IRegisterUserRequest;
  teacher: IFirstStep;
}

const TeacherCreate = () => {
  const registerUser = useRegisterUser({
    redirect: false,
  });
  const firstStep = useRegisterTeacherStepFirst();
  const navigate = useNavigate();
  const handleSubmit = async (data: Form) => {
    const user = await registerUser.mutateAsync(data.user);

    const user_profile = {
      first_name: data.teacher.first_name,
      middle_name: data.teacher.middle_name,
      last_name: data.teacher.last_name,
      gender: data.teacher.gender,
      date_of_birth: data.teacher.date_of_birth,
    };
    const teacher = {
      ...data.teacher,
      user_profile: user_profile,
    };
    await firstStep.mutateAsync({
      id: user.data.data.id,
      body: teacher,
    });
    navigate(-1);
  };

  return (
    <Layout>
      <VStack
        maxH="100vh"
        spacing={0}
        bg="container.background"
        overflowY={'scroll'}
      >
        <PageHeader
          title="Create Teacher"
          search={false}
          filter={false}
          button="Go Back"
          onButtonClick={() => navigate(-1)}
        />
        <FormWrapper<Form>
          validationSchema={CombinedFormValidation}
          defaultValues={CombinedDefaultValues}
          onSubmit={handleSubmit}
          w="100%"
        >
          <VStack gap={4} pb={4}>
            <CombinedForm />
            <Flex justifyContent={'flex-start'} width={'60%'}>
              <Button w={'fit-content'} type="submit">
                Register Teacher
              </Button>
            </Flex>
          </VStack>
        </FormWrapper>
      </VStack>
    </Layout>
  );
};
export default TeacherCreate;
