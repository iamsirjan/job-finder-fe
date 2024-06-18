import { useMutation, useQueryClient } from 'react-query';
import { ApiResponse, api } from './service-api';
import { HttpClient } from './service-axios';
import { useRegistrationStore } from 'state/registration.state';
import { AxiosError } from 'axios';
import { extractErrorMessage } from 'utils/errorHandler';
import { toastFail } from './service-toast';
import { IAgentSecondStep } from 'pages/Register/AgentRegistration/secondStep/interface';

const registerAgentStepFirst = async (body: IFirstStepAgent) => {
  const response = await HttpClient.post<ApiResponse<IFirstStepAgent>>(
    api.agent.registerAgentStepFirst,
    body,
  );
  return response;
};

export const useRegisterAgentStepFirst = () => {
  const queryClient = useQueryClient();
  const increaseStep = useRegistrationStore((state) => state.increaseStep);
  return useMutation(registerAgentStepFirst, {
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

const registerAgentStepSecond = async (body: FormData) => {
  const response = await HttpClient.post<ApiResponse<IAgentSecondStep>>(
    api.agent.registerAgentStepSecond,
    body,
  );
  return response;
};

export const useRegisterAgentStepSecond = () => {
  const queryClient = useQueryClient();

  const increaseStep = useRegistrationStore((state) => state.increaseStep);
  return useMutation(registerAgentStepSecond, {
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
