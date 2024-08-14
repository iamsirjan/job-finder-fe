import { Input, Select, Textarea, VStack } from '@chakra-ui/react';
import FormField from 'components/form/FormField';
import { IStatusChange, StatusOption } from './constant';
import { useFormContext } from 'react-hook-form';
import { VacancyStatus } from 'service/service-offer-org';

const StatusForm = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<IStatusChange>();

  return (
    <VStack gap={4}>
      <FormField label="Organization Type" error={errors.status?.message}>
        <Select {...register('status')} placeholder="Select option">
          {StatusOption?.map((data) => (
            <option key={data.value} value={data.value}>
              {data.label}
            </option>
          ))}
        </Select>
      </FormField>

      {watch('status') === VacancyStatus.REJECTED && (
        <FormField label="Message" error={errors.message?.message}>
          <Textarea
            rows={6}
            placeholder="Enter reason for rejection"
            {...register('message')}
          />
        </FormField>
      )}

      {watch('status') === VacancyStatus.APPROVED && (
        <>
          <FormField label="Date" error={errors.date?.message}>
            <Input type="date" {...register('date')} />
          </FormField>
          <FormField label="Time" error={errors.time?.message}>
            <Input type="time" {...register('time')} />
          </FormField>
        </>
      )}
    </VStack>
  );
};

export default StatusForm;
