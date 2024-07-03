import { Divider, VStack } from '@chakra-ui/react';
import Table from 'components/dataTable';
import { Layout } from 'components/layout/Layout';
import { PageHeader } from 'components/pageHeader';
import { useSentChatColumnn } from './TableAction';
import { useGetReceivedOffer } from 'service/service-offer-org';

const ChatReceived = () => {
  const column = useSentChatColumnn();

  const received = useGetReceivedOffer();
  return (
    <Layout>
      <VStack h="inherit" spacing={0} bg="container.background">
        <PageHeader
          title="Job Request Received"
          search={false}
          filter={false}
        />
        <Divider mb={10} />
        <Table data={received.data ?? []} columns={column} />
      </VStack>
    </Layout>
  );
};

export default ChatReceived;
