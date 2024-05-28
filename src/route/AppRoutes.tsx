import { useRoutes } from 'react-router-dom';
import { NAVIGATION_ROUTES } from './routes.constant';
import { Suspense } from 'react';
import Register from '../pages/Register';
import { useAuthentication } from '../service/service-auth';
import { Center, Spinner } from '@chakra-ui/react';
import Home from '../pages/Home';
import Login from '../pages/login';
import Layout from 'layout';
import Dashboard from 'pages/Admin/Dashboard';
import Degree from 'pages/Admin/MasterData/Degree';
import Grade from 'pages/Admin/MasterData/Grade';
// import Layout from '../layout';

const adminRoutes = [
  {
    path: NAVIGATION_ROUTES.BASE,
    element: <Home />,
  },
  {
    path: NAVIGATION_ROUTES.DASHBOARD,
    element: (
      <Layout>
        <Dashboard />
      </Layout>
    ),
  },
  {
    path: NAVIGATION_ROUTES.MASTERDATA.DEGREE,
    element: (
      <Layout>
        <Degree />
      </Layout>
    ),
  },
  {
    path: NAVIGATION_ROUTES.MASTERDATA.GRADE,
    element: (
      <Layout>
        <Grade />
      </Layout>
    ),
  },
];

const openRoutes = [
  {
    path: NAVIGATION_ROUTES.REGISTER,
    element: <Register />,
  },
  {
    path: NAVIGATION_ROUTES.LOGIN,
    element: <Login />,
  },
  {
    path: NAVIGATION_ROUTES.BASE,
    element: <Home />,
  },
];
// const protectedRoutes = [];

const AppRoutes = () => {
  const { data: isAuthenticated, isLoading } = useAuthentication();

  const element = useRoutes(isAuthenticated ? adminRoutes : openRoutes);

  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner />
      </Center>
    );
  }

  return <Suspense fallback={<Spinner />}>{element}</Suspense>;
};

export default AppRoutes;
