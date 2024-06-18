import { Box, Button } from '@chakra-ui/react';
import { FormWrapper } from 'components/form/FormWrapper';
import { DefaultValues, FormValidation } from './constant';
import Form from './form';
import { IOrgSecondStep } from './interface';
import { useRegisterOrganizationStepSecond } from 'service/service-organization-register';

const SecondStep = () => {
  const registration = useRegisterOrganizationStepSecond();
  const handleSubmit = async (data: IOrgSecondStep) => {
    await registration.mutateAsync(data);
  };
  return (
    <Box>
      <FormWrapper<IOrgSecondStep>
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

export default SecondStep;
