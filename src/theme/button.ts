import { defineStyle, defineStyleConfig } from '@chakra-ui/react';
import { THEME_COLORS } from './color';

const baseStyles = {
  px: 2,
  borderRadius: '6px',
  transition: 'all 300ms ease-in-out',
  minWidth: '100px',
};

const primary = defineStyle({
  ...baseStyles,
  background: THEME_COLORS.primary[1000],
  color: 'white',
  _hover: {
    background: 'primary.1000',
    _disabled: {
      backgroundColor: `${THEME_COLORS.primary[500]} `,
    },
  },
});

const danger = defineStyle({
  ...baseStyles,
  color: 'white',
  background: 'red.300',

  _hover: {
    background: 'red.400',
    _disabled: {},
  },
});

const outline = defineStyle({
  ...baseStyles,
  color: '#000',
  _hover: {
    background: 'primary.1000',
    color: '#fff',
  },
  borderColor: 'primary.1000',
});

export const buttonTheme = defineStyleConfig({
  variants: {
    primary,
    outline,
    danger,
  },
  sizes: {
    xs: {
      py: 1,
    },
    sm: {
      py: 2,
    },
    md: {
      py: 3,
    },
    lg: {
      py: 4,
    },
  },
  defaultProps: { variant: 'primary', size: 'sm' },
});
