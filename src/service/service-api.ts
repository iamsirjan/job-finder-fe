export const api = {
  login: 'user/login/',
  degree: 'dashboard/degree/',
};

export interface ApiResponse<T = any> {
  data: T;
  status: boolean;
  message: string;
}
