import { useMutation, useQueryClient } from 'react-query';
import { HttpClient } from './service-axios';
import { ApiResponse, api } from './service-api';
import { toastSuccess } from './service-toast';
import { VacancyStatus } from './service-offer-org';

const rejectVacancy = async ({
  message,
  id,
}: {
  message: string;
  id: string;
}) => {
  const data = {
    message: message,
    vacancy_application: id,
  };
  const response = await HttpClient.post<ApiResponse>(
    api.vacancyStatus.reject,
    data,
  );
  return response;
};

export const useRejectVacancy = () => {
  const queryClient = useQueryClient();
  return useMutation(rejectVacancy, {
    onSuccess: () => {
      queryClient.invalidateQueries('sent');
      queryClient.invalidateQueries('received');
      toastSuccess('application status changed successfully');
    },
  });
};

const acceptVacancy = async ({
  time,
  id,
  date,
}: {
  time: string;
  id: string;
  date: string;
}) => {
  const data = {
    interview_time: time,
    vacancy_application: id,
    interview_date: date,
  };
  const response = await HttpClient.post<ApiResponse>(
    api.vacancyStatus.accept,
    data,
  );
  return response;
};

export const useAcceptVacancy = () => {
  const queryClient = useQueryClient();
  return useMutation(acceptVacancy, {
    onSuccess: () => {
      queryClient.invalidateQueries('sent');
      queryClient.invalidateQueries('received');
      toastSuccess('application status changed successfully');
    },
  });
};

const hireVacancy = async ({ id }: { id: string }) => {
  const data = {
    vacancy_application: id,
  };
  const response = await HttpClient.post<ApiResponse>(
    api.vacancyStatus.hire,
    data,
  );
  return response;
};

export const useHireVacancy = () => {
  const queryClient = useQueryClient();
  return useMutation(hireVacancy, {
    onSuccess: () => {
      queryClient.invalidateQueries('sent');
      queryClient.invalidateQueries('received');
      toastSuccess('application status changed successfully');
    },
  });
};

const updateStatus = async ({
  id,
  status,
}: {
  id: string;
  status: VacancyStatus;
}) => {
  const data = {
    status: status,
  };
  const response = await HttpClient.patch<ApiResponse>(
    `${api.vacancyStatus.status}${id}/`,
    data,
  );
  return response;
};

export const useUpdateStatus = () => {
  const queryClient = useQueryClient();
  return useMutation(updateStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries('sent');
      queryClient.invalidateQueries('received');
      queryClient.invalidateQueries('recievedadmin');
      queryClient.invalidateQueries('sentadmin');
    },
  });
};
