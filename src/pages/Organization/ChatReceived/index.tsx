import { Divider, Text, VStack, useDisclosure } from '@chakra-ui/react';
import Table from 'components/dataTable';
import { Layout } from 'components/layout/Layout';
import { PageHeader } from 'components/pageHeader';
import { HoverComponent, useSentChatColumnn } from './TableAction';
import { VacancyStatus, useGetReceivedOffer } from 'service/service-offer-org';
import {
  useAcceptVacancy,
  useRejectVacancy,
  useUpdateStatus,
} from 'service/service-change-status';
import { useState } from 'react';
import {
  IStatusChange,
  StatusDefaultValue,
  StatusValidation,
} from '../ChatSent/constant';
import ModalComponent from 'components/modal';
import { FormWrapper } from 'components/form/FormWrapper';
import StatusForm from '../ChatSent/form';
import FormFooterButton from 'components/form/FormButton';

const ChatReceived = () => {
  const column = useSentChatColumnn();

  const received = useGetReceivedOffer();

  const { isOpen, onOpen, onClose } = useDisclosure();
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
        <PageHeader
          title="Job Request Received"
          search={false}
          filter={false}
        />
        <Divider mb={10} />
        <Table
          data={received.data ?? []}
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
              isFormSubmitting={false}
            />
          </FormWrapper>
        </ModalComponent>
      </VStack>
    </Layout>
  );
};

export default ChatReceived;
