import { Box, Button } from '@chakra-ui/react';
import { FormWrapper } from 'components/form/FormWrapper';
import { DefaultValues, FormValidation } from './constant';
import Form from './form';
import { useRegisterAgentStepFirst } from 'service/service-agent-register';

const FirstStep = () => {
  const registration = useRegisterAgentStepFirst();
  const handleSubmit = async (data: IFirstStepAgent) => {
    await registration.mutateAsync(data);
  };
  return (
    <Box>
      <FormWrapper<IFirstStepAgent>
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
