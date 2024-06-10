import { IOrgFirstStep } from 'pages/Register/OrganizationRegistration/firstStep/interface';
import { HttpClient } from './service-axios';
import { ApiResponse, api } from './service-api';
import { useMutation, useQueryClient } from 'react-query';
import { useRegistrationStore } from 'state/registration.state';
import { AxiosError } from 'axios';
import { extractErrorMessage } from 'utils/errorHandler';
import { toastFail } from './service-toast';
import { IOrgSecondStep } from 'pages/Register/OrganizationRegistration/secondStep/interface';
import { IOrgFourthStep } from 'pages/Register/OrganizationRegistration/fourthStep/interface';

interface IOrgThirdStepRequest {
  grade: string;
  name: string;
  price: string;
  duration: string;
}

const registerOrganizationStepFirst = async (body: IOrgFirstStep) => {
  const response = await HttpClient.post<ApiResponse<IOrgFirstStep>>(
    api.organization.registerOrganizationStepFirst,
    body,
  );
  return response;
};

export const useRegisterOrganizationStepFirst = () => {
  const queryClient = useQueryClient();
  const increaseStep = useRegistrationStore((state) => state.increaseStep);
  return useMutation(registerOrganizationStepFirst, {
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

const registerOrganizationStepSecond = async (body: IOrgSecondStep) => {
  const response = await HttpClient.post<ApiResponse<IOrgFirstStep>>(
    api.organization.registerOrganizationStepSecond,
    body,
  );
  return response;
};

export const useRegisterOrganizationStepSecond = () => {
  const queryClient = useQueryClient();
  const increaseStep = useRegistrationStore((state) => state.increaseStep);
  return useMutation(registerOrganizationStepSecond, {
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

const registerOrganizationStepThird = async (body: IOrgThirdStepRequest[]) => {
  const response = await HttpClient.post<ApiResponse<IOrgThirdStepRequest[]>>(
    api.organization.registerOrganizationStepThird,
    body,
  );
  return response;
};

export const useRegisterOrganizationStepThird = () => {
  const queryClient = useQueryClient();
  const increaseStep = useRegistrationStore((state) => state.increaseStep);
  return useMutation(registerOrganizationStepThird, {
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

const registerOrganizationStepFourth = async (body: FormData) => {
  const response = await HttpClient.post<ApiResponse<IOrgFourthStep>>(
    api.organization.registerOrganizationStepFourth,
    body,
  );
  return response;
};

export const useRegisterOrganizationStepFourth = () => {
  const queryClient = useQueryClient();

  const increaseStep = useRegistrationStore((state) => state.increaseStep);
  return useMutation(registerOrganizationStepFourth, {
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
