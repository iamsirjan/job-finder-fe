import {
  IconButton as ChakraIconButton,
  IconButtonProps,
  useStyleConfig,
} from '@chakra-ui/react';
import { BTN_DEFAULT_VARIANTS } from 'components/types';
import { forwardRef, ReactElement, Ref } from 'react';

type Props = Omit<IconButtonProps, 'variant' | 'icon'> & {
  icon: ReactElement;
  isDisabled?: boolean;
  isLoading?: boolean;
  variant?: BTN_DEFAULT_VARIANTS | 'listing' | 'header' | 'header-ghost';
};

export const IconButton = forwardRef(
  (
    { isDisabled, isLoading, variant, icon, size, ...rest }: Props,
    ref: Ref<HTMLButtonElement>,
  ) => {
    const btnVariant = variant ?? 'primary';
    const styles = useStyleConfig('IconButton', {
      variant: btnVariant,
      size: size ?? 'md',
    });

    return (
      <ChakraIconButton
        __css={styles}
        ref={ref}
        icon={icon}
        isDisabled={isDisabled}
        isLoading={isLoading}
        variant={btnVariant}
        {...rest}
      />
    );
  },
);
