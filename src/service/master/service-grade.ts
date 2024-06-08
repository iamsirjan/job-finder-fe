import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ApiResponse, api } from 'service/service-api';
import { HttpClient } from 'service/service-axios';
import { toastFail, toastSuccess } from 'service/service-toast';
import { extractErrorMessage } from 'utils/errorHandler';

export const gradeFetchQuery = 'grade';

export interface IGrade {
  id?: string;
  name: string;
}
export interface IGradeResponse {
  count: number;
  next: string;
  page_count: number;
  previous: string;
  results: {
    id: string;
    name: string;
  }[];
}

export interface IGradeRequest {
  name: string;
}

export interface IAllGradeResponse {
  id: string;
  name: string;
}

const getGradeList = async () => {
  const { data } = await HttpClient.get<ApiResponse<IGradeResponse>>(api.grade);
  return data.data;
};

export const useGetGradeList = () => {
  return useQuery([gradeFetchQuery], () => getGradeList(), {
    keepPreviousData: true,
  });
};

const getGradeListById = async ({ id }: { id: string }) => {
  const { data } = await HttpClient.get<ApiResponse<IGrade>>(
    `${api.grade}${id}`,
  );
  return data.data;
};

export const useGetGradeListById = ({ onOpen }: { onOpen: () => void }) => {
  return useMutation(getGradeListById, {
    onSuccess: () => {
      onOpen();
    },
  });
};

const addGradeData = async (data: IGradeRequest) => {
  const response = await HttpClient.post<ApiResponse>(api.grade, data);
  return response;
};

export const useAddGradeData = () => {
  const queryClient = useQueryClient();
  return useMutation(addGradeData, {
    onSuccess: () => {
      queryClient.invalidateQueries(gradeFetchQuery);
      toastSuccess('Grade Added Successfully');
    },
    onError: (error) => {
      const gradeErr = error as AxiosError<{ message: string; errors: [] }>;
      const errorMessage = extractErrorMessage(gradeErr.response?.data?.errors);
      toastFail(errorMessage);
    },
  });
};

const deleteGradeData = async ({ id }: { id: string }) => {
  const response = await HttpClient.delete<ApiResponse>(`${api.grade}${id}`);
  return response;
};

export const useDeleteGradeData = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteGradeData, {
    onSuccess: () => {
      queryClient.invalidateQueries(gradeFetchQuery);
      toastSuccess(`Grade Deleted Successfully`);
    },
    onError: (error) => {
      const gradeErr = error as AxiosError<{ message: string; errors: [] }>;
      toastFail(gradeErr.message);
    },
  });
};

const updateGradeData = async ({
  id,
  data,
}: {
  id: string;
  data: IGradeRequest;
}) => {
  const response = await HttpClient.patch<ApiResponse>(
    `${api.grade}${id}/`,
    data,
  );
  return response;
};

export const useUpdateGradeData = () => {
  const queryClient = useQueryClient();
  return useMutation(updateGradeData, {
    onSuccess: () => {
      queryClient.invalidateQueries(gradeFetchQuery);
      toastSuccess('Grade Updated Successfully');
    },
    onError: (error) => {
      const gradeErr = error as AxiosError<{ message: string; errors: [] }>;
      const errorMessage = extractErrorMessage(gradeErr.response?.data?.errors);
      toastFail(errorMessage);
    },
  });
};

const getAllGradeList = async () => {
  const { data } = await HttpClient.get<ApiResponse<IAllGradeResponse[]>>(
    api.allGrade,
  );
  return data.data;
};

export const useGetAllGradeList = () => {
  return useQuery([gradeFetchQuery], () => getAllGradeList(), {
    keepPreviousData: true,
  });
};
