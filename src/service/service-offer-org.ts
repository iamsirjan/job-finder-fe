import { useQuery } from 'react-query';
import { ApiResponse, api } from './service-api';
import { HttpClient } from './service-axios';
import { AvailableTypeEnum } from 'pages/Register/TeacherRegistration/firstStep/constant';
import { ITeacherDetail } from './service-teacher-register';

interface Teacher {
  id: string;
  biography: string;
  created_at: string;
  updated_at: string;
  experience_in_years: number;
  can_shift_location: boolean;
  is_available: boolean;
  interested_organization: string | null;
  lodging: boolean;
  fooding: boolean;
  is_available_for_tuition: boolean;
  available_time: AvailableTypeEnum;
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
  subject: {
    id: string;
    name: string;
  }[];
  grade: {
    id: string;
    name: string;
  }[];
}

// Define the interface for User Details
interface UserDetails {
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

// Define the interface for User Profile
interface UserProfile {
  id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  gender: string;
  date_of_birth: string;
  profile_picture: string;
  user_details: UserDetails;
}

// Define the interface for Document
interface Document {
  id: number;
  file: string;
}

// Define the interface for CV
interface CV {
  id: number;
  file: string;
}

// Define the interface for Citizenship
interface Citizenship {
  id: number;
  file: string;
}

// Define the interface for Teacher Details
interface TeacherDetails {
  teacher: Teacher;
  user_profile: UserProfile;
  document: Document[];
  cv: CV[];
  citizenship: Citizenship[];
}

export interface Vacancy {
  id: string;
  qualification: string;
  name: string;
  grade: string[];
  subject: string[];
  no_of_applications: number;
  from_date: Date;
  to_date: Date;
  experience_in_years: number;
  allow_fresher: boolean;
  job_type: string;
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
  vacancy_application: {
    cover_letter: string;
    status: string;
  }[];
}

// Define the interface for Vacancy Application Details
interface VacancyApplicationDetails {
  id: string;

  teacher: string;
  cv: string | null;
  vacancy: Vacancy;
  status: VacancyStatus;
  cover_letter: string | null;
  is_offered: boolean;
  is_accepted: boolean;
}

// Define the interface for the entire data structure
interface DataStructure {
  [key: string]: unknown;
  teacher_details: TeacherDetails;
  vacancy_application_details: VacancyApplicationDetails;
}

export enum VacancyStatus {
  APPROVED = '1',
  PENDING = '2',
  REJECTED = '3',
  HIRED = '4',
}

export interface ISentApplicationAdmin {
  data: {
    teacher: ITeacherDetail;
    vacancy_application: VacancyApplicationDetails[];
  }[];
}

// Define the interface for the list of data
export interface DataList {
  data: DataStructure[];
}

export interface ApplicantDetails {
  id: string;
  teacher: TeacherDetails;
  vacancy: Vacancy;
}

const getReceivedOffer = async () => {
  const { data } = await HttpClient.get<ApiResponse>(
    api.organization.receivedOffer,
  );
  return data.data;
};

export const useGetReceivedOffer = () => {
  return useQuery(['received'], () => getReceivedOffer(), {
    keepPreviousData: true,
  });
};

const getSentOffer = async () => {
  const { data } = await HttpClient.get<ApiResponse>(
    api.organization.sentOffer,
  );
  return data.data;
};

export const useGetSentOffer = () => {
  return useQuery(['sent'], () => getSentOffer(), {
    keepPreviousData: true,
  });
};

const getApplicantsByID = async ({ id }: { id: string }) => {
  const { data } = await HttpClient.get<ApiResponse<ApplicantDetails>>(
    `${api.teacher.applicationDetails}${id}/`,
  );
  return data.data;
};

export const useGetApplicantsByID = ({ id }: { id: string }) => {
  return useQuery(
    [id, 'aplicationID'],
    () =>
      getApplicantsByID({
        id: id,
      }),
    {
      keepPreviousData: true,
    },
  );
};

export const getReceivedApplicationAdmin = async () => {
  const { data } = await HttpClient.get<ISentApplicationAdmin>(
    api.admin.getReceivedApplication,
  );
  return data.data;
};

export const useGetReceivedApplicationAdmin = () => {
  return useQuery(['recievedadmin'], () => getReceivedApplicationAdmin(), {
    refetchOnMount: true,
  });
};

export const getSentApplicationAdmin = async () => {
  const { data } = await HttpClient.get<ISentApplicationAdmin>(
    api.admin.getSentApplication,
  );
  return data.data;
};

export const useGetSentApplicationAdmin = () => {
  return useQuery(['sentadmin'], () => getSentApplicationAdmin(), {
    refetchOnMount: true,
  });
};
