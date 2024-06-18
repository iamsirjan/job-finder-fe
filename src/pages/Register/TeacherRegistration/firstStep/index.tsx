import { Box, Button } from '@chakra-ui/react';
import { FormWrapper } from 'components/form/FormWrapper';
import Form from './form';
import { DefaultValues, FormValidation } from './constant';
import { useRegisterTeacherStepFirst } from 'service/service-teacher-register';
import TokenService from 'service/service-token';
import { IFirstStep } from './interface';

const FirstStep = () => {
  const register = useRegisterTeacherStepFirst();
  const userDetails = TokenService.getTokenDetails();
  const handleSubmit = async (formData: IFirstStep) => {
    const user_profile = {
      user: userDetails?.user_id.toString(),
      first_name: formData.first_name,
      middle_name: formData.middle_name,
      last_name: formData.last_name,
      gender: formData.gender,
      date_of_birth: formData.date_of_birth,
    };
    const data = {
      ...formData,
      user_profile: user_profile,
    };
    await register.mutateAsync(data);
  };
  return (
    <Box>
      <FormWrapper<IFirstStep>
        defaultValues={DefaultValues}
        validationSchema={FormValidation}
        onSubmit={handleSubmit}
      >
        <Form />
        <Button
          isLoading={register.isLoading}
          type="submit"
          mt={5}
          width={'100%'}
        >
          Next
        </Button>
      </FormWrapper>
    </Box>
  );
};

export default FirstStep;
