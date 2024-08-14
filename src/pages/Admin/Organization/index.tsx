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
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import Table from 'components/dataTable';
import { Layout } from 'components/layout/Layout';
import { PageHeader } from 'components/pageHeader';
import {
  useGetAllOrganization,
  useRegisterOrganizationStepFirst,
} from 'service/service-organization-register';
import { useOrgColumn } from './TableAction';
import { FormWrapper } from 'components/form/FormWrapper';
import FormFooterButton from 'components/form/FormButton';
import {
  CombinedDefaultValues,
  CombinedFormValidation,
} from './OrgCreate/constant';
import UserFormFields from './OrgCreate/UserFormField';
import OrgFormFields from './OrgCreate/OrgFormField';
import { IOrgFirstStep } from 'pages/Register/OrganizationRegistration/firstStep/interface';
import {
  IRegisterUserRequest,
  useRegisterUser,
} from 'service/service-register-common';
import { useCommonStore } from 'state/common.state';
import {
  VacancyDefaultValues,
  VacancyFormValidation,
} from 'pages/Admin/Vacancy/constant';
import CreateUpdateForm from 'pages/Admin/Vacancy/CreateUpdateForm';
import { IvacancyRequest } from 'pages/Admin/Vacancy/interface';
import { useAddVacancyData } from 'service/vacancy/service-vacancy';

interface Form {
  user: IRegisterUserRequest;
  org: IOrgFirstStep;
}

const Organization = () => {
  const data = useGetAllOrganization();
  const column = useOrgColumn();
  const { isDrawerOpen, orgID } = useCommonStore();
  const postvacancy = useAddVacancyData({
    redirect: false,
  });

  const { isOpen, onClose, onOpen } = useDisclosure();
  const registerUser = useRegisterUser({
    redirect: false,
  });
  const firstStep = useRegisterOrganizationStepFirst();

  const handleSubmit = async (data: Form) => {
    const user = await registerUser.mutateAsync(data.user);
    await firstStep.mutateAsync({
      id: user.data.data.id,
      body: data.org,
    });
    onClose();
  };

  const handleSubmitVacancy = async (data: IvacancyRequest) => {
    const vacancyData = {
      organization: orgID,
      ...data,
      from_date: new Date(data.from_date).toISOString().split('T')[0],
      to_date: new Date(data.to_date).toISOString().split('T')[0],
    };
    await postvacancy.mutateAsync(vacancyData);
    useCommonStore.getState().setDrawer(false);
  };

  return (
    <Layout>
      <VStack h="inherit" spacing={0} bg="container.background">
        <PageHeader
          title="Organization"
          search={false}
          filter={false}
          button={'Create Organization'}
          onButtonClick={onOpen}
        />
        <Divider mb={10} />

        <Table
          data={
            data.data?.filter(
              (data) => data.organization_detail.is_admin_created,
            ) ?? []
          }
          columns={column}
        />
        <Drawer isOpen={isOpen} placement="right" size={'md'} onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent display="flex" flexDirection="column" height="100%">
            <DrawerCloseButton />
            <DrawerHeader>Create Organization</DrawerHeader>
            <Divider />
            <FormWrapper<Form>
              validationSchema={CombinedFormValidation}
              defaultValues={CombinedDefaultValues}
              onSubmit={handleSubmit}
            >
              <DrawerBody flex="1" mt={5} maxHeight={'80vh'} overflowY="scroll">
                <VStack gap={4}>
                  <UserFormFields />
                  <Divider />
                  <OrgFormFields />
                </VStack>
              </DrawerBody>
              <DrawerFooter position={'fixed'} bottom={0}>
                <FormFooterButton
                  handleCancelClick={onClose}
                  isFormSubmitting={false}
                  isCreateFlow={true}
                />
              </DrawerFooter>
            </FormWrapper>
          </DrawerContent>
        </Drawer>

        <Drawer
          isOpen={isDrawerOpen}
          placement="right"
          size={'lg'}
          onClose={() => {
            useCommonStore.getState().setDrawer(false);
          }}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Create Vacancy</DrawerHeader>
            <FormWrapper<IvacancyRequest>
              validationSchema={VacancyFormValidation}
              defaultValues={VacancyDefaultValues}
              onSubmit={handleSubmitVacancy}
            >
              <DrawerBody>
                <CreateUpdateForm />{' '}
              </DrawerBody>

              <DrawerFooter>
                <Box>
                  <FormFooterButton
                    handleCancelClick={() => {
                      useCommonStore.getState().setDrawer(false);
                    }}
                    isFormSubmitting={false}
                    isCreateFlow={true}
                  />
                </Box>
              </DrawerFooter>
            </FormWrapper>
          </DrawerContent>
        </Drawer>
      </VStack>
    </Layout>
  );
};

export default Organization;
