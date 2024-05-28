import {
  Input as ChakraInput,
  InputGroup,
  InputLeftElement,
  Icon,
  InputRightElement,
} from '@chakra-ui/react';
import { FieldValues } from 'react-hook-form';
import { ICustomInput } from './interface';

const Text = <T extends FieldValues>({
  leftIcon,
  rightIcon,
  field,
}: ICustomInput<T>) => {
  return (
    <InputGroup>
      {leftIcon && (
        <InputLeftElement>
          <Icon as={leftIcon} />
        </InputLeftElement>
      )}
      <ChakraInput {...field} />
      {rightIcon && (
        <InputRightElement>
          <Icon as={rightIcon} />
        </InputRightElement>
      )}
    </InputGroup>
  );
};

export default Text;
