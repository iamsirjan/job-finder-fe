import { useQuery } from 'react-query';
import { ApiResponse, api } from 'service/service-api';
import { HttpClient } from 'service/service-axios';

export interface IDegreeResponse {
  data: {
    id: string;
    name: string;
    stream: string;
  };
}

const getDegreeList = () => {
  const response = HttpClient.get<ApiResponse<IDegreeResponse>>(api.degree);
  return response;
};

export const useGetDegreeList = () => {
  return useQuery(['lcr-fetch'], () => getDegreeList(), {
    //   onSuccess: data => {

    //   },

    keepPreviousData: true,
  });
};
