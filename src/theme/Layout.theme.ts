import type { ComponentStyleConfig } from '@chakra-ui/theme';

export const LayoutTheme: ComponentStyleConfig = {
  baseStyle: ({ height }) => ({
    container: {
      bg: 'gray.200',
      px: '18px',
      pt: '8px',
      maxWidth: '100%',
      height: height || 'calc(100vh - 4rem)',
      overflow: 'auto',
    },
    box: {
      flex: 1,
      h: 'full',
      borderRadius: 4,
      display: 'flex',
      flexDir: 'column',
    },
  }),
};
