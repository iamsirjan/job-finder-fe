import { ComponentStyleConfig } from '@chakra-ui/react';
import { BUTTON_VARIANTS } from './variants';

export const ListingButtonTheme: ComponentStyleConfig = {
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
      px: '8px',
      py: '5px',
      borderRadius: '3px',
    },
  },
  variants: BUTTON_VARIANTS,
  defaultProps: {
    size: 'md',
    variant: 'primary',
  },
};
