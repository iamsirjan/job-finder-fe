export const api = {
  login: 'user/login/',
  degree: 'dashboard/degree/',
  stream: 'dashboard/stream/',
};

export interface ApiResponse<T = any> {
  data: T;
  status: boolean;
  message: string;
}
