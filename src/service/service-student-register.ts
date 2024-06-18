import { useMutation, useQueryClient } from 'react-query';
import { ApiResponse, api } from './service-api';
import { HttpClient } from './service-axios';
import { useRegistrationStore } from 'state/registration.state';
import { AxiosError } from 'axios';
import { extractErrorMessage } from 'utils/errorHandler';
import { toastFail } from './service-toast';
import { IStudentSecondStep } from 'pages/Register/StudentRegistration/secondStep/interface';

const registerStudentStepFirst = async (body: IFirstStepStudent) => {
  const response = await HttpClient.post<ApiResponse<IFirstStepStudent>>(
    api.student.registerStudentStepFirst,
    body,
  );
  return response;
};

export const useRegisterStudentStepFirst = () => {
  const queryClient = useQueryClient();
  const increaseStep = useRegistrationStore((state) => state.increaseStep);
  return useMutation(registerStudentStepFirst, {
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

const registerStudentStepSecond = async (body: FormData) => {
  const response = await HttpClient.post<ApiResponse<IStudentSecondStep>>(
    api.student.registerStudentStepSecond,
    body,
  );
  return response;
};

export const useRegisterStudentStepSecond = () => {
  const queryClient = useQueryClient();

  const increaseStep = useRegistrationStore((state) => state.increaseStep);
  return useMutation(registerStudentStepSecond, {
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
