export const api = {
  login: 'user/login/',
  registerUser: 'user/user-register/',
  uploadProfile: 'user/upload-profile-pic/',
  userDetails: 'user/user-details/',
  degree: 'dashboard/degree/',
  allDegree: 'teacher/get-all-degree/',
  allSubject: 'teacher/get-all-subject/',
  allGrade: 'teacher/get-all-grade/',
  stream: 'dashboard/stream/',
  grade: 'dashboard/grade/',
  subject: 'dashboard/subject/',
  university: 'dashboard/university/',
  teacher: {
    registerStepFirst: 'teacher/register-teacher-step-1/',
    registerStepSecond: 'teacher/register-teacher-step-2/',
    teacherDetails: 'teacher/teacher-detail/',
    applyVacancy: 'teacher/vacancy-apply/',
    getAllTeacherDetails: 'teacher/get-all-teacher-details/',
    appliedVacancy: 'teacher/get-applied-vacancy/',
    jobOffer: 'teacher/job-offer/',
    getMatchingVacancy: 'teacher/get-matching-vacancy/',
  },
  organization: {
    registerOrganizationStepFirst:
      '/organization/register-organization-step-1/',
    registerOrganizationStepSecond:
      '/organization/register-organization-step-2/',
    registerOrganizationStepThird:
      '/organization/register-organization-step-3/',
    registerOrganizationStepFourth:
      '/organization/register-organization-step-4/',
    sendOffer: '/organization/job-offer/',
    sentOffer: '/organization/job-offer/',
    receivedOffer: '/organization/get-all-teacher-vacancy-application/',
  },
  student: {
    registerStudentStepFirst: '/student/student-register-step-1/',
    registerStudentStepSecond: '/student/student-register-step-2/',
  },
  agent: {
    registerAgentStepFirst: '/organization/register-agent-step-1/',
    registerAgentStepSecond: '/organization/register-agent-step-2/',
  },
  location: {
    district: '/common/district/',
    municipality: '/common/municipality',
    province: '/common/province',
  },

  vacancy: '/organization/vacancy/',
};

export interface ApiResponse<T = any> {
  data: T;
  status: boolean;
  message: string;
}
