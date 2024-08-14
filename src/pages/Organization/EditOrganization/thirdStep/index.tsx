import { Button } from '@chakra-ui/react';
import { FormWrapper } from 'components/form/FormWrapper';
import { DefaultValues, FormValidation } from './constant';
import Form from './form';
import { IOrgThirdStep } from './interface';
import {
  useGetOrgDetailsByID,
  useRegisterOrganizationStepThird,
} from 'service/service-organization-register';
import { useParams } from 'react-router-dom';
import { toastSuccess } from 'service/service-toast';

const ThirdStep = ({ data }: { data: IOrgThirdStep }) => {
  const registration = useRegisterOrganizationStepThird();
  const { id } = useParams<{ id: string }>();
  const orgDetails = useGetOrgDetailsByID(id ?? '');

  const handleSubmit = async (data: IOrgThirdStep) => {
    await registration.mutateAsync({
      body: data.courses,
      id: orgDetails.data?.organization_detail.user,
    });
    toastSuccess('successfully added organization courses');
  };
  return (
    <FormWrapper<IOrgThirdStep>
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
  );
};

export default ThirdStep;
