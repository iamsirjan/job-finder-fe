import { useQuery } from 'react-query';
import { ApiResponse, api } from './service-api';
import { HttpClient } from './service-axios';
import { Vacancy } from './service-offer-org';

interface OrganizationDetail {
  id: number;
  user: number;
  name: string;
  phone_number: string;
  pan_number: string;
  organization_type: string;
  web_site_link: string;
  address: string;
  profile_pic: string;
  skip_picture: boolean;
}

// Interface for Organization Location
interface OrganizationLocation {
  id: number;
  latitude: number;
  longitude: number;
  organization: number;
}

// Interface for Organization Course
interface OrganizationCourse {
  id: number;
  name: string;
  price: string;
  duration: string;
  organization: number;
  grade: number;
}

// Interface for Organization Full Detail
export interface OrganizationFullDetail {
  organization_detail: OrganizationDetail;
  organization_location: OrganizationLocation;
  organization_courses: OrganizationCourse[];
}

export interface GetOffered {
  data: {
    id: string;
    is_offered: boolean;
    organization: OrganizationFullDetail;
    teacher: string;
    vacancy: {
      id: string;
      organization: OrganizationFullDetail;
    };
  }[];
}
// Main interface for the JSON data
export interface VacancyDetail {
  data: {
    id: string;
    qualification: number;
    grade: number[];
    subject: number[];
    no_of_applicants: number;
    from_date: string;
    to_date: string;
    experience_in_years: number;
    allow_fresher: boolean;
    job_type: string;
    lodging: boolean;
    fooding: boolean;
    salary_per_period: number;
    job_from_time: string;
    job_to_time: string;
    is_active: boolean;
    organization: OrganizationFullDetail;
    grade_names: string[];
    subject_names: string[];
    qualification_name: string;
  }[];
}

const getReceivedOffer = async () => {
  const { data } = await HttpClient.get<ApiResponse<GetOffered>>(
    api.teacher.jobOffer,
  );
  return data.data || [];
};

export const useGetReceivedOffer = () => {
  return useQuery(['receivedteacher'], () => getReceivedOffer(), {
    keepPreviousData: true,
  });
};

const getSentOffer = async () => {
  const { data } = await HttpClient.get<ApiResponse<VacancyDetail>>(
    api.teacher.appliedVacancy,
  );
  return data.data || [];
};

export const useGetSentOffer = () => {
  return useQuery(['sentteacher'], () => getSentOffer(), {
    keepPreviousData: true,
  });
};
