import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
} from '@chakra-ui/react';
import { FieldValues, useController } from 'react-hook-form';
import { ITextArea } from './input/interface';
const TextArea = <T extends FieldValues>({
  name,
  control,
  label,
  isRequired,
  required,
  ...rest
}: //TODO: isRequired and required both looks dubious
ITextArea<T> & { isRequired?: boolean; required?: boolean }) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });
  return (
    // TODO: work on the isRequired field
    <FormControl isInvalid={!!error} isRequired={isRequired}>
      {label && (
        <FormLabel htmlFor={name}>
          {label}
          {required && <span style={{ color: 'red' }}>&nbsp;*</span>}
        </FormLabel>
      )}
      <Textarea resize={'none'} {...field} {...rest} />
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export { TextArea };
