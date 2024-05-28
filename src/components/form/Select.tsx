import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select as ChakraSelect,
} from '@chakra-ui/react';
import { FieldValues, useController } from 'react-hook-form';
import { ISelect } from './input/interface';

const Select = <T extends FieldValues>({
  placeholder,
  label,
  options,
  name,
  isRequired,
  required,
  enabled, // enables placeholder
  control,
  ...rest
}: ISelect<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <FormControl isInvalid={!!error} isRequired={isRequired}>
      {label && (
        <FormLabel htmlFor={name}>
          {label} {required && <span style={{ color: 'red' }}>&nbsp;*</span>}
        </FormLabel>
      )}
      <ChakraSelect control={control} {...rest} {...field} id={name}>
        {placeholder && (
          <option value="" disabled={!enabled}>
            {placeholder}
          </option>
        )}
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </ChakraSelect>
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export { Select };
