import { Box, Button } from '@chakra-ui/react';
import { FormWrapper } from 'components/form/FormWrapper';
import { DefaultValues, FormValidation } from './constant';
import Form from './form';
import { useRegisterStudentStepFirst } from 'service/service-student-register';

const FirstStep = () => {
  const registration = useRegisterStudentStepFirst();
  const handleSubmit = async (data: IFirstStepStudent) => {
    await registration.mutateAsync(data);
  };
  return (
    <Box>
      <FormWrapper<IFirstStepStudent>
        defaultValues={DefaultValues}
        validationSchema={FormValidation}
        onSubmit={handleSubmit}
      >
        <Form />
        <Button
          isLoading={registration.isLoading}
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
