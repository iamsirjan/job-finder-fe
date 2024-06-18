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

  VACANCY: {
    GET: '/vacancy',
    ADD: '/vacancy/add-vacancy',
  },
};
