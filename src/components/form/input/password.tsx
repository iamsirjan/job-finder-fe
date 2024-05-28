import {
  InputGroup,
  InputRightElement,
  Input as ChakraInput,
  useDisclosure,
} from '@chakra-ui/react';
import { FieldValues } from 'react-hook-form';
import { ICustomInput } from './interface';
import { Type } from './constants';

const Password = <T extends FieldValues>({
  field,
  ...rest
}: ICustomInput<T>) => {
  const { isOpen: showPassword, onToggle: _setShowPassword } = useDisclosure();

  return (
    <InputGroup>
      <ChakraInput
        type={showPassword ? Type.TEXT : Type.PASSWORD}
        {...field}
        {...rest}
      />
      <InputRightElement>
        {/* <Icon
            onClick={setShowPassword}
            as={showPassword ? <EyeOpenIcon /> : <EyeCloseIcon />}
            cursor={"pointer"}
          /> */}
        {/* TODO: remove this comment once you have setup the svg for your project, 
          since svg might differ according to your project  */}
        {/* {showPassword ? (
          <EyeOpenIcon onClick={setShowPassword} cursor={'pointer'} />
        ) : (
          <EyeCloseIcon onClick={setShowPassword} cursor={'pointer'} />
        )} */}
      </InputRightElement>
    </InputGroup>
  );
};

export { Password };
