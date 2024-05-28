import { ComponentStyleConfig } from '@chakra-ui/react';
import { BUTTON_VARIANTS } from './variants';

export const SmallButtonTheme: ComponentStyleConfig = {
  baseStyle: {
    color: 'brand.white',
    _focus: {
      boxShadow: 'none',
    },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizes: {
    md: {
      px: '5px',
      py: '3.5px',
      borderRadius: '3px',
    },
  },
  variants: BUTTON_VARIANTS,
  defaultProps: {
    size: 'md',
    variant: 'primary',
  },
};
