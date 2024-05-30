import { Divider, Text, VStack, useDisclosure } from '@chakra-ui/react';
import Table from 'components/dataTable';
import { Layout } from 'components/layout/Layout';
import { PageHeader } from 'components/pageHeader';
import { HoverComponent, useDegreeColumn } from './TableAction';
import ModalComponent from 'components/modal';
import { useState } from 'react';
import { useCommonStore } from 'state/common.state';
import {
  useDeleteDegreeData,
  useGetDegreeList,
  useGetDegreeListById,
} from 'service/master/service-degree';
import AddDegree from './AddDegree';
import { DegreeDefaultValues } from './constant';

const Degree = () => {
  const column = useDegreeColumn();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [degreeId, setdegreeId] = useState('');

  const dialogAction = useDisclosure();
  const { data: degreeData } = useGetDegreeList();
  const deleteDegree = useDeleteDegreeData();
  const getDegreeByID = useGetDegreeListById({
    onOpen: onOpen,
  });
  const onDelete = async () => {
    await deleteDegree.mutateAsync({
      id: degreeId,
    });
    dialogAction.onClose();
  };
  return (
    <Layout>
      <VStack h="inherit" spacing={0} bg="container.background">
        <PageHeader
          title="Degree"
          search={true}
          filter={true}
          button={'Create Degree'}
          onButtonClick={() => {
            useCommonStore.getState().setEditMode(false);
            onOpen();
          }}
        />
        <Divider mb={10} />
        <Table
          data={degreeData?.results ?? []}
          columns={column}
          hoverComponent={(props) => (
            <HoverComponent
              {...props}
              onDelete={({ id }: { id: string }) => {
                setdegreeId(id);
                dialogAction.onOpen();
              }}
              onEdit={async ({ id }: { id: string }) => {
                await getDegreeByID.mutateAsync({
                  id: id,
                });
                useCommonStore.getState().setEditMode(true);
                setdegreeId(id);
              }}
            />
          )}
        />
        <AddDegree
          onClose={onClose}
          degreeID={degreeId}
          isOpen={isOpen}
          data={getDegreeByID.data ?? DegreeDefaultValues}
        />

        <ModalComponent
          isOpen={dialogAction.isOpen}
          onClose={dialogAction.onClose}
          heading={<Text>Delete Degree</Text>}
          primaryText="Delete"
          isLoading={deleteDegree.isLoading}
          onApiCall={onDelete}
          secondaryText="Cancel"
          footer={true}
          variant="danger"
        >
          <Text variant="modal" color="secondary.700">
            Deleting a Degree will remove all the configured actions and
            relevant data. This action cannot be undone. Are you sure you want
            to proceed?
          </Text>
        </ModalComponent>
      </VStack>
    </Layout>
  );
};

export default Degree;
