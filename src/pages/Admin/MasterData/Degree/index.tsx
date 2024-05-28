import { Divider, VStack } from '@chakra-ui/react';
import Table from 'components/dataTable';
import { Layout } from 'components/layout/Layout';
import { PageHeader } from 'components/pageHeader';
import { HoverComponent, useDegreeColumn } from './TableAction';
import { useGetDegreeList } from 'service/master/service-degree';

const Degree = () => {
  const column = useDegreeColumn();
  const degree = useGetDegreeList();
  console.log(degree);
  const data = [
    {
      id: '1',
      stream: 'science',
      name: 'Master',
    },
  ];

  const onDelete = ({ id, name }: { id: string; name: string }) => {
    //
  };

  return (
    <Layout>
      <VStack h="inherit" spacing={0} bg="container.background">
        <PageHeader
          title="Degree"
          search={true}
          filter={true}
          button={'Create Degree'}
          onButtonClick={() => {}}
        />
        <Divider mb={10} />
        <Table
          data={data ?? []}
          columns={column}
          hoverComponent={(props) => (
            <HoverComponent {...props} onDelete={onDelete} />
          )}
        />
      </VStack>
    </Layout>
  );
};

export default Degree;
