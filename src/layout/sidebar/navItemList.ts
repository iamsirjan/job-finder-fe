import { DashboardIcon } from '../../assets';
import { NAVIGATION_ROUTES } from '../../route/routes.constant';

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
    visible: true,
  },

  {
    name: 'Master Data',
    icon: DashboardIcon,
    to: NAVIGATION_ROUTES.MASTERDATA.STREAM,
    visible: true,
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

export { navItems };
