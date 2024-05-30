import { ModalFooter, Text } from '@chakra-ui/react';
import { FormWrapper } from 'components/form/FormWrapper';
import ModalComponent from 'components/modal';
import {
  IStream,
  IStreamRequest,
  useAddStreamData,
  useUpdateStreamData,
} from 'service/master/service-stream';
import { StreamDefaultValues, StreamFormValidation } from './constant';
import CreateUpdateForm from './CreateUpdateForm';
import FormFooterButton from 'components/form/FormButton';
import { useCommonStore } from 'state/common.state';

interface IAddStream {
  onClose: () => void;
  isOpen: boolean;
  data: IStream;
  streamID: string;
}

const AddStream = ({ onClose, isOpen, data, streamID }: IAddStream) => {
  const postStream = useAddStreamData();
  const updateStream = useUpdateStreamData();
  const store = useCommonStore();
  const handleSubmit = async (data: IStreamRequest) => {
    await postStream.mutateAsync(data);
    onClose();

    useCommonStore.getState().setEditMode(true);
  };

  const handleUpdate = async (data: IStreamRequest) => {
    await updateStream.mutateAsync({
      id: streamID,
      data: data,
    });
    onClose();
  };

  return (
    <ModalComponent
      heading={<Text>{store.isEditMode ? 'Edit' : 'Add'} Stream</Text>}
      onClose={() => {
        onClose();
        useCommonStore.getState().setEditMode(true);
      }}
      isOpen={isOpen}
    >
      <FormWrapper<IStreamRequest>
        validationSchema={StreamFormValidation}
        defaultValues={store.isEditMode ? data : StreamDefaultValues}
        onSubmit={store.isEditMode ? handleUpdate : handleSubmit}
      >
        <CreateUpdateForm />
        <ModalFooter p={0}>
          <FormFooterButton
            handleCancelClick={onClose}
            isFormSubmitting={updateStream.isLoading || postStream.isLoading}
            isCreateFlow={!store.isEditMode}
          />
        </ModalFooter>
      </FormWrapper>
    </ModalComponent>
  );
};

export default AddStream;
