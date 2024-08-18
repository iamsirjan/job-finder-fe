import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ApiResponse, api } from './service-api';
import { HttpClient } from './service-axios';
import { AxiosError } from 'axios';
import { extractErrorMessage } from 'utils/errorHandler';
import { toastFail } from './service-toast';
import { useRegistrationStore } from 'state/registration.state';
import { ISecondStep } from 'pages/Register/TeacherRegistration/secondStep/interface';
import { IThirdStep } from 'pages/Register/TeacherRegistration/thirdStep/interface';
import { IFirstStep } from 'pages/Register/TeacherRegistration/firstStep/interface';
import { AvailableTypeEnum } from 'pages/Register/TeacherRegistration/firstStep/constant';
import { useCommonStore } from 'state/common.state';
import { useNavigate } from 'react-router-dom';
import { NAVIGATION_ROUTES } from 'route/routes.constant';

interface IDocument {
  id: number;
  file: string;
}

interface IUserDetails {
  id: string;
  phone: string;
  email: string;
  address: string;
  is_student: boolean;
  is_teacher: boolean;
  is_agent: boolean;
  is_organization: boolean;
  is_registered: boolean;
  step_of_register: string | null;
}

interface IUserProfile {
  id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  gender: string;
  date_of_birth: string;
  profile_picture: string;
  user_details: IUserDetails;
}

interface ITeacher {
  id: string;
  is_admin_created: boolean;
  biography: string;
  created_at: string;
  updated_at: string;
  experience_in_years: number;
  can_shift_location: boolean;
  is_available: boolean;
  interested_organization: string;
  lodging: boolean;
  fooding: boolean;
  is_available_for_tution: boolean;
  expected_salary_low: string;
  expected_salary_high: string;
  available_time: AvailableTypeEnum;
  no_of_periods: number;
  salary_per_period: number;
  period_from_time: string;
  period_to_time: string;
  can_work_in_village: boolean;
  can_work_in_city: boolean;
  user?: string;
  organization: string | null;
  degree: number;
  province: number;
  district: number;
  municipality: number;
  subject: {
    id: string;
    name: string;
  }[];
  grade: {
    id: string;
    name: string;
  }[];
}

export interface ITeacherDetail {
  teacher: ITeacher;
  user_profile: IUserProfile;
  document: IDocument[];
  cv: IDocument[];
  citizenship: IDocument[];
}

export interface IAllTeacherDetail {
  data: {
    teacher: ITeacher;
    user_profile: IUserProfile;
    document: IDocument[];
    cv: IDocument[];
    citizenship: IDocument[];
  }[];
}

const registerTeacherStepFirst = async ({
  id,
  body,
}: {
  id?: string;
  body: IFirstStep;
}) => {
  const url = id
    ? `${api.teacher.registerStepFirst}?user=${id}`
    : api.teacher.registerStepFirst;

  const response = await HttpClient.post<ApiResponse<IFirstStep>>(url, body);
  return response;
};

export const useRegisterTeacherStepFirst = () => {
  const queryClient = useQueryClient();
  const increaseStep = useRegistrationStore((state) => state.increaseStep);
  return useMutation(registerTeacherStepFirst, {
    onSuccess: () => {
      increaseStep();
      queryClient.invalidateQueries('user');
    },
    onError: (error) => {
      const err = error as AxiosError<{ message: string; errors: [] }>;

      const errMessage = extractErrorMessage(err.response?.data.errors);
      toastFail(errMessage);
    },
  });
};

const registerTeacherStepSecond = async ({
  id,
  body,
}: {
  id?: string;
  body: FormData;
}) => {
  const url = id
    ? `${api.teacher.registerStepSecond}?user=${id}`
    : api.teacher.registerStepSecond;
  const response = await HttpClient.patch<ApiResponse<ISecondStep>>(url, body);
  return response;
};

export const useRegisterTeacherStepSecond = () => {
  const queryClient = useQueryClient();

  const increaseStep = useRegistrationStore((state) => state.increaseStep);
  return useMutation(registerTeacherStepSecond, {
    onSuccess: () => {
      increaseStep();
      queryClient.invalidateQueries('user');
    },
    onError: (error) => {
      const err = error as AxiosError<{ message: string; errors: [] }>;

      const errMessage = extractErrorMessage(err.response?.data.errors);
      toastFail(errMessage);
    },
  });
};

const registerTeacherStepThird = async ({
  id,
  body,
}: {
  id?: string;
  body: FormData;
}) => {
  const url = id ? `${api.uploadProfile}?user=${id}` : api.uploadProfile;
  const response = await HttpClient.patch<ApiResponse<IThirdStep>>(url, body);
  return response;
};

export const useRegisterTeacherStepThird = ({
  redirect,
}: {
  redirect: boolean;
}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const increaseStep = useRegistrationStore((state) => state.increaseStep);
  return useMutation(registerTeacherStepThird, {
    onSuccess: () => {
      increaseStep();
      queryClient.invalidateQueries('user');
      redirect && navigate(NAVIGATION_ROUTES.BASE);
    },
    onError: (error) => {
      const err = error as AxiosError<{ message: string; errors: [] }>;

      const errMessage = extractErrorMessage(err.response?.data.errors);
      toastFail(errMessage);
    },
  });
};

const getTeacherDetails = async () => {
  const response = await HttpClient.get<ApiResponse<ITeacherDetail>>(
    api.teacher.teacherDetails,
  );
  return response;
};

export const useGetTeacherDetails = () => {
  return useQuery('teacher', () => getTeacherDetails(), {
    keepPreviousData: true,
  });
};

const getAllTeacherDetails = async ({
  grade,
  subject,
  search,
}: {
  grade?: string[];
  search?: string;
  subject?: string[];
}) => {
  const data = await HttpClient.get<ApiResponse<ITeacherDetail[]>>(
    api.teacher.getAllTeacherDetails,
    {
      params: { grade, subject, teacher: search },
    },
  );
  return data;
};

export const useGetAllTeacherDetails = ({
  grade,
  subject,
  search,
}: {
  grade?: string[];
  subject?: string[];
  search?: string;
} = {}) => {
  return useQuery(
    ['teacherall', grade, subject, search],
    () =>
      getAllTeacherDetails({
        grade: grade,
        subject: subject,
        search: search,
      }),
    {
      onSuccess: () => {
        useCommonStore.getState().setDrawer(false);
      },
      keepPreviousData: true,
    },
  );
};

const getTeacherDetailsByID = async ({ id }: { id: string }) => {
  const response = await HttpClient.get<ApiResponse<ITeacherDetail>>(
    `${api.teacher.teacherDetails}${id}/`,
  );
  return response.data.data;
};

export const useGetTeacherDetailsByID = ({ id }: { id: string }) => {
  return useQuery(
    ['teacher', id],
    () =>
      getTeacherDetailsByID({
        id: id,
      }),
    {
      keepPreviousData: true,
    },
  );
};

const getAllTeacherList = async ({
  grade,
  subject,
}: {
  grade?: string[];
  subject?: string[];
}) => {
  const { data } = await HttpClient.get<IAllTeacherDetail>(
    api.teacher.getAllTeacherDetails,
    {
      params: { grade, subject },
    },
  );
  return data.data;
};

export const useGetAllTeacherList = ({
  grade,
  subject,
}: {
  grade?: string[];
  subject?: string[];
} = {}) => {
  return useQuery(
    ['teacherlist', grade, subject],
    () =>
      getAllTeacherList({
        grade: grade,
        subject: subject,
      }),
    {
      keepPreviousData: true,
    },
  );
};
