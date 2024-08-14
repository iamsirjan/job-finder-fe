import { useFormContext } from 'react-hook-form';
import { IOrgSecondStep } from './interface';
import { Input, VStack } from '@chakra-ui/react';
import FormField from 'components/form/FormField';
// import useGeolocation from 'hooks/useGeoLocation';
import { useEffect } from 'react';

const Form = ({ data }: { data: IOrgSecondStep }) => {
  const {
    register,
    reset,
    formState: { errors },
  } = useFormContext<IOrgSecondStep>();
  // const { latitude, longitude } = useGeolocation();

  useEffect(() => {
    // if (latitude && longitude) {
    //   setValue('latitude', latitude);
    //   setValue('longitude', longitude);
    // }

    reset({
      latitude: data.latitude,
      longitude: data.longitude,
    });
  }, [data]);
  return (
    <VStack gap={5}>
      <FormField label="Latitude" error={errors.latitude?.message}>
        <Input {...register('latitude')} name="latitude" size={'md'} />
      </FormField>

      <FormField label="Longitude" error={errors.longitude?.message}>
        <Input {...register('longitude')} name="longitude" size={'md'} />
      </FormField>

      {/* <Map center={location} /> */}
    </VStack>
  );
};

export default Form;
