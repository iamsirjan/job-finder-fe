import { Divider, Text, VStack, useDisclosure } from '@chakra-ui/react';
import Table from 'components/dataTable';
import { Layout } from 'components/layout/Layout';
import { PageHeader } from 'components/pageHeader';
import { HoverComponent, useSentChatColumnn } from './TableAction';
import {
  VacancyStatus,
  useGetSentApplicationAdmin,
} from 'service/service-offer-org';
import ModalComponent from 'components/modal';
import { FormWrapper } from 'components/form/FormWrapper';
import {
  IStatusChange,
  StatusDefaultValue,
  StatusValidation,
} from './constant';
import { useState } from 'react';
import StatusForm from './form';
import FormFooterButton from 'components/form/FormButton';
import {
  useAcceptVacancy,
  useRejectVacancy,
  useUpdateStatus,
} from 'service/service-change-status';

const AdminChatSent = () => {
  const column = useSentChatColumnn();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const sent = useGetSentApplicationAdmin();
  const rejectApplication = useRejectVacancy();
  const acceptApplication = useAcceptVacancy();
  const updateStatus = useUpdateStatus();
  const [vacancy, setVacancy] = useState('');

  const handleSubmit = async (data: IStatusChange) => {
    await updateStatus.mutateAsync({
      id: vacancy,
      status: data.status,
    });
    if (data.status === VacancyStatus.REJECTED) {
      await rejectApplication.mutateAsync({
        message: data.message,
        id: vacancy,
      });
    } else if (data.status === VacancyStatus.APPROVED) {
      await acceptApplication.mutateAsync({
        id: vacancy,
        time: data.time,
        date: data.date,
      });
    }

    onClose();
  };
  return (
    <Layout>
      <VStack h="inherit" spacing={0} bg="container.background">
        <PageHeader title="Job Request Sent" search={false} filter={false} />
        <Divider mb={10} />
        <Table
          data={sent.data ?? []}
          columns={column}
          hoverComponent={(props) => (
            <HoverComponent
              {...props}
              onStatusChange={({ id }: { id: string }) => {
                setVacancy(id);
                onOpen();
              }}
            />
          )}
        />
        <ModalComponent
          heading={<Text>change status</Text>}
          isOpen={isOpen}
          onClose={onClose}
        >
          <FormWrapper<IStatusChange>
            defaultValues={StatusDefaultValue}
            validationSchema={StatusValidation}
            onSubmit={handleSubmit}
          >
            <StatusForm />
            <FormFooterButton
              isCreateFlow={true}
              handleCancelClick={onClose}
              isFormSubmitting={
                updateStatus.isLoading ||
                rejectApplication.isLoading ||
                acceptApplication.isLoading
              }
            />
          </FormWrapper>
        </ModalComponent>
      </VStack>
    </Layout>
  );
};

export default AdminChatSent;
