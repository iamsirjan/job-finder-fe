import { Divider, Text, VStack, useDisclosure } from '@chakra-ui/react';
import Table from 'components/dataTable';
import { Layout } from 'components/layout/Layout';
import { PageHeader } from 'components/pageHeader';
import { HoverComponent, useStreamColumn } from './TableAction';
import {
  useDeleteStreamData,
  useGetStreamList,
  useGetStreamListById,
} from 'service/master/service-stream';
import AddStream from './AddStream';
import ModalComponent from 'components/modal';
import { useState } from 'react';
import { StreamDefaultValues } from './constant';
import { useCommonStore } from 'state/common.state';

const Stream = () => {
  const column = useStreamColumn();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [streamId, setStreamId] = useState('');

  const dialogAction = useDisclosure();
  const { data: streamData } = useGetStreamList();
  const deleteStream = useDeleteStreamData();
  const getStreamByID = useGetStreamListById({
    onOpen: onOpen,
  });
  const onDelete = async () => {
    await deleteStream.mutateAsync({
      id: streamId,
    });
    dialogAction.onClose();
  };
  return (
    <Layout>
      <VStack h="inherit" spacing={0} bg="container.background">
        <PageHeader
          title="Stream"
          search={true}
          filter={true}
          button={'Create Stream'}
          onButtonClick={() => {
            useCommonStore.getState().setEditMode(false);
            onOpen();
          }}
        />
        <Divider mb={10} />
        <Table
          data={streamData?.results ?? []}
          columns={column}
          hoverComponent={(props) => (
            <HoverComponent
              {...props}
              onDelete={({ id }: { id: string }) => {
                setStreamId(id);
                dialogAction.onOpen();
              }}
              onEdit={async ({ id }: { id: string }) => {
                await getStreamByID.mutateAsync({
                  id: id,
                });
                useCommonStore.getState().setEditMode(true);
              }}
            />
          )}
        />
        <AddStream
          onClose={onClose}
          streamID={streamId}
          isOpen={isOpen}
          data={getStreamByID.data ?? StreamDefaultValues}
        />

        <ModalComponent
          isOpen={dialogAction.isOpen}
          onClose={dialogAction.onClose}
          heading={<Text>Delete Stream</Text>}
          primaryText="Delete"
          isLoading={deleteStream.isLoading}
          onApiCall={onDelete}
          secondaryText="Cancel"
          footer={true}
          variant="danger"
        >
          <Text variant="modal" color="secondary.700">
            Deleting a Stream will remove all the configured actions and
            relevant data. This action cannot be undone. Are you sure you want
            to proceed?
          </Text>
        </ModalComponent>
      </VStack>
    </Layout>
  );
};

export default Stream;
