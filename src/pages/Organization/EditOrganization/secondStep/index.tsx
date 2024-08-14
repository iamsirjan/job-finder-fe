import { Box, Button } from '@chakra-ui/react';
import { FormWrapper } from 'components/form/FormWrapper';
import { DefaultValues, FormValidation } from './constant';
import Form from './form';
import { IOrgSecondStep } from './interface';
import {
  useRegisterOrganizationStepSecond,
  useUpdateOrganizationStepSecond,
} from 'service/service-organization-register';
import { useParams } from 'react-router-dom';

const SecondStep = ({ data }: { data: IOrgSecondStep }) => {
  const { id } = useParams<{ id: string }>();

  const registration = useUpdateOrganizationStepSecond();
  const handleSubmit = async (data: IOrgSecondStep) => {
    await registration.mutateAsync({
      body: data,
      id: id,
    });
  };
  return (
    <Box>
      <FormWrapper<IOrgSecondStep>
        defaultValues={DefaultValues}
        validationSchema={FormValidation}
        onSubmit={handleSubmit}
      >
        <Form data={data} />
        <Button
          isLoading={registration.isLoading}
          type="submit"
          mt={5}
          width={'fit-content'}
        >
          Update
        </Button>
      </FormWrapper>
    </Box>
  );
};

export default SecondStep;
