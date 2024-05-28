import { ButtonProps as CButtonProps } from '@chakra-ui/react';
import { VARIANT } from 'components/types';

export type ButtonProps = Omit<
  CButtonProps,
  'variant' | 'loadingText' | 'spinner' | '__css' | 'ref'
> & {
  title: string;
  variant?: VARIANT;
  textStyle?: any;
  style?: any;
};
