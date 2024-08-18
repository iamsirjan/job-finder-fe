export const NAVIGATION_ROUTES = {
  BASE: '/',
  SERVICE: '/service',
  ADMISSION: '/admission',
  EDUCATION: '/education',
  COURSE: '/education/courses/:id',
  LESSON: '/education/courses/:id/lessons/:lid',
  STAFFS: '/staffs',
  REGISTER: '/register',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  MASTERDATA: {
    DEGREE: '/degree',
    GRADE: '/grade',
    STREAM: '/stream',
    SUBJECT: '/subject',
    UNIVERSITY: '/university',
  },
  ADMIN: {
    ORGANIZATION: '/organization',
    TEACHER: '/teacher',
    EDITORGANIZATION: '/organization/update/:id',
    ADDTEACHER: '/teacher/create',
    EDITTEACHER: '/teacher/update/:id',
  },

  VACANCY: {
    GET: '/vacancy',
    ADD: '/vacancy/add-vacancy',
    DETAILS: '/vacancy/vacancy-details/:id',
  },
  CHAT: {
    SENT: '/chat/job-request-sent',
    RECEIVED: '/chat/job-request-received',
  },
  CHATTEACHER: {
    SENT: '/job-request-sent-teacher',
    RECEIVED: '/job-request-received-teacher',
  },
  TEACHERDETAILS: '/staffs/staff-details/:id',
  APPLICANTDETAILS: '/applicant/:id',
  ORGANIZATIONDETAILS: '/organization/:id',
  MATCHINGTEACHER: '/matching-teacher',

  ORGANIZATION: {
    EDITORGANIZATION: '/organization/edit/:id',
  },
  TEACHER: {
    EDITTEACHER: '/teacher/edit/:id',
  },
  MESSENGER: '/messenger',
};
