import { Controller, useFormContext } from 'react-hook-form';

import FileDropzone from 'components/form/Dropzone';
import { VStack } from '@chakra-ui/react';
import FormField from 'components/form/FormField';
import { IThirdStep } from './interface';

const Form = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IThirdStep>();

  return (
    <VStack gap={4}>
      <FormField
        label="Upload Profile Picture"
        error={errors.profile_picture?.message}
      >
        <Controller
          name="profile_picture"
          control={control}
          render={({ field }) => (
            <FileDropzone
              name="profile_picture"
              field={field}
              multiple={false}
            />
          )}
        />
      </FormField>
    </VStack>
  );
};

export default Form;
