import { useRoutes } from 'react-router-dom';
import { NAVIGATION_ROUTES } from './routes.constant';
import { Suspense } from 'react';
import Register from '../pages/Register/common';
import { useAuthentication } from '../service/service-auth';
import { Center, Spinner } from '@chakra-ui/react';
import Home from '../pages/Home';
import Login from '../pages/login';
import Layout from 'layout';
import Dashboard from 'pages/Admin/Dashboard';
import Degree from 'pages/Admin/MasterData/Degree';
import Grade from 'pages/Admin/MasterData/Grade';
import Stream from 'pages/Admin/MasterData/Stream';
import Subject from 'pages/Admin/MasterData/Subject';
import University from 'pages/Admin/MasterData/University';
import TeacherRegistration from 'pages/Register/TeacherRegistration';
import { useGetUserDetails } from 'service/service-user';
import OrganizationStep from 'pages/Register/OrganizationRegistration';
import StudentStep from 'pages/Register/StudentRegistration';
import AgentStep from 'pages/Register/AgentRegistration';
import Vacancy from 'pages/Organization/Vacancy';
import AddVacancy from 'pages/Organization/Vacancy/AddVacancy';
import Staffs from 'pages/Staffs';
import Admission from 'pages/Admission';
import Education from 'pages/Education';
import CourseList from 'pages/Education/CourseList';
import LessonList from 'pages/Education/LessonList';

const adminRoutes = [
  {
    path: NAVIGATION_ROUTES.BASE,
    element: <Home />,
  },
  {
    path: NAVIGATION_ROUTES.STAFFS,
    element: <Staffs />,
  },
  {
    path: NAVIGATION_ROUTES.ADMISSION,
    element: <Admission />,
  },
  {
    path: NAVIGATION_ROUTES.EDUCATION,
    element: <Education />,
  },
  {
    path: NAVIGATION_ROUTES.COURSE,
    element: <CourseList />,
  },
  {
    path: NAVIGATION_ROUTES.LESSON,
    element: <LessonList />,
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
    path: NAVIGATION_ROUTES.VACANCY.GET,
    element: (
      <Layout>
        <Vacancy />
      </Layout>
    ),
  },
  {
    path: NAVIGATION_ROUTES.VACANCY.ADD,
    element: (
      <Layout>
        <AddVacancy />
      </Layout>
    ),
  },
  {
    path: NAVIGATION_ROUTES.MASTERDATA.STREAM,
    element: (
      <Layout>
        <Stream />
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
  {
    path: NAVIGATION_ROUTES.MASTERDATA.SUBJECT,
    element: (
      <Layout>
        <Subject />
      </Layout>
    ),
  },
  {
    path: NAVIGATION_ROUTES.MASTERDATA.UNIVERSITY,
    element: (
      <Layout>
        <University />
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
  {
    path: NAVIGATION_ROUTES.STAFFS,
    element: <Staffs />,
  },
  {
    path: NAVIGATION_ROUTES.ADMISSION,
    element: <Admission />,
  },
  {
    path: NAVIGATION_ROUTES.EDUCATION,
    element: <Education />,
  },
  {
    path: NAVIGATION_ROUTES.COURSE,
    element: <CourseList />,
  },
  {
    path: NAVIGATION_ROUTES.LESSON,
    element: <LessonList />,
  },
];

const teacherRegistrationRoute = [
  {
    path: NAVIGATION_ROUTES.BASE,
    element: <TeacherRegistration />,
  },
];

const organizationRegistrationRoute = [
  {
    path: NAVIGATION_ROUTES.BASE,
    element: <OrganizationStep />,
  },
];

const studentRegistrationRoute = [
  {
    path: NAVIGATION_ROUTES.BASE,
    element: <StudentStep />,
  },
];

const agentRegistrationRoute = [
  {
    path: NAVIGATION_ROUTES.BASE,
    element: <AgentStep />,
  },
];

const AppRoutes = () => {
  const { data: isAuthenticated, isLoading } = useAuthentication();
  const userDetails = useGetUserDetails();
  const isRegistered = userDetails.data?.is_registered;
  const is_teacher = userDetails.data?.is_teacher;
  const is_organization = userDetails.data?.is_organization;
  const is_student = userDetails.data?.is_student;
  const is_agent = userDetails.data?.is_agent;

  console.log(is_organization && !isRegistered);
  const routes = isAuthenticated
    ? is_teacher && !isRegistered
      ? teacherRegistrationRoute
      : is_organization && !isRegistered
        ? organizationRegistrationRoute
        : is_student && !isRegistered
          ? studentRegistrationRoute
          : is_agent && !isRegistered
            ? agentRegistrationRoute
            : adminRoutes
    : openRoutes;

  const element = useRoutes(routes);

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
