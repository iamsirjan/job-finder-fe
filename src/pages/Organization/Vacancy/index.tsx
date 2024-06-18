import { Divider, VStack } from '@chakra-ui/react';
import Table from 'components/dataTable';
import { Layout } from 'components/layout/Layout';
import { PageHeader } from 'components/pageHeader';
import { useVacancyColumn } from './TableAction';
import { useNavigate } from 'react-router-dom';
import { NAVIGATION_ROUTES } from 'route/routes.constant';
import { useGetVacancyList } from 'service/vacancy/service-vacancy';

const Vacancy = () => {
  const column = useVacancyColumn();
  const navigate = useNavigate();
  const vacancy = useGetVacancyList();
  return (
    <Layout>
      <VStack h="inherit" spacing={0} bg="container.background">
        <PageHeader
          title="Vacancy"
          search={false}
          filter={false}
          button={'Create Vacancy'}
          onButtonClick={() => {
            navigate(NAVIGATION_ROUTES.VACANCY.ADD);
          }}
        />
        <Divider mb={10} />
        <Table data={vacancy.data?.data?.data ?? []} columns={column} />
      </VStack>
    </Layout>
  );
};

export default Vacancy;
