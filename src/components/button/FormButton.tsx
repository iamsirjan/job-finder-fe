import { Button as CButton, Spinner, Text, useStyleConfig } from '@chakra-ui/react';
import { forwardRef, Ref } from 'react';

import { ButtonProps } from './prop-type';

export const FormButton = forwardRef(
  ({ title, variant, style, ...rest }: ButtonProps, ref: Ref<HTMLButtonElement>) => {
    const styles = useStyleConfig('FormButton', { variant });

    return (
      <CButton
        __css={styles}
        ref={ref}
        style={{ ...style }}
        variant={variant}
        spinner={<Spinner variant={variant} size="sm" />}
        {...rest}
      >
        <Text variant="formButtonText">{title}</Text>
      </CButton>
    );
  },
);
