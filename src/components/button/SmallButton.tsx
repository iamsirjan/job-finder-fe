import { Button as CButton, Spinner, Text, useStyleConfig } from '@chakra-ui/react';
import { forwardRef, Ref } from 'react';

import { ButtonProps } from './prop-type';

export const SmallButton = forwardRef(
  ({ title, variant, ...rest }: ButtonProps, ref: Ref<HTMLButtonElement>) => {
    const styles = useStyleConfig('SmallButton', { variant });

    return (
      <CButton
        __css={styles}
        ref={ref}
        spinner={<Spinner variant={variant} size="xs" />}
        variant={variant}
        {...rest}
      >
        <Text variant="smallButtonText">{title}</Text>
      </CButton>
    );
  },
);
