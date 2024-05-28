import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  FormErrorMessage,
  InputGroup,
} from '@chakra-ui/react';
import { IInputField } from './input/interface';
import { FieldValues, useController } from 'react-hook-form';

const FileUpload = <T extends FieldValues>({
  name,
  control,
  label,
  isRequired,
  ...rest
}: IInputField<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <FormControl isInvalid={!!error} isRequired={isRequired}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <InputGroup>
        <ChakraInput id={name} type={'file'} {...rest} {...field} />
      </InputGroup>

      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export { FileUpload };
