export const api = {
  login: 'user/login/',
  degree: 'dashboard/degree/',
  stream: 'dashboard/stream/',
  grade: 'dashboard/grade/',
  subject: 'dashboard/subject/',
  university: 'dashboard/university/',
};

export interface ApiResponse<T = any> {
  data: T;
  status: boolean;
  message: string;
}
