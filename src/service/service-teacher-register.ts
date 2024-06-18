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
  created_at: string;
  updated_at: string;
  experience_in_years: number;
  can_shift_location: boolean;
  is_available: boolean;
  interested_organization: string;
  lodging: boolean;
  fooding: boolean;
  is_available_for_tuition: boolean;
  available_time: string;
  no_of_periods: number;
  salary_per_period: number;
  period_from_time: string;
  period_to_time: string;
  can_work_in_village: boolean;
  can_work_in_city: boolean;
  user: number;
  organization: string | null;
  degree: number;
  province: number;
  district: number;
  municipality: number;
  subject: string[];
  grade: string[];
}

interface ITeacherDetail {
  teacher: ITeacher;
  user_profile: IUserProfile;
  document: IDocument[];
  cv: IDocument[];
  citizenship: IDocument[];
}

const registerTeacherStepFirst = async (body: IFirstStep) => {
  const response = await HttpClient.post<ApiResponse<IFirstStep>>(
    api.teacher.registerStepFirst,
    body,
  );
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

const registerTeacherStepSecond = async (body: FormData) => {
  const response = await HttpClient.patch<ApiResponse<ISecondStep>>(
    api.teacher.registerStepSecond,
    body,
  );
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

const registerTeacherStepThird = async (body: FormData) => {
  const response = await HttpClient.patch<ApiResponse<IThirdStep>>(
    api.uploadProfile,
    body,
  );
  return response;
};

export const useRegisterTeacherStepThird = () => {
  const queryClient = useQueryClient();

  const increaseStep = useRegistrationStore((state) => state.increaseStep);
  return useMutation(registerTeacherStepThird, {
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

const getAllTeacherDetails = async () => {
  const response = await HttpClient.get<ApiResponse<ITeacherDetail[]>>(
    api.teacher.getAllTeacherDetails,
  );
  return response;
};

export const useGetAllTeacherDetails = () => {
  return useQuery('teacherall', () => getAllTeacherDetails(), {
    keepPreviousData: true,
  });
};
