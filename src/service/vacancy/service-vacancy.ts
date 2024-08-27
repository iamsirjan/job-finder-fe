import { AxiosError } from 'axios';
import {
  IVacancyDetails,
  IVacancyResponse,
  IvacancyRequest,
} from 'pages/Admin/Vacancy/interface';
import { AvailableTypeEnum } from 'pages/Register/TeacherRegistration/firstStep/constant';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { NAVIGATION_ROUTES } from 'route/routes.constant';
import { ApiResponse, api } from 'service/service-api';
import { HttpClient } from 'service/service-axios';
import { ITeacherDetail } from 'service/service-teacher-register';
import { toastFail, toastSuccess } from 'service/service-toast';
import { useCommonStore } from 'state/common.state';
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

interface IVacancy {
  name: string;
  id: string;
  qualification: string;
  grade: string[];
  subject: string[];
  no_of_applicants: number;
  from_date: Date;
  to_date: Date;
  experience_in_years: number;
  allow_fresher: boolean;
  job_type: AvailableTypeEnum;
  lodging: boolean;
  fooding: boolean;
  salary: number;
  salary_per_period: number;
  job_from_time: string;
  job_to_time: string;
  is_active: boolean;
  organization: {
    organization_courses: {
      id: string;
      name: string;
      price: string;
      duration: string;
      organization: string;
      grade: string;
    }[];

    organization_detail: {
      address: string;
      id: string;
      name: string;
      pan_number: string;
      phone_number: string;
      profile_pic: string;
      web_site_link: string;
    };
  };
}

interface IMatchingOrg {
  matching_teacher: ITeacherDetail[];
  other_vacancy: IVacancy[];
}

const addVacancyData = async (data: IvacancyRequest) => {
  const response = await HttpClient.post<ApiResponse>(api.vacancy, data);
  return response;
};

export const useAddVacancyData = ({
  redirect = true,
}: {
  redirect?: boolean;
}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation(addVacancyData, {
    onSuccess: () => {
      queryClient.invalidateQueries(vacancyFetchQuery);
      queryClient.invalidateQueries('org-vacancy');
      toastSuccess('Vacancy Added Successfully');
      redirect && navigate(NAVIGATION_ROUTES.VACANCY.GET);
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

const getVacancyList = async ({
  grade,
  subject,
  search,
  salary_high,
  salary_low,
}: {
  grade?: string[];
  subject?: string[];
  search?: string;
  salary_high?: string;
  salary_low?: string;
}) => {
  const { data } = await HttpClient.get<IVacancyResponse>(api.vacancy, {
    params: { grade, subject, vacancy: search, salary_high, salary_low },
  });
  return data.data || [];
};

export const useGetVacancyList = ({
  grade,
  subject,
  search,
  salary_high,
  salary_low,
}: {
  grade?: string[];
  subject?: string[];
  search?: string;
  salary_high?: string;
  salary_low?: string;
} = {}) => {
  return useQuery(
    [vacancyFetchQuery, grade, subject, search, salary_high, salary_low],
    () =>
      getVacancyList({
        grade: grade,
        subject: subject,
        search: search,
        salary_high: salary_high,
        salary_low: salary_low,
      }),
    {
      onSuccess: () => {
        useCommonStore.getState().setDrawer(false);
      },
      keepPreviousData: true,
    },
  );
};

const getVacancyListById = async ({ id }: { id: string }) => {
  const { data } = await HttpClient.get<IVacancyDetails>(
    `${api.vacancy}${id}/`,
  );
  return data.data;
};

export const useGetVacancyListById = ({ id }: { id: string }) =>
  useQuery(
    [id],
    () =>
      getVacancyListById({
        id: id,
      }),
    {
      keepPreviousData: true,
      refetchOnMount: true,
    },
  );

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
      toastSuccess('Vacancy Applied Successfully');
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
  const query = useQueryClient();
  return useMutation(sendJobOffer, {
    onSuccess: () => {
      toastSuccess('Job Offer Send');
      query.invalidateQueries('sent');
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

const getVacancyListORG = async () => {
  const { data } = await HttpClient.get<IVacancyResponse>(
    api.organization.vacancy,
  );
  return data.data || [];
};

export const useGetVacancyListORG = () => {
  return useQuery('org-vacancy', () => getVacancyListORG(), {
    keepPreviousData: true,
  });
};

const deleteVacancy = async ({ id }: { id: string }) => {
  const response = await HttpClient.delete<ApiResponse>(`${api.vacancy}${id}`);
  return response;
};

export const useDeleteVacancyData = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteVacancy, {
    onSuccess: () => {
      queryClient.invalidateQueries('org-vacancy');
      queryClient.invalidateQueries('vacancyFetchQuery');
      toastSuccess(`Vacancy Deleted Successfully`);
    },
    onError: (error) => {
      const err = error as AxiosError<{ message: string; errors: [] }>;
      toastFail(err.message);
    },
  });
};

const getMatchingOrgById = async ({ id }: { id: string }) => {
  const { data } = await HttpClient.get<ApiResponse<IMatchingOrg>>(
    `${api.organization.getMatchingOrg}${id}/`,
  );
  return data.data;
};

export const useGetMatchingOrgById = ({ id }: { id: string }) =>
  useQuery(
    [id, 'orgmatch'],
    () =>
      getMatchingOrgById({
        id: id,
      }),
    {
      keepPreviousData: true,
      refetchOnMount: true,
    },
  );
