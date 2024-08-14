import { Input, Select, VStack } from '@chakra-ui/react';
import FormField from 'components/form/FormField';
import { useFormContext } from 'react-hook-form';
import { OrganizationTypes } from './constant';
import { useEffect } from 'react';

interface organization_detail {
  address: string;
  id?: string;
  name: string;
  pan_number: string;
  phone_number: string;
  web_site_link: string;
  organization_type?: string;
}

const Form = ({ data }: { data: organization_detail }) => {
  const {
    register,
    formState: { errors },
    reset,
  } = useFormContext<organization_detail>();

  console.log(data.phone_number);
  useEffect(() => {
    reset({
      name: data.name,
      phone_number: data.phone_number,
      pan_number: data.pan_number,
      address: data.address,
      web_site_link: data.web_site_link,
      organization_type: data.organization_type,
    });
  }, [data, reset]);

  return (
    <VStack gap={5}>
      <FormField label="Organization Name" error={errors.name?.message}>
        <Input {...register('name')} name="name" size={'md'} />
      </FormField>

      <FormField label="Phone Number" error={errors.phone_number?.message}>
        <Input {...register('phone_number')} name="phone_number" size={'md'} />
      </FormField>

      <FormField label="Pan Number" error={errors.pan_number?.message}>
        <Input {...register('pan_number')} name="pan_number" size={'md'} />
      </FormField>

      <FormField label="Address" error={errors.address?.message}>
        <Input {...register('address')} name="address" size={'md'} />
      </FormField>

      <FormField label="Website" error={errors.web_site_link?.message}>
        <Input
          {...register('web_site_link')}
          name="web_site_link"
          size={'md'}
        />
      </FormField>

      <FormField
        label="Organization Type"
        error={errors.organization_type?.message}
      >
        <Select {...register('organization_type')} placeholder="Select option">
          {OrganizationTypes?.map((data) => (
            <option key={data.value} value={data.value}>
              {data.label}
            </option>
          ))}
        </Select>
      </FormField>
    </VStack>
  );
};

export default Form;
