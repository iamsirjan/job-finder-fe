import { FormWrapper } from 'components/form/FormWrapper';

import { useCommonStore } from 'state/common.state';
import { VacancyDefaultValues, VacancyFormValidation } from './constant';
import CreateUpdateForm from './CreateUpdateForm';

import { IvacancyRequest } from './interface';
import { VStack } from '@chakra-ui/react';
import { Layout } from 'components/layout/Layout';
import FormFooterButton from 'components/form/FormButton';
import { useNavigate } from 'react-router-dom';
import {
  useAddVacancyData,
  useUpdateVacancyData,
} from 'service/vacancy/service-vacancy';

const AddVacancy = () => {
  const store = useCommonStore();
  const navigate = useNavigate();
  const postvacancy = useAddVacancyData();
  const updateVacancy = useUpdateVacancyData();
  const handleSubmit = async (data: IvacancyRequest) => {
    const vacancyData = {
      organization: '1',
      ...data,
      from_date: new Date(data.from_date).toISOString().split('T')[0],
      to_date: new Date(data.to_date).toISOString().split('T')[0],
    };
    await postvacancy.mutateAsync(vacancyData);
    useCommonStore.getState().setEditMode(true);
  };

  const handleUpdate = async (data: IvacancyRequest) => {
    await updateVacancy.mutateAsync({
      id: '1',
      data: data,
    });
  };

  return (
    <Layout>
      <VStack minH="inherit" spacing={0} bg="container.background" p={4}>
        <FormWrapper<IvacancyRequest>
          validationSchema={VacancyFormValidation}
          defaultValues={VacancyDefaultValues}
          // store.isEditMode ? data :
          onSubmit={store.isEditMode ? handleUpdate : handleSubmit}
        >
          <CreateUpdateForm />
          <FormFooterButton
            handleCancelClick={() => navigate(-1)}
            isFormSubmitting={postvacancy.isLoading || updateVacancy.isLoading}
            isCreateFlow={!store.isEditMode}
          />
        </FormWrapper>
      </VStack>
    </Layout>
  );
};

export default AddVacancy;
