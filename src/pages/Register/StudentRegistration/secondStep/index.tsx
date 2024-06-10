import { Box, Button } from '@chakra-ui/react';
import { FormWrapper } from 'components/form/FormWrapper';
import { IAgentSecondStep } from './interface';
import { DefaultValues, FormValidation } from './constant';
import Form from './form';
import { useRegisterStudentStepSecond } from 'service/service-student-register';

const SecondStep = () => {
  const register = useRegisterStudentStepSecond();

  const handleSubmit = async (data: IAgentSecondStep) => {
    const formData = new FormData();
    formData.append('profile_picture', data?.profile_picture[0]);
    await register.mutateAsync(formData);
  };

  return (
    <Box>
      <FormWrapper<IAgentSecondStep>
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
