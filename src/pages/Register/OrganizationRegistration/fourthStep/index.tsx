import { Box, Button } from '@chakra-ui/react';
import { FormWrapper } from 'components/form/FormWrapper';
import { IOrgFourthStep } from './interface';
import { DefaultValues, FormValidation } from './constant';
import Form from './form';
import { useRegisterOrganizationStepFourth } from 'service/service-organization-register';

const SecondStep = () => {
  const register = useRegisterOrganizationStepFourth();

  const handleSubmit = async (data: IOrgFourthStep) => {
    const formData = new FormData();
    formData.append('profile_pic', data?.profile_pic[0]);
    await register.mutateAsync(formData);
  };

  return (
    <Box>
      <FormWrapper<IOrgFourthStep>
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
