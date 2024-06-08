import { Box, Button } from '@chakra-ui/react';
import { FormWrapper } from 'components/form/FormWrapper';
import { IThirdStep } from './interface';
import { DefaultValues, FormValidation } from './constant';
import Form from './form';
import { useRegisterTeacherStepThird } from 'service/service-teacher-register';

const SecondStep = () => {
  const register = useRegisterTeacherStepThird();

  const handleSubmit = async (data: IThirdStep) => {
    const formData = new FormData();
    console.log(data.profile_picture);
    formData.append('profile_picture', data?.profile_picture[0]);
    await register.mutateAsync(formData);
  };

  return (
    <Box>
      <FormWrapper<IThirdStep>
        defaultValues={DefaultValues}
        onSubmit={handleSubmit}
        validationSchema={FormValidation}
      >
        <Form />
        <Button type="submit" mt={5} width={'100%'}>
          Submit
        </Button>
      </FormWrapper>
    </Box>
  );
};

export default SecondStep;
