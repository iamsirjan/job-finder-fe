import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { IModalProps } from './interface';

const ModalComponent = ({
  heading,
  children,
  primaryText,
  secondaryText,
  isOpen,
  onApiCall,
  onClose,
  size,
  isLoading,
  footer,

  alignment,
}: IModalProps) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={size}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent borderRadius={'12px'}>
          <ModalHeader>{heading}</ModalHeader>
          <ModalCloseButton />
          <Divider mb={3} />
          <ModalBody style={{ textAlign: alignment }}>{children}</ModalBody>

          <ModalFooter w={'full'}>
            {footer || (
              <>
                <Button mr={3} variant={'outline'} onClick={onClose} flex={1}>
                  {secondaryText}
                </Button>

                <Button
                  mr={3}
                  onClick={onApiCall || onClose}
                  isLoading={isLoading}
                  flex={1}
                >
                  {primaryText}
                </Button>
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalComponent;
