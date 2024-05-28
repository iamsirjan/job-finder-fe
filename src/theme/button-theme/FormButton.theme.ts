import type { ComponentStyleConfig } from '@chakra-ui/theme';
import { BUTTON_VARIANTS } from './variants';

export const FormButtonTheme: ComponentStyleConfig = {
  baseStyle: {
    _focus: {
      boxShadow: 'none',
    },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizes: {
    md: {
      px: '11px',
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
