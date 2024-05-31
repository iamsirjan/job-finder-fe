import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ApiResponse, api } from 'service/service-api';
import { HttpClient } from 'service/service-axios';
import { toastFail, toastSuccess } from 'service/service-toast';
import { extractErrorMessage } from 'utils/errorHandler';

export const universityFetchQuery = 'university';

export interface IUniversity {
  id?: string;
  name: string;
  location: string;
}
export interface IUniversityResponse {
  count: number;
  next: string;
  page_count: number;
  previous: string;
  results: {
    id: string;
    name: string;
    location: string;
  }[];
}

export interface IUniversityRequest {
  name: string;
  location: string;
}

const getUniversityList = async () => {
  const { data } = await HttpClient.get<ApiResponse<IUniversityResponse>>(
    api.university,
  );
  return data.data;
};

export const useGetUniversityList = () => {
  return useQuery([universityFetchQuery], () => getUniversityList(), {
    keepPreviousData: true,
  });
};

const getUniversityListById = async ({ id }: { id: string }) => {
  const { data } = await HttpClient.get<ApiResponse<IUniversity>>(
    `${api.university}${id}`,
  );
  return data.data;
};

export const useGetUniversityListById = ({
  onOpen,
}: {
  onOpen: () => void;
}) => {
  return useMutation(getUniversityListById, {
    onSuccess: () => {
      onOpen();
    },
  });
};

const addUniversityData = async (data: IUniversityRequest) => {
  const response = await HttpClient.post<ApiResponse>(api.university, data);
  return response;
};

export const useAddUniversityData = () => {
  const queryClient = useQueryClient();
  return useMutation(addUniversityData, {
    onSuccess: () => {
      queryClient.invalidateQueries(universityFetchQuery);
      toastSuccess('University Added Successfully');
    },
    onError: (error) => {
      const universityErr = error as AxiosError<{
        message: string;
        errors: [];
      }>;
      const errorMessage = extractErrorMessage(
        universityErr.response?.data?.errors,
      );
      toastFail(errorMessage);
    },
  });
};

const deleteUniversityData = async ({ id }: { id: string }) => {
  const response = await HttpClient.delete<ApiResponse>(
    `${api.university}${id}`,
  );
  return response;
};

export const useDeleteUniversityData = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteUniversityData, {
    onSuccess: () => {
      queryClient.invalidateQueries(universityFetchQuery);
      toastSuccess(`University Deleted Successfully`);
    },
    onError: (error) => {
      const universityErr = error as AxiosError<{
        message: string;
        errors: [];
      }>;
      toastFail(universityErr.message);
    },
  });
};

const updateUniversityData = async ({
  id,
  data,
}: {
  id: string;
  data: IUniversityRequest;
}) => {
  const response = await HttpClient.patch<ApiResponse>(
    `${api.university}${id}/`,
    data,
  );
  return response;
};

export const useUpdateUniversityData = () => {
  const queryClient = useQueryClient();
  return useMutation(updateUniversityData, {
    onSuccess: () => {
      queryClient.invalidateQueries(universityFetchQuery);
      toastSuccess('University Updated Successfully');
    },
    onError: (error) => {
      const universityErr = error as AxiosError<{
        message: string;
        errors: [];
      }>;
      const errorMessage = extractErrorMessage(
        universityErr.response?.data?.errors,
      );
      toastFail(errorMessage);
    },
  });
};
