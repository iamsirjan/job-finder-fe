import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ApiResponse, api } from 'service/service-api';
import { HttpClient } from 'service/service-axios';
import { toastFail, toastSuccess } from 'service/service-toast';
import { extractErrorMessage } from 'utils/errorHandler';

export const degreeFetchQuery = 'degree';

export interface IDegree {
  id?: string;
  name: string;
}
export interface IDegreeResponse {
  count: number;
  next: string;
  page_count: number;
  previous: string;
  results: {
    id: string;
    name: string;
  }[];
}

export interface IAllDegreeResponse {
  id: string;
  name: string;
}
export interface IDegreeRequest {
  name: string;
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

const getDegreeListById = async ({ id }: { id: string }) => {
  const { data } = await HttpClient.get<ApiResponse<IDegree>>(
    `${api.degree}${id}`,
  );
  return data.data;
};

export const useGetDegreeListById = ({ onOpen }: { onOpen: () => void }) => {
  return useMutation(getDegreeListById, {
    onSuccess: () => {
      onOpen();
    },
  });
};

const addDegreeData = async (data: IDegreeRequest) => {
  const response = await HttpClient.post<ApiResponse>(api.degree, data);
  return response;
};

export const useAddDegreeData = () => {
  const queryClient = useQueryClient();
  return useMutation(addDegreeData, {
    onSuccess: () => {
      queryClient.invalidateQueries(degreeFetchQuery);
      toastSuccess('Degree Added Successfully');
    },
    onError: (error) => {
      const degreeErr = error as AxiosError<{ message: string; errors: [] }>;
      const errorMessage = extractErrorMessage(
        degreeErr.response?.data?.errors,
      );
      toastFail(errorMessage);
    },
  });
};

const deleteDegreeData = async ({ id }: { id: string }) => {
  const response = await HttpClient.delete<ApiResponse>(`${api.degree}${id}`);
  return response;
};

export const useDeleteDegreeData = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteDegreeData, {
    onSuccess: () => {
      queryClient.invalidateQueries(degreeFetchQuery);
      toastSuccess(`Degree Deleted Successfully`);
    },
    onError: (error) => {
      const degreeErr = error as AxiosError<{ message: string; errors: [] }>;
      toastFail(degreeErr.message);
    },
  });
};

const updateDegreeData = async ({
  id,
  data,
}: {
  id: string;
  data: IDegreeRequest;
}) => {
  const response = await HttpClient.patch<ApiResponse>(
    `${api.degree}${id}/`,
    data,
  );
  return response;
};

export const useUpdateDegreeData = () => {
  const queryClient = useQueryClient();
  return useMutation(updateDegreeData, {
    onSuccess: () => {
      queryClient.invalidateQueries(degreeFetchQuery);
      toastSuccess('Degree Updated Successfully');
    },
    onError: (error) => {
      const degreeErr = error as AxiosError<{ message: string; errors: [] }>;
      const errorMessage = extractErrorMessage(
        degreeErr.response?.data?.errors,
      );
      toastFail(errorMessage);
    },
  });
};

const getAllDegreeList = async () => {
  const { data } = await HttpClient.get<ApiResponse<IAllDegreeResponse[]>>(
    api.allDegree,
  );
  return data.data;
};

export const useGetAllDegreeList = () => {
  return useQuery([degreeFetchQuery], () => getAllDegreeList(), {
    keepPreviousData: true,
  });
};
