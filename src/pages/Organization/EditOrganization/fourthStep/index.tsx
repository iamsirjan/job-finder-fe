import { Box, Button } from '@chakra-ui/react';
import { FormWrapper } from 'components/form/FormWrapper';
import { IOrgFourthStep } from './interface';
import { DefaultValues, FormValidation } from './constant';
import Form from './form';
import {
  useGetOrgDetailsByID,
  useRegisterOrganizationStepFourth,
} from 'service/service-organization-register';
import { useParams } from 'react-router-dom';

const FourthStep = () => {
  const register = useRegisterOrganizationStepFourth();
  const { id } = useParams<{ id: string }>();
  const orgDetails = useGetOrgDetailsByID(id ?? '');

  const handleSubmit = async (data: IOrgFourthStep) => {
    const formData = new FormData();

    formData.append('profile_pic', data?.profile_pic[0]);
    await register.mutateAsync({
      body: formData,
      id: orgDetails.data?.organization_detail.user,
    });
  };

  return (
    <Box>
      <FormWrapper<IOrgFourthStep>
        defaultValues={DefaultValues}
        onSubmit={handleSubmit}
        validationSchema={FormValidation}
      >
        <Form data={orgDetails.data?.organization_detail.profile_pic ?? ''} />

        <Button
          type="submit"
          mt={5}
          width={'fi-content'}
          isLoading={register.isLoading}
        >
          Update
        </Button>
      </FormWrapper>
    </Box>
  );
};

export default FourthStep;
