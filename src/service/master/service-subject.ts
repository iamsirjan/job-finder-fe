import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ApiResponse, api } from 'service/service-api';
import { HttpClient } from 'service/service-axios';
import { toastFail, toastSuccess } from 'service/service-toast';
import { extractErrorMessage } from 'utils/errorHandler';

export const subjectFetchQuery = 'subject';

export interface ISubject {
  id?: string;
  name: string;
}
export interface ISubjectResponse {
  count: number;
  next: string;
  page_count: number;
  previous: string;
  results: {
    id: string;
    name: string;
  }[];
}

export interface ISubjectRequest {
  name: string;
}

export interface IAllSubjectResponse {
  id: string;
  name: string;
}

const getSubjectList = async () => {
  const { data } = await HttpClient.get<ApiResponse<ISubjectResponse>>(
    api.subject,
  );
  return data.data;
};

export const useGetSubjectList = () => {
  return useQuery([subjectFetchQuery], () => getSubjectList(), {
    keepPreviousData: true,
  });
};

const getSubjectListById = async ({ id }: { id: string }) => {
  const { data } = await HttpClient.get<ApiResponse<ISubject>>(
    `${api.subject}${id}`,
  );
  return data.data;
};

export const useGetSubjectListById = ({ onOpen }: { onOpen: () => void }) => {
  return useMutation(getSubjectListById, {
    onSuccess: () => {
      onOpen();
    },
  });
};

const addSubjectData = async (data: ISubjectRequest) => {
  const response = await HttpClient.post<ApiResponse>(api.subject, data);
  return response;
};

export const useAddSubjectData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSubjectData, {
    onSuccess: () => {
      queryClient.invalidateQueries(subjectFetchQuery);
      toastSuccess('Subject Added Successfully');
    },
    onError: (error) => {
      const subjectErr = error as AxiosError<{ message: string; errors: [] }>;
      const errorMessage = extractErrorMessage(
        subjectErr.response?.data?.errors,
      );
      toastFail(errorMessage);
    },
  });
};

const deleteSubjectData = async ({ id }: { id: string }) => {
  const response = await HttpClient.delete<ApiResponse>(`${api.subject}${id}`);
  return response;
};

export const useDeleteSubjectData = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteSubjectData, {
    onSuccess: () => {
      queryClient.invalidateQueries(subjectFetchQuery);
      toastSuccess(`Subject Deleted Successfully`);
    },
    onError: (error) => {
      const subjectErr = error as AxiosError<{ message: string; errors: [] }>;
      toastFail(subjectErr.message);
    },
  });
};

const updateSubjectData = async ({
  id,
  data,
}: {
  id: string;
  data: ISubjectRequest;
}) => {
  const response = await HttpClient.patch<ApiResponse>(
    `${api.subject}${id}/`,
    data,
  );
  return response;
};

export const useUpdateSubjectData = () => {
  const queryClient = useQueryClient();
  return useMutation(updateSubjectData, {
    onSuccess: () => {
      queryClient.invalidateQueries(subjectFetchQuery);
      toastSuccess('Subject Updated Successfully');
    },
    onError: (error) => {
      const subjectErr = error as AxiosError<{ message: string; errors: [] }>;
      const errorMessage = extractErrorMessage(
        subjectErr.response?.data?.errors,
      );
      toastFail(errorMessage);
    },
  });
};

const getAllSubjectList = async () => {
  const { data } = await HttpClient.get<ApiResponse<IAllSubjectResponse[]>>(
    api.allSubject,
  );
  return data.data;
};

export const useGetAllSubjectList = () => {
  return useQuery([subjectFetchQuery], () => getAllSubjectList(), {
    keepPreviousData: true,
  });
};
