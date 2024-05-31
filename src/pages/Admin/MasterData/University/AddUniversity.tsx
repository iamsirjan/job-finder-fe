import { ModalFooter, Text } from '@chakra-ui/react';
import { FormWrapper } from 'components/form/FormWrapper';
import ModalComponent from 'components/modal';
import FormFooterButton from 'components/form/FormButton';
import { useCommonStore } from 'state/common.state';

import CreateUpdateForm from './CreateUpdateForm';
import {
  IUniversity,
  IUniversityRequest,
  useAddUniversityData,
  useUpdateUniversityData,
} from 'service/master/service-university';
import { UniversityDefaultValues, UniversityFormValidation } from './constant';

interface IAddUniversity {
  onClose: () => void;
  isOpen: boolean;
  data: IUniversity;
  universityID: string;
}

const AddUniversity = ({
  onClose,
  isOpen,
  data,
  universityID,
}: IAddUniversity) => {
  const postUniversity = useAddUniversityData();
  const updateUniversity = useUpdateUniversityData();
  const store = useCommonStore();
  const handleSubmit = async (data: IUniversityRequest) => {
    await postUniversity.mutateAsync(data);
    onClose();

    useCommonStore.getState().setEditMode(true);
  };

  const handleUpdate = async (data: IUniversityRequest) => {
    await updateUniversity.mutateAsync({
      id: universityID,
      data: data,
    });
    onClose();
  };

  return (
    <ModalComponent
      heading={<Text>{store.isEditMode ? 'Edit' : 'Add'} University</Text>}
      onClose={() => {
        onClose();
        useCommonStore.getState().setEditMode(true);
      }}
      isOpen={isOpen}
    >
      <FormWrapper<IUniversityRequest>
        validationSchema={UniversityFormValidation}
        defaultValues={store.isEditMode ? data : UniversityDefaultValues}
        onSubmit={store.isEditMode ? handleUpdate : handleSubmit}
      >
        <CreateUpdateForm />
        <ModalFooter p={0}>
          <FormFooterButton
            handleCancelClick={onClose}
            isFormSubmitting={
              updateUniversity.isLoading || postUniversity.isLoading
            }
            isCreateFlow={!store.isEditMode}
          />
        </ModalFooter>
      </FormWrapper>
    </ModalComponent>
  );
};

export default AddUniversity;
