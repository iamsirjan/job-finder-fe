import { AxiosError } from 'axios';
import {
  IVacancyResponse,
  IvacancyRequest,
} from 'pages/Organization/Vacancy/interface';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { NAVIGATION_ROUTES } from 'route/routes.constant';
import { ApiResponse, api } from 'service/service-api';
import { HttpClient } from 'service/service-axios';
import { toastFail, toastSuccess } from 'service/service-toast';
import { extractErrorMessage } from 'utils/errorHandler';

export const vacancyFetchQuery = 'vacancy';

interface IVacancyApply {
  teacher: string;
  cv: string;
  vacancy: string;
  cover_letter: string;
}

interface ISendJobOffer {
  teacher: string;
  vacancy: string;
  is_offered: boolean;
}

const addVacancyData = async (data: IvacancyRequest) => {
  const response = await HttpClient.post<ApiResponse>(api.vacancy, data);
  return response;
};

export const useAddVacancyData = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation(addVacancyData, {
    onSuccess: () => {
      queryClient.invalidateQueries(vacancyFetchQuery);
      toastSuccess('Vacancy Added Successfully');
      navigate(NAVIGATION_ROUTES.VACANCY.GET);
    },
    onError: (error) => {
      const err = error as AxiosError<{ message: string; errors: [] }>;
      const errorMessage = extractErrorMessage(err.response?.data?.errors);
      toastFail(errorMessage);
    },
  });
};

const updateVacancyData = async ({
  id,
  data,
}: {
  id: string;
  data: IvacancyRequest;
}) => {
  const response = await HttpClient.patch<ApiResponse>(
    `${api.vacancy}${id}/`,
    data,
  );
  return response;
};

export const useUpdateVacancyData = () => {
  const queryClient = useQueryClient();
  return useMutation(updateVacancyData, {
    onSuccess: () => {
      queryClient.invalidateQueries(vacancyFetchQuery);
      toastSuccess('vacancy Updated Successfully');
    },
    onError: (error) => {
      const err = error as AxiosError<{ message: string; errors: [] }>;
      const errorMessage = extractErrorMessage(err.response?.data?.errors);
      toastFail(errorMessage);
    },
  });
};

const getVacancyList = async () => {
  const { data } = await HttpClient.get<IVacancyResponse>(api.vacancy);
  return data.data || [];
};

export const useGetVacancyList = () => {
  return useQuery([vacancyFetchQuery], () => getVacancyList(), {
    keepPreviousData: true,
  });
};

const getVacancyListById = async ({ id }: { id: string }) => {
  const { data } = await HttpClient.get<IVacancyResponse>(`${api.grade}${id}`);
  return data.data;
};

export const useGetVacancyListById = () => {
  return useMutation(getVacancyListById, {});
};

const applyVacancy = async (data: IVacancyApply) => {
  const response = await HttpClient.post<ApiResponse>(
    api.teacher.applyVacancy,
    data,
  );
  return response;
};

export const useApplyVacancy = () => {
  // const queryClient = useQueryClient();
  return useMutation(applyVacancy, {
    onSuccess: () => {
      toastSuccess('Job request sent');
    },
  });
};

const sendJobOffer = async (data: ISendJobOffer) => {
  const response = await HttpClient.post<ApiResponse>(
    api.organization.sendOffer,
    data,
  );
  return response;
};

export const useSendOffer = () => {
  return useMutation(sendJobOffer, {
    onSuccess: () => {
      toastSuccess('Job Offer Send');
    },
  });
};

const getJobRequestList = async () => {
  const response = await HttpClient.get<ApiResponse<IVacancyResponse[]>>(
    api.organization.sendOffer,
  );
  return response;
};

export const useGetJobRequestList = () => {
  return useQuery(['jobs'], () => getJobRequestList(), {
    keepPreviousData: true,
  });
};
