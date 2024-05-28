import type { ComponentStyleConfig } from '@chakra-ui/theme';

export const SearchTheme: ComponentStyleConfig = {
  baseStyle: {
    inputGroup: {
      size: 'md',
      border: '2px solid primary.300',
    },
    icon: {
      color: 'brand.blue',
    },
  },
};
