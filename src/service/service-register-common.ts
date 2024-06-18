import { useMutation } from 'react-query';
import { ApiResponse, api } from './service-api';
import { HttpClient } from './service-axios';
import { toastFail, toastSuccess } from './service-toast';
import { AxiosError } from 'axios';
import { extractErrorMessage } from 'utils/errorHandler';
import { useNavigate } from 'react-router-dom';
import { NAVIGATION_ROUTES } from 'route/routes.constant';

export interface IRegisterUserRequest {
  phone: string;
  email: string;
  address: string;
  password: string;
  confirm_password: string;
  user_type: string;
}

export const USERTYPE = [
  {
    label: 'Student',
    value: '1',
  },
  {
    label: 'Teacher',
    value: '2',
  },
  {
    label: 'Organization',
    value: '3',
  },
  {
    label: 'Agent',
    value: '4',
  },
];

const registerUser = async (body: IRegisterUserRequest) => {
  const response = await HttpClient.post<ApiResponse<IRegisterUserRequest>>(
    api.registerUser,
    body,
  );
  return response;
};

export const useRegisterUser = () => {
  const navigate = useNavigate();
  return useMutation(registerUser, {
    onSuccess: () => {
      toastSuccess('user registered successfully');
      navigate(NAVIGATION_ROUTES.LOGIN);
    },
    onError: (error) => {
      const err = error as AxiosError<{ message: string; errors: [] }>;
      console.log(err);
      const errMessage = extractErrorMessage(err.response?.data.errors);
      toastFail(errMessage);
    },
  });
};
