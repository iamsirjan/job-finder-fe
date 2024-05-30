import { Input, Select, VStack } from '@chakra-ui/react';
import FormField from 'components/form/FormField';
import { useFormContext } from 'react-hook-form';
import { IDegreeRequest } from 'service/master/service-degree';
import { useGetStreamList } from 'service/master/service-stream';

const CreateUpdateForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<IDegreeRequest>();
  const { data: streamData } = useGetStreamList();

  return (
    <VStack gap={4}>
      <FormField label="Name" error={errors.name?.message}>
        <Input {...register('name')} name="name" size={'md'} />
      </FormField>
      <FormField label="Stream" error={errors.stream?.message}>
        <Select {...register('stream')} placeholder="Select option">
          {streamData?.results.map((data) => (
            <option value={data.id}>{data.name}</option>
          ))}
        </Select>
      </FormField>
    </VStack>
  );
};

export default CreateUpdateForm;
