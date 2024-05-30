import { useQuery } from 'react-query';
import { ApiResponse, api } from 'service/service-api';
import { HttpClient } from 'service/service-axios';

export const degreeFetchQuery = 'degree';

export interface IDegreeResponse {
  count: number;
  next: string;
  page_count: number;
  previous: string;
  results: {
    id: string;
    name: string;
    stream: string;
  }[];
}

const getDegreeList = async () => {
  const { data } = await HttpClient.get<ApiResponse<IDegreeResponse>>(
    api.degree,
  );
  return data.data;
};

export const useGetDegreeList = () => {
  return useQuery([degreeFetchQuery], () => getDegreeList(), {
    keepPreviousData: true,
  });
};
