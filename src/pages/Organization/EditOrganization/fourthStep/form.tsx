import { Controller, useFormContext } from 'react-hook-form';

import FileDropzone from 'components/form/Dropzone';
import { VStack } from '@chakra-ui/react';
import FormField from 'components/form/FormField';
import { IOrgFourthStep } from './interface';

interface IProfilePic {
  data: string;
}

const Form = (data: IProfilePic) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IOrgFourthStep>();
  console.log(data);
  return (
    <VStack gap={4}>
      <FormField
        label="Upload Profile Picture"
        error={errors.profile_pic?.message}
      >
        <Controller
          name="profile_pic"
          control={control}
          render={({ field }) => (
            <FileDropzone
              name="profile_pic"
              field={field}
              multiple={false}
              defaultValue={data.data}
            />
          )}
        />
      </FormField>
    </VStack>
  );
};

export default Form;
