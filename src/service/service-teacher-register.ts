import { useMutation, useQueryClient } from 'react-query';
import { ApiResponse, api } from './service-api';
import { HttpClient } from './service-axios';
import { AxiosError } from 'axios';
import { extractErrorMessage } from 'utils/errorHandler';
import { toastFail } from './service-toast';
import { useRegistrationStore } from 'state/registration.state';
import { ISecondStep } from 'pages/Register/TeacherRegistration/secondStep/interface';
import { IThirdStep } from 'pages/Register/TeacherRegistration/thirdStep/interface';

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
