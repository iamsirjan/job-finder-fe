import { Divider, VStack } from '@chakra-ui/react';
import { Layout } from 'components/layout/Layout';
import { PageHeader } from 'components/pageHeader';
import { useGetAllTeacherList } from 'service/service-teacher-register';
import { useTeacherColumn } from './TableAction';
import Table from 'components/dataTable';
import { useNavigate } from 'react-router-dom';
import { NAVIGATION_ROUTES } from 'route/routes.constant';

const Teacher = () => {
  const data = useGetAllTeacherList();
  const column = useTeacherColumn();
  const navigate = useNavigate();

  return (
    <Layout>
      <VStack h="inherit" spacing={0} bg="container.background">
        <PageHeader
          title="Teacher"
          search={false}
          filter={false}
          button={'Create Teacher'}
          onButtonClick={() => navigate(NAVIGATION_ROUTES.ADMIN.ADDTEACHER)}
        />
        <Divider mb={10} />

        <Table
          data={
            data.data?.filter((data) => data.teacher.is_admin_created) ?? []
          }
          columns={column}
        />
      </VStack>
    </Layout>
  );
};

export default Teacher;
