import {
  Button as CButton,
  Spinner,
  Text,
  useStyleConfig,
} from '@chakra-ui/react';
import { forwardRef, Ref } from 'react';

import { ButtonProps } from './prop-type';

export const ListingButton = forwardRef(
  (
    { title, variant, textStyle, ...rest }: ButtonProps,
    ref: Ref<HTMLButtonElement>,
  ) => {
    const styles = useStyleConfig('ListingButton', { variant });

    return (
      <CButton
        __css={styles}
        ref={ref}
        {...rest}
        spinner={<Spinner variant={variant} size="sm" />}
        variant={variant}
      >
        <Text style={{ ...textStyle }} variant="listingButtonText">
          {title}
        </Text>
      </CButton>
    );
  },
);
