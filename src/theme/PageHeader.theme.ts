import type { ComponentStyleConfig } from '@chakra-ui/theme';

export const PageHeaderTheme: ComponentStyleConfig = {
  baseStyle: {
    box: {
      p: '24px 24px 20px',
      background: 'brand.white',
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      borderBottomColor: 'secondary.200',
      width: '100%',
    },
    desc: {
      my: '16px',
    },
    buttonContainer: {
      gap: '16px',
    },
    verticalDivider: {
      height: '70%',
    },
    filterContainer: {
      position: 'relative',
    },
    filterIndicator: {
      position: 'absolute',
      fill: 'red',
      stroke: 'red',
      top: '-5px',
      right: '-5px',
      height: '10px',
      width: '10px',
    },
  },
};
