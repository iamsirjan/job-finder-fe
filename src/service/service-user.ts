import { useQuery } from 'react-query';
import { ApiResponse, api } from './service-api';
import { HttpClient } from './service-axios';

interface IUserDetails {
  id: string;
  address: string;
  email: string;
  phone: string;
  is_agent: boolean;
  is_organization: boolean;
  is_student: boolean;
  is_superuser: boolean;
  is_teacher: boolean;
  step_of_register: number;
  is_registered: boolean;
}

const getUserDetails = async () => {
  const { data } = await HttpClient.get<ApiResponse<IUserDetails>>(
    api.userDetails,
  );
  return data.data;
};

export const useGetUserDetails = () => {
  return useQuery(['user'], () => getUserDetails(), {
    keepPreviousData: true,
  });
};
