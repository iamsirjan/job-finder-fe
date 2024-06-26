import { Divider, Text, VStack, useDisclosure } from '@chakra-ui/react';
import Table from 'components/dataTable';
import { Layout } from 'components/layout/Layout';
import { PageHeader } from 'components/pageHeader';
import { HoverComponent, useGradeColumn } from './TableAction';

import ModalComponent from 'components/modal';
import { useState } from 'react';
import { useCommonStore } from 'state/common.state';

import {
  useDeleteGradeData,
  useGetGradeList,
  useGetGradeListById,
} from 'service/master/service-grade';
import AddGrade from './AddGrade';
import { GradeDefaultValues } from './constant';

const Grade = () => {
  const column = useGradeColumn();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [gradeID, setgradeID] = useState('');

  const dialogAction = useDisclosure();
  const { data: gradeData } = useGetGradeList();
  const deleteDegree = useDeleteGradeData();
  const getGradeById = useGetGradeListById({
    onOpen: onOpen,
  });
  const onDelete = async () => {
    await deleteDegree.mutateAsync({
      id: gradeID,
    });
    dialogAction.onClose();
  };
  return (
    <Layout>
      <VStack h="inherit" spacing={0} bg="container.background">
        <PageHeader
          title="Grade"
          search={true}
          filter={true}
          button={'Create Grade'}
          onButtonClick={() => {
            useCommonStore.getState().setEditMode(false);
            onOpen();
          }}
        />
        <Divider mb={10} />
        <Table
          data={gradeData?.results ?? []}
          columns={column}
          hoverComponent={(props) => (
            <HoverComponent
              {...props}
              onDelete={({ id }: { id: string }) => {
                setgradeID(id);
                dialogAction.onOpen();
              }}
              onEdit={async ({ id }: { id: string }) => {
                await getGradeById.mutateAsync({
                  id: id,
                });
                useCommonStore.getState().setEditMode(true);
                setgradeID(id);
              }}
            />
          )}
        />
        <AddGrade
          onClose={onClose}
          gradeID={gradeID}
          isOpen={isOpen}
          data={getGradeById.data ?? GradeDefaultValues}
        />

        <ModalComponent
          isOpen={dialogAction.isOpen}
          onClose={dialogAction.onClose}
          heading={<Text>Delete Grade</Text>}
          primaryText="Delete"
          isLoading={deleteDegree.isLoading}
          onApiCall={onDelete}
          secondaryText="Cancel"
          footer={true}
          variant="danger"
        >
          <Text variant="modal" color="secondary.700">
            Deleting a Grade will remove all the configured actions and relevant
            data. This action cannot be undone. Are you sure you want to
            proceed?
          </Text>
        </ModalComponent>
      </VStack>
    </Layout>
  );
};

export default Grade;
