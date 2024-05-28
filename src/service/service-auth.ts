import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { ApiResponse, api } from './service-api';
import TokenService, { TokenInfo } from './service-token';

import { BroadcastChannel } from 'broadcast-channel';
import { HttpClient } from './service-axios';
import { toastFail, toastSuccess } from './service-toast';
import { NAVIGATION_ROUTES } from '../route/routes.constant';

const logoutChannel = new BroadcastChannel('logout');
const loginChannel = new BroadcastChannel('login');
const loginBroadcast = 'logged_in';

export interface LoginDetails {
  email: string;
  password: string;
}

export interface IUserResponse {
  refresh: string;
  access: string;
  is_agent: boolean;
  is_organization: boolean;
  is_student: boolean;
  is_superuser: boolean;
  is_teacher: boolean;
}
export const authTokenKey = 'authToken';
export const auth = 'userInfo';
const authTokenDetails = 'authTokenDetails';

const initLogout = () => {
  try {
    TokenService.clearToken();
    return Promise.resolve(true);
  } catch (error) {
    return Promise.resolve(false);
  }
};

const useLogoutMutation = (noToast?: boolean) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation(initLogout, {
    onSuccess: () => {
      logoutChannel.postMessage('Logout');
      queryClient.clear();
      queryClient.setQueryData(authTokenKey, () => false);

      navigate(NAVIGATION_ROUTES.BASE, { replace: true });
      !noToast && toastSuccess('Logged out Succesfully');
    },
  });
};

const initLogin = (loginData: LoginDetails) => {
  return HttpClient.post<ApiResponse<IUserResponse>>(api.login, loginData);
};

const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation(initLogin, {
    onSuccess: (response) => {
      loginChannel.postMessage(loginBroadcast);
      const tokens = {
        token: response.data.data.access,
      };
      TokenService.setToken(tokens.token);
      localStorage.setItem('userDetails', JSON.stringify(response.data.data));
      queryClient.setQueryData(authTokenKey, () => true);
      navigate('/');
      toastSuccess('Login Successful!!');
    },
    onError: (error) => {
      const loginErr = error as AxiosError<{ message: string; error: string }>;
      toastFail(
        loginErr.response?.data?.message ??
          loginErr.response?.data?.error ??
          'Login failed !',
      );
    },
  });
};

const checkAuthentication = async () => {
  if (TokenService.getTokenDetails()) {
    return Promise.resolve(true);
  }
  return Promise.resolve(false);
};

/**
 * Check if user is authenticated
 * @returns boolean
 */
const useAuthentication = () => {
  const queryClient = useQueryClient();

  return useQuery(authTokenKey, checkAuthentication, {
    onSuccess: () => {
      const tokenDetails = TokenService.getTokenDetails();
      if (tokenDetails) {
        queryClient.setQueryData<TokenInfo>(authTokenDetails, {
          ...tokenDetails,
        });
      }
    },
  });
};

const useLoginTokenDetailQuery = () => {
  return useQuery<unknown, unknown, TokenInfo>(authTokenDetails);
};

export {
  useAuthentication,
  useLoginMutation,
  useLoginTokenDetailQuery,
  useLogoutMutation,
};
