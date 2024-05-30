import { Button, HStack, Text } from '@chakra-ui/react';
interface Props {
  isFormSubmitting: boolean;
  handleCancelClick: () => void;
  isCreateFlow: boolean;
}
const FormFooterButton = ({
  isFormSubmitting,
  handleCancelClick,
  isCreateFlow,
}: Props) => {
  const disableButton = isFormSubmitting;
  return (
    <HStack mt={4}>
      <Button
        type={'submit'}
        variant="primary"
        isLoading={isFormSubmitting}
        disabled={disableButton}
        flex={1}
      >
        {isCreateFlow ? 'Done' : 'Update'}
      </Button>
      <Button flex={1} onClick={handleCancelClick} variant="outline">
        <Text>Cancel</Text>
      </Button>
    </HStack>
  );
};

export default FormFooterButton;
