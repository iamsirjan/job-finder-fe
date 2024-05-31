import { ModalFooter, Text } from '@chakra-ui/react';
import { FormWrapper } from 'components/form/FormWrapper';
import ModalComponent from 'components/modal';
import { GradeDefaultValues, GradeFormValidation } from './constant';
import CreateUpdateForm from './CreateUpdateForm';
import FormFooterButton from 'components/form/FormButton';
import { useCommonStore } from 'state/common.state';
import {
  IGrade,
  IGradeRequest,
  useAddGradeData,
  useUpdateGradeData,
} from 'service/master/service-grade';

interface IAddGrade {
  onClose: () => void;
  isOpen: boolean;
  data: IGrade;
  gradeID: string;
}

const AddGrade = ({ onClose, isOpen, data, gradeID }: IAddGrade) => {
  const postGrade = useAddGradeData();
  const updateGrade = useUpdateGradeData();
  const store = useCommonStore();
  const handleSubmit = async (data: IGradeRequest) => {
    await postGrade.mutateAsync(data);
    onClose();

    useCommonStore.getState().setEditMode(true);
  };

  const handleUpdate = async (data: IGradeRequest) => {
    await updateGrade.mutateAsync({
      id: gradeID,
      data: data,
    });
    onClose();
  };

  return (
    <ModalComponent
      heading={<Text>{store.isEditMode ? 'Edit' : 'Add'} Grade</Text>}
      onClose={() => {
        onClose();
        useCommonStore.getState().setEditMode(true);
      }}
      isOpen={isOpen}
    >
      <FormWrapper<IGradeRequest>
        validationSchema={GradeFormValidation}
        defaultValues={store.isEditMode ? data : GradeDefaultValues}
        onSubmit={store.isEditMode ? handleUpdate : handleSubmit}
      >
        <CreateUpdateForm />
        <ModalFooter p={0}>
          <FormFooterButton
            handleCancelClick={onClose}
            isFormSubmitting={updateGrade.isLoading || postGrade.isLoading}
            isCreateFlow={!store.isEditMode}
          />
        </ModalFooter>
      </FormWrapper>
    </ModalComponent>
  );
};

export default AddGrade;
