import { ModalProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

export interface IModalProps {
  //   approve?: ReactNode;
  alignment?: any;
  children: JSX.Element | JSX.Element[];
  footer?: ReactNode;
  heading: JSX.Element;
  isOpen: boolean;
  isApiLoading?: boolean;
  onApiCall?: () => void;
  isLoading?: boolean;
  onClose: () => void;
  // otherAction?: () => void;
  primaryText?: string;
  //   reject?: ReactNode;
  secondaryText?: string;
  size?: ModalProps['size'];
}
