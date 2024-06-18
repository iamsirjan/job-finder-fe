import { IUserResponse } from './service-auth';

export interface TokenInfo {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
  email: string;
  is_doctor: boolean;
  is_patient: boolean;
  is_superuser: boolean;
  user: { role: string };
}

function setToken(token: string) {
  localStorage.setItem('token', token);
}

function getToken(): { token: string } | null {
  try {
    return {
      token: localStorage.getItem('token') ?? '',
    };
  } catch (e) {
    return null;
  }
}

function getTokenDetails(): TokenInfo | null {
  try {
    const token = getToken();
    return token
      ? (JSON.parse(window.atob(token.token.split('.')[1])) as TokenInfo)
      : null;
  } catch (e) {
    return null;
  }
}

function isAuthenticated() {
  const tokenDetails = getTokenDetails();
  if (tokenDetails) {
    return true;
  } else {
    return false;
  }
}

function clearToken() {
  localStorage.removeItem('token');
  localStorage.removeItem('refresh_token');
}

export const getRole = () => {
  return getTokenDetails();
};

const getUserDetails = () => {
  const item = localStorage.getItem('userDetails');
  const response = JSON.parse(item || '') as IUserResponse;
  return response;
};

const TokenService = {
  setToken,
  getToken,
  getTokenDetails,
  isAuthenticated,
  clearToken,
  getUserDetails,
};

export default TokenService;
