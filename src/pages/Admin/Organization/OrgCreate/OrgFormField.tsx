import { Input, Select } from '@chakra-ui/react';
import FormField from 'components/form/FormField';
import { OrganizationTypes } from 'pages/Register/OrganizationRegistration/firstStep/constant';
import { IOrgFirstStep } from 'pages/Register/OrganizationRegistration/firstStep/interface';
import { useFormContext } from 'react-hook-form';

const OrgFormFields = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<{ org: IOrgFirstStep }>();

  return (
    <>
      <FormField error={errors.org?.name?.message}>
        <Input
          placeholder="Organization Name"
          {...register('org.name')}
          size={'md'}
        />
      </FormField>
      <FormField error={errors.org?.phone_number?.message}>
        <Input
          placeholder="Phone Number"
          {...register('org.phone_number')}
          size={'md'}
        />
      </FormField>
      <FormField error={errors.org?.pan_number?.message}>
        <Input
          placeholder="PAN Number"
          {...register('org.pan_number')}
          size={'md'}
        />
      </FormField>
      <FormField error={errors.org?.address?.message}>
        <Input placeholder="Address" {...register('org.address')} size={'md'} />
      </FormField>
      <FormField error={errors.org?.web_site_link?.message}>
        <Input
          placeholder="Website"
          {...register('org.web_site_link')}
          size={'md'}
        />
      </FormField>
      <FormField error={errors.org?.organization_type?.message}>
        <Select
          {...register('org.organization_type')}
          placeholder="Select Organization Type"
        >
          {OrganizationTypes?.map((data) => (
            <option key={data.value} value={data.value}>
              {data.label}
            </option>
          ))}
        </Select>
      </FormField>
    </>
  );
};

export default OrgFormFields;
