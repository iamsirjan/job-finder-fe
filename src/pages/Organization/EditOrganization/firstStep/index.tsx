import { Button } from '@chakra-ui/react';
import { FormWrapper } from 'components/form/FormWrapper';
import { DefaultValues, FormValidation } from './constant';
import Form from './form';
import { IOrgFirstStep } from './interface';
import { useUpdateOrganizationStepFirst } from 'service/service-organization-register';
import { useParams } from 'react-router-dom';

interface organization_detail {
  address: string;
  id?: string;
  name: string;
  pan_number: string;
  phone_number: string;
  web_site_link: string;
  organization_type?: string;
  user?: string;
}

const FirstStep = ({ data }: { data: organization_detail }) => {
  const { id } = useParams<{ id: string }>();

  const registration = useUpdateOrganizationStepFirst();
  const handleSubmit = async (subdata: IOrgFirstStep) => {
    await registration.mutateAsync({
      body: subdata,
      id: id,
    });
  };
  return (
    <FormWrapper<IOrgFirstStep>
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

export default FirstStep;
