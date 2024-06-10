import { Input, Select, VStack } from '@chakra-ui/react';
import FormField from 'components/form/FormField';
import { useFormContext } from 'react-hook-form';
import { IOrgFirstStep } from './interface';
import { OrganizationTypes } from './constant';

const Form = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<IOrgFirstStep>();
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
            <option value={data.value}>{data.label}</option>
          ))}
        </Select>
      </FormField>
    </VStack>
  );
};

export default Form;
