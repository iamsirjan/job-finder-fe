import { Divider, Text, VStack, useDisclosure } from '@chakra-ui/react';
import Table from 'components/dataTable';
import { Layout } from 'components/layout/Layout';
import { PageHeader } from 'components/pageHeader';
import { HoverComponent, useSubjectColumn } from './TableAction';

import ModalComponent from 'components/modal';
import { useState } from 'react';
import { useCommonStore } from 'state/common.state';
import {
  useDeleteSubjectData,
  useGetSubjectList,
  useGetSubjectListById,
} from 'service/master/service-subject';
import { SubjectDefaultValues } from './constant';
import AddSubject from './AddSubject';

const Subject = () => {
  const column = useSubjectColumn();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [subjectID, setsubjectID] = useState('');

  const dialogAction = useDisclosure();
  const { data: subjectData } = useGetSubjectList();
  const deleteSubject = useDeleteSubjectData();
  const getSubjectById = useGetSubjectListById({
    onOpen: onOpen,
  });
  const onDelete = async () => {
    await deleteSubject.mutateAsync({
      id: subjectID,
    });
    dialogAction.onClose();
  };
  return (
    <Layout>
      <VStack h="inherit" spacing={0} bg="container.background">
        <PageHeader
          title="Subject"
          search={true}
          filter={true}
          button={'Create Subject'}
          onButtonClick={() => {
            useCommonStore.getState().setEditMode(false);
            onOpen();
          }}
        />
        <Divider mb={10} />
        <Table
          data={subjectData?.results ?? []}
          columns={column}
          hoverComponent={(props) => (
            <HoverComponent
              {...props}
              onDelete={({ id }: { id: string }) => {
                setsubjectID(id);
                dialogAction.onOpen();
              }}
              onEdit={async ({ id }: { id: string }) => {
                await getSubjectById.mutateAsync({
                  id: id,
                });
                useCommonStore.getState().setEditMode(true);
                setsubjectID(id);
              }}
            />
          )}
        />
        <AddSubject
          onClose={onClose}
          subjectID={subjectID}
          isOpen={isOpen}
          data={getSubjectById.data ?? SubjectDefaultValues}
        />

        <ModalComponent
          isOpen={dialogAction.isOpen}
          onClose={dialogAction.onClose}
          heading={<Text>Delete Subject</Text>}
          primaryText="Delete"
          isLoading={deleteSubject.isLoading}
          onApiCall={onDelete}
          secondaryText="Cancel"
          footer={true}
          variant="danger"
        >
          <Text variant="modal" color="secondary.700">
            Deleting a Subject will remove all the configured actions and
            relevant data. This action cannot be undone. Are you sure you want
            to proceed?
          </Text>
        </ModalComponent>
      </VStack>
    </Layout>
  );
};

export default Subject;
