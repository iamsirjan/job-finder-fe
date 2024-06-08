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
    registerStepFirst: 'teacher/register-teacher-step1/',
    registerStepSecond: 'teacher/register-teacher-step2/',
  },
};

export interface ApiResponse<T = any> {
  data: T;
  status: boolean;
  message: string;
}
