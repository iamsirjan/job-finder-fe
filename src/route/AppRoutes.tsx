import { useRoutes } from 'react-router-dom';
import { NAVIGATION_ROUTES } from './routes.constant';
import { Suspense } from 'react';
import Register from '../pages/Register/common';
import { useAuthentication } from '../service/service-auth';
import { Center, Spinner } from '@chakra-ui/react';
import Home from '../pages/Home';
import Login from '../pages/login';
import Layout from 'layout';
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
import Vacancy from 'pages/Vacancy';
import Staffs from 'pages/Staffs';
import Admission from 'pages/Admission';
import Education from 'pages/Education';
import CourseList from 'pages/Education/CourseList';
import LessonList from 'pages/Education/LessonList';
import ChatSent from 'pages/Organization/ChatSent';
import ChatReceived from 'pages/Organization/ChatReceived';
import ChatSentTeacher from 'pages/Teacher/Chat/ChatSent';
import ChatReceivedTeacher from 'pages/Teacher/Chat/ChatReceived';
import VacancyDetails from 'pages/VacancyDetails';
import TeacherDetails from 'pages/TeacherDetails';
import ApplicantDetails from 'pages/Applicant';
import Organization from 'pages/Admin/Organization';
import Teacher from 'pages/Admin/Teacher';
import TeacherCreate from 'pages/Admin/Teacher/TeacherCreate';
import EditOrganization from 'pages/Organization/EditOrganization';
import TeacherEdit from 'pages/Teacher/TeacherEdit';
import OrganizationDetails from 'pages/OrganizationDetails';
import VacancyAdmin from 'pages/Admin/Vacancy';
import AdminChatReceived from 'pages/Admin/JobRequest/ChatReceived';
import AdminChatSent from 'pages/Admin/JobRequest/ChatSent';
import ChatSection from 'pages/Chat';

const openRoutes = [
  {
    Path: NAVIGATION_ROUTES.MESSENGER,
    element: <ChatSection />,
  },
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
  {
    path: NAVIGATION_ROUTES.VACANCY.DETAILS,
    element: <VacancyDetails />,
  },
  {
    path: NAVIGATION_ROUTES.TEACHERDETAILS,
    element: <TeacherDetails />,
  },
  {
    path: NAVIGATION_ROUTES.ORGANIZATIONDETAILS,
    element: <OrganizationDetails />,
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

const teacherRoutes = [
  ...openRoutes,
  {
    Path: NAVIGATION_ROUTES.MESSENGER,
    element: <ChatSection />,
  },
  {
    path: NAVIGATION_ROUTES.DASHBOARD,
    element: (
      <Layout>
        <ChatSentTeacher />
      </Layout>
    ),
  },
  {
    path: NAVIGATION_ROUTES.CHATTEACHER.SENT,
    element: (
      <Layout>
        <ChatSentTeacher />
      </Layout>
    ),
  },

  {
    path: NAVIGATION_ROUTES.CHATTEACHER.RECEIVED,
    element: (
      <Layout>
        <ChatReceivedTeacher />
      </Layout>
    ),
  },
  {
    path: NAVIGATION_ROUTES.VACANCY.DETAILS,
    element: <VacancyDetails />,
  },
  {
    path: NAVIGATION_ROUTES.TEACHERDETAILS,
    element: <TeacherDetails />,
  },
  {
    path: NAVIGATION_ROUTES.APPLICANTDETAILS,
    element: <ApplicantDetails />,
  },
];

const organizationRoute = [
  ...openRoutes,
  {
    Path: NAVIGATION_ROUTES.MESSENGER,
    element: <ChatSection />,
  },
  {
    path: NAVIGATION_ROUTES.DASHBOARD,
    element: (
      <Layout>
        <Vacancy />
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
    path: NAVIGATION_ROUTES.CHAT.SENT,
    element: (
      <Layout>
        <ChatSent />
      </Layout>
    ),
  },
  {
    path: NAVIGATION_ROUTES.CHAT.RECEIVED,
    element: (
      <Layout>
        <ChatReceived />
      </Layout>
    ),
  },
  {
    path: NAVIGATION_ROUTES.VACANCY.DETAILS,
    element: <VacancyDetails />,
  },
  {
    path: NAVIGATION_ROUTES.TEACHERDETAILS,
    element: <TeacherDetails />,
  },
  {
    path: NAVIGATION_ROUTES.APPLICANTDETAILS,
    element: <ApplicantDetails />,
  },
];

const adminRoutes = [
  ...openRoutes,
  {
    path: NAVIGATION_ROUTES.MESSENGER,
    element: <ChatSection />,
  },

  {
    path: NAVIGATION_ROUTES.DASHBOARD,
    element: (
      <Layout>
        <Organization />
      </Layout>
    ),
  },
  {
    path: NAVIGATION_ROUTES.VACANCY.GET,
    element: (
      <Layout>
        <VacancyAdmin />
      </Layout>
    ),
  },
  {
    path: NAVIGATION_ROUTES.CHAT.RECEIVED,
    element: (
      <Layout>
        <AdminChatReceived />
      </Layout>
    ),
  },
  {
    path: NAVIGATION_ROUTES.CHAT.SENT,
    element: (
      <Layout>
        <AdminChatSent />
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

  {
    path: NAVIGATION_ROUTES.ADMIN.ORGANIZATION,
    element: (
      <Layout>
        <Organization />
      </Layout>
    ),
  },
  {
    path: NAVIGATION_ROUTES.ADMIN.TEACHER,
    element: (
      <Layout>
        <Teacher />
      </Layout>
    ),
  },
  {
    path: NAVIGATION_ROUTES.ADMIN.ADDTEACHER,
    element: (
      <Layout>
        <TeacherCreate />
      </Layout>
    ),
  },
  {
    path: NAVIGATION_ROUTES.ORGANIZATION.EDITORGANIZATION,
    element: (
      <Layout>
        <EditOrganization />
      </Layout>
    ),
  },
  {
    path: NAVIGATION_ROUTES.TEACHER.EDITTEACHER,
    element: (
      <Layout>
        <TeacherEdit />
      </Layout>
    ),
  },
  {
    path: NAVIGATION_ROUTES.VACANCY.DETAILS,
    element: <VacancyDetails />,
  },
  {
    path: NAVIGATION_ROUTES.TEACHERDETAILS,
    element: <TeacherDetails />,
  },
  {
    path: NAVIGATION_ROUTES.APPLICANTDETAILS,
    element: <ApplicantDetails />,
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
  const is_admin = userDetails.data?.is_superuser;

  const routes = isAuthenticated
    ? is_teacher && !isRegistered
      ? teacherRegistrationRoute
      : is_teacher
        ? teacherRoutes
        : is_organization && !isRegistered
          ? organizationRegistrationRoute
          : is_organization
            ? organizationRoute
            : is_admin
              ? adminRoutes
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
