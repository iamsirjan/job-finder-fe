import { Box, Button } from '@chakra-ui/react';
import { FormWrapper } from 'components/form/FormWrapper';
import { DefaultValues, FormValidation } from './constant';
import Form from './form';
import { IOrgThirdStep } from './interface';
import { useRegisterOrganizationStepThird } from 'service/service-organization-register';

const SecondStep = () => {
  const registration = useRegisterOrganizationStepThird();
  const handleSubmit = async (data: IOrgThirdStep) => {
    await registration.mutateAsync(data.courses);
  };
  return (
    <Box w={'100%'}>
      <FormWrapper<IOrgThirdStep>
        defaultValues={DefaultValues}
        validationSchema={FormValidation}
        onSubmit={handleSubmit}
      >
        <Form />
        <Button
          //   isLoading={register.isLoading}
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
