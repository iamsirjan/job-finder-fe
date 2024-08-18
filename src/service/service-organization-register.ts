import {
  IOrgFirstStep,
  OrganizationTypeEnum,
} from 'pages/Register/OrganizationRegistration/firstStep/interface';
import { HttpClient } from './service-axios';
import { ApiResponse, api } from './service-api';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRegistrationStore } from 'state/registration.state';
import { AxiosError } from 'axios';
import { extractErrorMessage } from 'utils/errorHandler';
import { toastFail, toastSuccess } from './service-toast';
import { IOrgSecondStep } from 'pages/Register/OrganizationRegistration/secondStep/interface';
import { IOrgFourthStep } from 'pages/Register/OrganizationRegistration/fourthStep/interface';
import { useNavigate, useNavigation } from 'react-router-dom';
import { NAVIGATION_ROUTES } from 'route/routes.constant';

interface IOrgThirdStepRequest {
  grade: string;
  name: string;
  price: string;
  duration: string;
}

interface IOrgDetails {
  organization_detail: {
    address: string;
    id: string;
    name: string;
    user: string;
    pan_number: string;
    phone_number: string;
    profile_pic: string;
    web_site_link: string;
  };
  organization_location: {
    latitude: number;
    longitude: number;
  };
  organization_courses: {
    id: string;
    name: string;
    price: string;
    duration: string;
    grade: string;
  }[];
}

export interface IOrgList {
  data: {
    organization_course: [];
    organization_detail: {
      address: string;
      is_admin_created: boolean;
      id: string;
      name: string;
      organization_type: OrganizationTypeEnum;
      pan_number: string;
      phone_number: string;
      profile_pic: string;
      user: string;
      web_site_link: string;
    };
  }[];
}
const registerOrganizationStepFirst = async ({
  id,
  body,
}: {
  id?: string;
  body: IOrgFirstStep;
}) => {
  const url = id
    ? `${api.organization.registerOrganizationStepFirst}?user=${id}`
    : api.organization.registerOrganizationStepFirst;

  const response = await HttpClient.post<ApiResponse<IOrgFirstStep>>(url, body);
  return response;
};

export const useRegisterOrganizationStepFirst = () => {
  const queryClient = useQueryClient();
  const increaseStep = useRegistrationStore((state) => state.increaseStep);
  return useMutation(registerOrganizationStepFirst, {
    onSuccess: () => {
      increaseStep();
      queryClient.invalidateQueries('orgdetails');
    },

    onError: (error) => {
      const err = error as AxiosError<{ message: string; errors: [] }>;

      const errMessage = extractErrorMessage(err.response?.data.errors);
      toastFail(errMessage);
    },
  });
};
const updateOrganizationStepFirst = async ({
  id,
  body,
}: {
  id?: string;
  body: IOrgFirstStep;
}) => {
  const url = `${api.organization.updateOrganizationStepFirst}${id}/`;

  const response = await HttpClient.patch<ApiResponse<IOrgFirstStep>>(
    url,
    body,
  );
  return response;
};

export const useUpdateOrganizationStepFirst = () => {
  const queryClient = useQueryClient();
  const increaseStep = useRegistrationStore((state) => state.increaseStep);
  return useMutation(updateOrganizationStepFirst, {
    onSuccess: () => {
      increaseStep();

      queryClient.invalidateQueries('orgdetails');

      toastSuccess('profile updated successfully');
    },

    onError: (error) => {
      const err = error as AxiosError<{ message: string; errors: [] }>;

      const errMessage = extractErrorMessage(err.response?.data.errors);
      toastFail(errMessage);
    },
  });
};

const registerOrganizationStepSecond = async ({
  id,
  body,
}: {
  id?: string;
  body: IOrgSecondStep;
}) => {
  const url = id
    ? `${api.organization.registerOrganizationStepSecond}?user=${id}`
    : api.organization.registerOrganizationStepSecond;
  const response = await HttpClient.post<ApiResponse<IOrgFirstStep>>(url, body);
  return response;
};

export const useRegisterOrganizationStepSecond = () => {
  const queryClient = useQueryClient();
  const increaseStep = useRegistrationStore((state) => state.increaseStep);
  return useMutation(registerOrganizationStepSecond, {
    onSuccess: () => {
      increaseStep();
      queryClient.invalidateQueries('orgdetails');
    },
    onError: (error) => {
      const err = error as AxiosError<{ message: string; errors: [] }>;

      const errMessage = extractErrorMessage(err.response?.data.errors);
      toastFail(errMessage);
    },
  });
};

