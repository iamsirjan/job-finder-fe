import { useGetUserDetails } from 'service/service-user';
import { DashboardIcon } from '../../assets';
import { NAVIGATION_ROUTES } from '../../route/routes.constant';

const useNavigationItems = () => {
  const userDetails = useGetUserDetails();
  const is_organization = userDetails.data?.is_organization ?? false;
  const is_teacher = userDetails.data?.is_teacher ?? false;
  const is_admin = userDetails.data?.is_superuser ?? false;

  const navItems = [
    {
      name: 'Dashboard',
      to: NAVIGATION_ROUTES.DASHBOARD,
      icon: DashboardIcon,
      visible: true,
    },
    {
      name: 'Vacancy',
      to: NAVIGATION_ROUTES.VACANCY.GET,
      icon: DashboardIcon,
      visible: is_organization,
    },
    {
      name: 'Matching Vacancy',
      to: NAVIGATION_ROUTES.MATCHINGVACANCY,
      icon: DashboardIcon,
      visible: is_teacher,
    },
    {
      name: 'Chat',
      icon: DashboardIcon,
      to: NAVIGATION_ROUTES.CHAT.SENT,
      visible: is_organization,

      child: [
        {
          name: 'Sent',
          to: NAVIGATION_ROUTES.CHAT.SENT,
          icon: DashboardIcon,
          visible: true,
        },
        {
          name: 'Received',
          to: NAVIGATION_ROUTES.CHAT.RECEIVED,
          icon: DashboardIcon,
          visible: true,
        },
      ],
    },
    {
      name: 'Chat',
      icon: DashboardIcon,
      to: NAVIGATION_ROUTES.CHATTEACHER.SENT,
      visible: is_teacher,
      child: [
        {
          name: 'Sent',
          to: NAVIGATION_ROUTES.CHATTEACHER.SENT,
          icon: DashboardIcon,
          visible: true,
        },
        {
          name: 'Received',
          to: NAVIGATION_ROUTES.CHATTEACHER.RECEIVED,
          icon: DashboardIcon,
          visible: true,
        },
      ],
    },
    {
      name: 'Master Data',
      icon: DashboardIcon,
      to: NAVIGATION_ROUTES.MASTERDATA.DEGREE,
      visible: is_admin,
      child: [
        {
          name: 'Degree',
          to: NAVIGATION_ROUTES.MASTERDATA.DEGREE,
          icon: DashboardIcon,
          visible: true,
        },
        {
          name: 'Grade',
          to: NAVIGATION_ROUTES.MASTERDATA.GRADE,
          icon: DashboardIcon,
          visible: true,
        },
        {
          name: 'Subject',
          to: NAVIGATION_ROUTES.MASTERDATA.SUBJECT,
          icon: DashboardIcon,
          visible: true,
        },
        {
          name: 'University',
          to: NAVIGATION_ROUTES.MASTERDATA.UNIVERSITY,
          icon: DashboardIcon,
          visible: true,
        },
      ],
    },
  ];

  return navItems;
};

export { useNavigationItems };
