import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ApiResponse, api } from 'service/service-api';
import { HttpClient } from 'service/service-axios';
import { toastFail, toastSuccess } from 'service/service-toast';
import { extractErrorMessage } from 'utils/errorHandler';

export const streamFetchQuery = 'stream';

export interface IStream {
  id?: string;
  name: string;
  description: string;
}
export interface IStreamResponse {
  count: number;
  next: string;
  page_count: number;
  previous: string;
  results: {
    id: string;
    name: string;
    description: string;
  }[];
}

export interface IStreamRequest {
  name: string;
  description: string;
}

const getStreamList = async () => {
  const { data } = await HttpClient.get<ApiResponse<IStreamResponse>>(
    api.stream,
  );
  return data.data;
};

export const useGetStreamList = () => {
  return useQuery([streamFetchQuery], () => getStreamList(), {
    keepPreviousData: true,
  });
};

const getStreamListById = async ({ id }: { id: string }) => {
  const { data } = await HttpClient.get<ApiResponse<IStream>>(
    `${api.stream}${id}`,
  );
  return data.data;
};

export const useGetStreamListById = ({ onOpen }: { onOpen: () => void }) => {
  return useMutation(getStreamListById, {
    onSuccess: () => {
      onOpen();
    },
  });
};

const addStreamData = async (data: IStreamRequest) => {
  const response = await HttpClient.post<ApiResponse>(api.stream, data);
  return response;
};

export const useAddStreamData = () => {
  const queryClient = useQueryClient();
  return useMutation(addStreamData, {
    onSuccess: () => {
      queryClient.invalidateQueries(streamFetchQuery);
      toastSuccess('Stream Added Successfully');
    },
    onError: (error) => {
      const streamErr = error as AxiosError<{ message: string; errors: [] }>;
      const errorMessage = extractErrorMessage(
        streamErr.response?.data?.errors,
      );
      toastFail(errorMessage);
    },
  });
};

const deleteStreamData = async ({ id }: { id: string }) => {
  const response = await HttpClient.delete<ApiResponse>(`${api.stream}${id}`);
  return response;
};

export const useDeleteStreamData = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteStreamData, {
    onSuccess: () => {
      queryClient.invalidateQueries(streamFetchQuery);
      toastSuccess(`Stream Deleted Successfully`);
    },
    onError: (error) => {
      const streamErr = error as AxiosError<{ message: string; errors: [] }>;
      toastFail(streamErr.message);
    },
  });
};

const updateStreamData = async ({
  id,
  data,
}: {
  id: string;
  data: IStreamRequest;
}) => {
  const response = await HttpClient.patch<ApiResponse>(
    `${api.stream}${id}/`,
    data,
  );
  return response;
};

export const useUpdateStreamData = () => {
  const queryClient = useQueryClient();
  return useMutation(updateStreamData, {
    onSuccess: () => {
      queryClient.invalidateQueries(streamFetchQuery);
      toastSuccess('Stream Updated Successfully');
    },
    onError: (error) => {
      const streamErr = error as AxiosError<{ message: string; errors: [] }>;
      const errorMessage = extractErrorMessage(
        streamErr.response?.data?.errors,
      );
      toastFail(errorMessage);
    },
  });
};
