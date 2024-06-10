import { Box, Button } from '@chakra-ui/react';
import { FormWrapper } from 'components/form/FormWrapper';
import { DefaultValues, FormValidation } from './constant';
import Form from './form';
import { IOrgFirstStep } from './interface';
import { useRegisterOrganizationStepFirst } from 'service/service-organization-register';

const FirstStep = () => {
  const registration = useRegisterOrganizationStepFirst();
  const handleSubmit = async (data: IOrgFirstStep) => {
    await registration.mutateAsync(data);
  };
  return (
    <Box>
      <FormWrapper<IOrgFirstStep>
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