const updateOrganizationStepSecond = async ({
  id,
  body,
}: {
  id?: string;
  body: IOrgSecondStep;
}) => {
  const url = `${api.organization.updateOrganizationStepSecond}${id}/`;

  const response = await HttpClient.patch<ApiResponse<IOrgSecondStep>>(
    url,
    body,
  );
  return response;
};

export const useUpdateOrganizationStepSecond = () => {
  const queryClient = useQueryClient();
  const increaseStep = useRegistrationStore((state) => state.increaseStep);
  return useMutation(updateOrganizationStepSecond, {
    onSuccess: () => {
      increaseStep();
      queryClient.invalidateQueries('orgdetails');
      toastSuccess('location updated successfully');
    },

    onError: (error) => {
      const err = error as AxiosError<{ message: string; errors: [] }>;

      const errMessage = extractErrorMessage(err.response?.data.errors);
      toastFail(errMessage);
    },
  });
};

const registerOrganizationStepThird = async ({
  id,
  body,
}: {
  id?: string;
  body: IOrgThirdStepRequest[];
}) => {
  const url = id
    ? `${api.organization.registerOrganizationStepThird}?user=${id}`
    : api.organization.registerOrganizationStepThird;

  const response = await HttpClient.post<ApiResponse<IOrgThirdStepRequest[]>>(
    url,
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
      queryClient.invalidateQueries('orgdetails');
    },
    onError: (error) => {
      const err = error as AxiosError<{ message: string; errors: [] }>;

      const errMessage = extractErrorMessage(err.response?.data.errors);
      toastFail(errMessage);
    },
  });
};

const updateOrganizationStepThird = async ({
  id,
  body,
}: {
  id?: string;
  body: IOrgThirdStepRequest[];
}) => {
  const url = `${api.organization.updateOrganizationStepThird}${id}/`;

  const response = await HttpClient.patch<ApiResponse<IOrgThirdStepRequest[]>>(
    url,
    body,
  );
  return response;
};

export const useUpdateOrganizationStepThird = () => {
  const queryClient = useQueryClient();
  const increaseStep = useRegistrationStore((state) => state.increaseStep);
  return useMutation(updateOrganizationStepThird, {
    onSuccess: () => {
      increaseStep();
      queryClient.invalidateQueries('orgdetails');

      toastSuccess('course updated successfully');
    },

    onError: (error) => {
      const err = error as AxiosError<{ message: string; errors: [] }>;

      const errMessage = extractErrorMessage(err.response?.data.errors);
      toastFail(errMessage);
    },
  });
};

const registerOrganizationStepFourth = async ({
  id,
  body,
}: {
  id?: string;
  body: FormData;
}) => {
  const url = id
    ? `${api.organization.registerOrganizationStepFourth}?user=${id}`
    : api.organization.registerOrganizationStepFourth;

  const response = await HttpClient.post<ApiResponse<IOrgFourthStep>>(
    url,
    body,
  );
  return response;
};

export const useRegisterOrganizationStepFourth = ({
  redirect,
}: {
  redirect?: boolean;
}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const increaseStep = useRegistrationStore((state) => state.increaseStep);
  return useMutation(registerOrganizationStepFourth, {
    onSuccess: () => {
      increaseStep();
      queryClient.invalidateQueries('user');
      toastSuccess('picture updated successfully');
      redirect && navigate(NAVIGATION_ROUTES.BASE);
    },
    onError: (error) => {
      const err = error as AxiosError<{ message: string; errors: [] }>;

      const errMessage = extractErrorMessage(err.response?.data.errors);
      toastFail(errMessage);
    },
  });
};

const getOrgDetails = async () => {
  const { data } = await HttpClient.get<ApiResponse<IOrgDetails>>(
    api.organization.details,
  );
  return data.data;
};

export const useGetOrgDetails = () => {
  return useQuery('org', () => getOrgDetails(), {
    keepPreviousData: true,
  });
};

const getAllOrg = async () => {
  const { data } = await HttpClient.get<IOrgList>(
    api.organization.organizationList,
  );
  return data.data;
};

export const useGetAllOrganization = () => {
  return useQuery('orglist', () => getAllOrg(), {
    refetchOnMount: true,
  });
};

const getOrgDetailsByID = async (id: string) => {
  const { data } = await HttpClient.get<ApiResponse<IOrgDetails>>(
    api.organization.organizationList + id,
  );
  return data.data;
};

export const useGetOrgDetailsByID = (id: string) => {
  return useQuery('orgdetails', () => getOrgDetailsByID(id), {
    refetchOnMount: true,
    cacheTime: 0,
  });
};
