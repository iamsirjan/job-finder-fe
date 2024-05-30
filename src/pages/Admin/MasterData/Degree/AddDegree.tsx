import { ModalFooter, Text } from '@chakra-ui/react';
import { FormWrapper } from 'components/form/FormWrapper';
import ModalComponent from 'components/modal';

import FormFooterButton from 'components/form/FormButton';
import { useCommonStore } from 'state/common.state';
import { DegreeDefaultValues, DegreeFormValidation } from './constant';
import CreateUpdateForm from './CreateUpdateForm';
import {
  IDegree,
  IDegreeRequest,
  useAddDegreeData,
  useUpdateDegreeData,
} from 'service/master/service-degree';

interface IAddDegree {
  onClose: () => void;
  isOpen: boolean;
  data: IDegree;
  degreeID: string;
}

const AddDegree = ({ onClose, isOpen, data, degreeID }: IAddDegree) => {
  const postDegree = useAddDegreeData();
  const updateDegree = useUpdateDegreeData();
  const store = useCommonStore();

  const handleSubmit = async (data: IDegreeRequest) => {
    await postDegree.mutateAsync(data);
    onClose();
    useCommonStore.getState().setEditMode(true);
  };

  const handleUpdate = async (data: IDegreeRequest) => {
    await updateDegree.mutateAsync({
      id: degreeID,
      data: data,
    });
    onClose();
  };

  return (
    <ModalComponent
      heading={<Text>{store.isEditMode ? 'Edit' : 'Add'} Degree</Text>}
      onClose={() => {
        onClose();
        useCommonStore.getState().setEditMode(true);
      }}
      isOpen={isOpen}
    >
      <FormWrapper<IDegreeRequest>
        validationSchema={DegreeFormValidation}
        defaultValues={store.isEditMode ? data : DegreeDefaultValues}
        onSubmit={store.isEditMode ? handleUpdate : handleSubmit}
      >
        <CreateUpdateForm />
        <ModalFooter p={0}>
          <FormFooterButton
            handleCancelClick={onClose}
            isFormSubmitting={updateDegree.isLoading || postDegree.isLoading}
            isCreateFlow={!store.isEditMode}
          />
        </ModalFooter>
      </FormWrapper>
    </ModalComponent>
  );
};

export default AddDegree;
