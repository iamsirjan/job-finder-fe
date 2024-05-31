import { Divider, Text, VStack, useDisclosure } from '@chakra-ui/react';
import Table from 'components/dataTable';
import { Layout } from 'components/layout/Layout';
import { PageHeader } from 'components/pageHeader';
import { HoverComponent, useUniversityColumn } from './TableAction';

import ModalComponent from 'components/modal';
import { useState } from 'react';
import { useCommonStore } from 'state/common.state';

import {
  useDeleteUniversityData,
  useGetUniversityList,
  useGetUniversityListById,
} from 'service/master/service-university';
import AddUniversity from './AddUniversity';
import { UniversityDefaultValues } from './constant';

const University = () => {
  const column = useUniversityColumn();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [universityID, setuniversityID] = useState('');

  const dialogAction = useDisclosure();
  const { data: universityData } = useGetUniversityList();
  const deleteUniversity = useDeleteUniversityData();
  const getUniversityById = useGetUniversityListById({
    onOpen: onOpen,
  });
  const onDelete = async () => {
    await deleteUniversity.mutateAsync({
      id: universityID,
    });
    dialogAction.onClose();
  };
  return (
    <Layout>
      <VStack h="inherit" spacing={0} bg="container.background">
        <PageHeader
          title="University"
          search={true}
          filter={true}
          button={'Create University'}
          onButtonClick={() => {
            useCommonStore.getState().setEditMode(false);
            onOpen();
          }}
        />
        <Divider mb={10} />
        <Table
          data={universityData?.results ?? []}
          columns={column}
          hoverComponent={(props) => (
            <HoverComponent
              {...props}
              onDelete={({ id }: { id: string }) => {
                setuniversityID(id);
                dialogAction.onOpen();
              }}
              onEdit={async ({ id }: { id: string }) => {
                await getUniversityById.mutateAsync({
                  id: id,
                });
                useCommonStore.getState().setEditMode(true);
                setuniversityID(id);
              }}
            />
          )}
        />
        <AddUniversity
          onClose={onClose}
          universityID={universityID}
          isOpen={isOpen}
          data={getUniversityById.data ?? UniversityDefaultValues}
        />

        <ModalComponent
          isOpen={dialogAction.isOpen}
          onClose={dialogAction.onClose}
          heading={<Text>Delete University</Text>}
          primaryText="Delete"
          isLoading={deleteUniversity.isLoading}
          onApiCall={onDelete}
          secondaryText="Cancel"
          footer={true}
          variant="danger"
        >
          <Text variant="modal" color="secondary.700">
            Deleting a University will remove all the configured actions and
            relevant data. This action cannot be undone. Are you sure you want
            to proceed?
          </Text>
        </ModalComponent>
      </VStack>
    </Layout>
  );
};

export default University;
