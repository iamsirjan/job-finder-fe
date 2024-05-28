import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Radio as ChakraRadio,
  RadioGroup,
  RadioProps,
} from '@chakra-ui/react';
import { useState } from 'react';
import { RegisterOptions, UseFormRegister, FieldValues } from 'react-hook-form';

const Radio = ({
  label,
  options,
  register,
  name,
  rules,
  helperText,
  error,
  isRequired,
  value,
  ...rest
}: IRadio) => {
  const [initialValue, setInitialValue] = useState(
    value ? value : options[0].value,
  );

  return (
    <FormControl isInvalid={!!error} isRequired={isRequired}>
      {label && (
        <FormLabel fontWeight={'normal'} fontSize={'sm'} color={'black'}>
          {label}:
        </FormLabel>
      )}
      <RadioGroup value={initialValue} onChange={setInitialValue}>
        <Flex gap={20}>
          {options.map(({ label, value }) => {
            return (
              <ChakraRadio
                key={value}
                value={value}
                fontSize={'sm'}
                fontWeight={'normal'}
                id={name}
                {...register(name, rules)}
                {...rest}
              >
                {label}
              </ChakraRadio>
            );
          })}
        </Flex>
      </RadioGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export interface IRadio<TFieldValues extends FieldValues = FieldValues>
  extends RadioProps {
  options: { label: string; value: string }[];
  label?: string;
  name: string;
  register: UseFormRegister<TFieldValues>;
  rules?: RegisterOptions;
  helperText?: string;
  error?: string;
  isRequired?: boolean;
}

export default Radio;
