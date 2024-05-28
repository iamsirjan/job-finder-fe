import type { ComponentStyleConfig } from '@chakra-ui/theme';

export const IconButtonTheme: ComponentStyleConfig = {
  baseStyle: () => {
    return {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: '1px solid',
      color: 'brand.blue',
      _focus: {
        boxShadow: 'none',
      },
      _disabled: {
        color: '#09305A',
        opacity: 0.5,
        pointerEvents: 'none',
      },
    };
  },
  sizes: {
    md: {
      borderRadius: '3px',
      width: '24px',
      height: '24px',
      minWidth: '24px',
      fontSize: '12px',
    },
    lg: {
      borderRadius: '4px',
      width: '32px',
      height: '32px',
      minWidth: '32px',
      fontSize: '16px',
    },
  },
  variants: {
    primary: {
      bg: 'primary.100',
      borderColor: 'primary.500',

      _hover: {
        bg: 'primary.200',
      },

      _disabled: {
        bg: '#EDF2F7',
        border: 'none',
      },

      _active: {
        bg: 'primary.300',
        borderColor: 'primary.400',
      },
    },
    secondary: {
      borderColor: '#E2E8F0',

      _hover: {
        bg: 'secondary.100',
      },

      _active: {
        bg: 'secondary.150',
        borderColor: 'secondary.200',
      },
    },
    ghost: {
      border: 'none',

      _hover: {
        bg: 'secondary.100',
      },

      _disabled: {
        bg: 'brand.white',
        color: 'secondary.700',
      },

      _active: {
        bg: '#E2E8F0',
      },
    },
    header: {
      borderColor: '#A5CBFA',
      bg: 'primary.100',

      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'brand.blue',
      _focus: {
        boxShadow: 'none',
      },
      _disabled: {
        color: '#09305A',
        opacity: 0.5,
        pointerEvents: 'none',
      },
      _hover: {
        bg: 'primary.200',
      },

      _active: {
        bg: '#DCEEFF',
      },
    },
    'header-ghost': {
      border: 'none',

      _hover: {
        bg: 'primary.200',
      },

      _disabled: {
        bg: 'brand.white',
        color: 'secondary.700',
      },

      _active: {
        bg: '#E2E8F0',
      },
    },
    listing: {
      border: 'none',

      _hover: {},

      _active: {
        bg: '#E2E8F0',
      },
    },
  },
  defaultProps: {
    size: 'md',
    variant: 'primary',
  },
};
