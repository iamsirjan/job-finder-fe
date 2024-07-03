import { Divider, VStack } from '@chakra-ui/react';
import Table from 'components/dataTable';
import { Layout } from 'components/layout/Layout';
import { PageHeader } from 'components/pageHeader';
import { useSentChatColumnn } from './TableAction';
import { useGetReceivedOffer } from 'service/service-offer-teacher';

const ChatReceivedTeacher = () => {
  const column = useSentChatColumnn();

  const { data: receivedData } = useGetReceivedOffer();

  // Type guard to ensure receivedData is always an array
  const data = Array.isArray(receivedData) ? receivedData : [];
  return (
    <Layout>
      <VStack h="inherit" spacing={0} bg="container.background">
        <PageHeader
          title="Job Request Received"
          search={false}
          filter={false}
        />
        <Divider mb={10} />
        <Table data={data} columns={column} />
      </VStack>
    </Layout>
  );
};

export default ChatReceivedTeacher;
