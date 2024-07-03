import { Divider, VStack } from '@chakra-ui/react';
import Table from 'components/dataTable';
import { Layout } from 'components/layout/Layout';
import { PageHeader } from 'components/pageHeader';
import { useGetMatchingColumn } from './TableAction';
import { useGetMatchingVacancyList } from 'service/service-matching-vacancy';

const MatchingVacancy = () => {
  const column = useGetMatchingColumn();

  const { data: matchingData } = useGetMatchingVacancyList();

  const data = Array.isArray(matchingData?.data) ? matchingData.data : [];

  return (
    <Layout>
      <VStack h="inherit" spacing={0} bg="container.background">
        <PageHeader title="Matching Vacancy" search={false} filter={false} />
        <Divider mb={10} />
        <Table columns={column} data={data} />
      </VStack>
    </Layout>
  );
};

export default MatchingVacancy;
