import {
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import Table from 'components/dataTable';
import { Layout } from 'components/layout/Layout';
import { PageHeader } from 'components/pageHeader';
import { HoverComponent, useVacancyColumn } from './TableAction';
import {
  useAddVacancyData,
  useDeleteVacancyData,
  useGetVacancyList,
  useUpdateVacancyData,
} from 'service/vacancy/service-vacancy';
import { useState } from 'react';
import ModalComponent from 'components/modal';
import { FormWrapper } from 'components/form/FormWrapper';
import { IvacancyRequest } from './interface';
import { useGetOrgDetails } from 'service/service-organization-register';
import { useCommonStore } from 'state/common.state';
import { VacancyDefaultValues, VacancyFormValidation } from './constant';
import FormFooterButton from 'components/form/FormButton';
import CreateUpdateForm from './CreateUpdateForm';

const VacancyAdmin = () => {
  const column = useVacancyColumn();
  const [id, setId] = useState('');
  const deleteVacancy = useDeleteVacancyData();
  const dialogAction = useDisclosure();
  const postvacancy = useAddVacancyData({
    redirect: false,
  });
  const orgdetails = useGetOrgDetails();
  const updateVacancy = useUpdateVacancyData();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: vacancy } = useGetVacancyList();
  const data = Array.isArray(vacancy)
    ? vacancy.filter((data) => data.is_admin_created)
    : [];

  const store = useCommonStore();
  const onDelete = async () => {
    await deleteVacancy.mutateAsync({
      id: id,
    });
    dialogAction.onClose();
  };

  const handleSubmit = async (data: IvacancyRequest) => {
    const vacancyData = {
      ...data,
      from_date: new Date(data.from_date).toISOString().split('T')[0],
      to_date: new Date(data.to_date).toISOString().split('T')[0],
    };
    await postvacancy.mutateAsync(vacancyData);
    useCommonStore.getState().setEditMode(false);
    onClose();
  };

  // const handleUpdate = async (data: IvacancyRequest) => {
  //   await updateVacancy.mutateAsync({
  //     id: orgdetails.data?.organization_detail.id ?? '',
  //     data: data,
  //   });
  // };
  return (
    <Layout>
      <VStack h="inherit" spacing={0} bg="container.background">
        <PageHeader
          title="Vacancy"
          search={false}
          filter={false}
          button={'Create Vacancy'}
          onButtonClick={() => {
            onOpen();
          }}
        />
        <Divider mb={10} />
        <Table
          data={data}
          columns={column}
          hoverComponent={(props) => (
            <HoverComponent
              {...props}
              onDelete={({ id }: { id: string }) => {
                setId(id);
                dialogAction.onOpen();
              }}
              onEdit={({ id }: { id: string }) => console.log(id)}
            />
          )}
        />
        <Drawer isOpen={isOpen} placement="right" size={'lg'} onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Edit Vacancy</DrawerHeader>
            <FormWrapper<IvacancyRequest>
              validationSchema={VacancyFormValidation}
              defaultValues={VacancyDefaultValues}
              onSubmit={handleSubmit}
            >
              <DrawerBody>
                <CreateUpdateForm />{' '}
              </DrawerBody>

              <DrawerFooter>
                <Box>
                  <FormFooterButton
                    handleCancelClick={() => onClose()}
                    isFormSubmitting={updateVacancy.isLoading}
                    isCreateFlow={!store.isEditMode}
                  />
                </Box>
              </DrawerFooter>
            </FormWrapper>
          </DrawerContent>
        </Drawer>
        <ModalComponent
          isOpen={dialogAction.isOpen}
          onClose={dialogAction.onClose}
          heading={<Text>Delete Vacancy</Text>}
          primaryText="Delete"
          isLoading={deleteVacancy.isLoading}
          onApiCall={onDelete}
          secondaryText="Cancel"
          footer={true}
          variant="danger"
        >
          <Text variant="modal" color="secondary.700">
            Deleting a Vacancy will remove all the configured actions and
            relevant data. This action cannot be undone. Are you sure you want
            to proceed?
          </Text>
        </ModalComponent>
      </VStack>
    </Layout>
  );
};

export default VacancyAdmin;
