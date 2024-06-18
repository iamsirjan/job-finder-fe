import type { ComponentStyleConfig } from '@chakra-ui/theme';

export const FormFieldTheme: ComponentStyleConfig = {
  baseStyle: {
    control: {
      mb: '0.5rem',
    },
    label: {
      fontSize: '0.75rem',
      color: 'secondary.700',
      fontWeight: 800,
    },
    error: {
      mt: '0.25rem',
      color: 'brand.red',
    },
  },
  variants: {
    floating: {
      error: {
        position: 'absolute',
      },
      control: {
        mb: '0',
      },
    },
  },
};
