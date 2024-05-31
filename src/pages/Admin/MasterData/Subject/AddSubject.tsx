import { ModalFooter, Text } from '@chakra-ui/react';
import { FormWrapper } from 'components/form/FormWrapper';
import ModalComponent from 'components/modal';
import FormFooterButton from 'components/form/FormButton';
import { useCommonStore } from 'state/common.state';
import {
  ISubject,
  ISubjectRequest,
  useAddSubjectData,
  useUpdateSubjectData,
} from 'service/master/service-subject';
import { SubjectDefaultValues, SubjectFormValidation } from './constant';
import CreateUpdateForm from './CreateUpdateForm';

interface IAddSubject {
  onClose: () => void;
  isOpen: boolean;
  data: ISubject;
  subjectID: string;
}

const AddSubject = ({ onClose, isOpen, data, subjectID }: IAddSubject) => {
  const postSubject = useAddSubjectData();
  const updateSubject = useUpdateSubjectData();
  const store = useCommonStore();
  const handleSubmit = async (data: ISubjectRequest) => {
    await postSubject.mutateAsync(data);
    onClose();

    useCommonStore.getState().setEditMode(true);
  };

  const handleUpdate = async (data: ISubjectRequest) => {
    await updateSubject.mutateAsync({
      id: subjectID,
      data: data,
    });
    onClose();
  };

  return (
    <ModalComponent
      heading={<Text>{store.isEditMode ? 'Edit' : 'Add'} Subject</Text>}
      onClose={() => {
        onClose();
        useCommonStore.getState().setEditMode(true);
      }}
      isOpen={isOpen}
    >
      <FormWrapper<ISubjectRequest>
        validationSchema={SubjectFormValidation}
        defaultValues={store.isEditMode ? data : SubjectDefaultValues}
        onSubmit={store.isEditMode ? handleUpdate : handleSubmit}
      >
        <CreateUpdateForm />
        <ModalFooter p={0}>
          <FormFooterButton
            handleCancelClick={onClose}
            isFormSubmitting={updateSubject.isLoading || postSubject.isLoading}
            isCreateFlow={!store.isEditMode}
          />
        </ModalFooter>
      </FormWrapper>
    </ModalComponent>
  );
};

export default AddSubject;
