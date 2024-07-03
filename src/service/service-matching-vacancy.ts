import { useQuery } from 'react-query';
import { HttpClient } from './service-axios';
import { ApiResponse, api } from './service-api';
import { OrganizationFullDetail } from './service-offer-teacher';

export interface IVacancyMatchingResponse {
  data: {
    id: string;
    organization: OrganizationFullDetail;
    qualification: {
      id: string;
      name: string;
    }[];
    grade: string[];
    subject: string[];
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
    matching: {
      matched_subject: string[];
      matched_degree: string[];
      matched_grade: string[];
      match_loding: boolean;
      match_fooding: boolean;
      match_salary: {
        salary: string;
        is_matched: boolean;
      };
      match_organization_type: boolean;
      match_experience_in_years: boolean;
    };
    match_count: number;
  }[];
}

const getMatchingVacancyList = async () => {
  const { data } = await HttpClient.get<ApiResponse<IVacancyMatchingResponse>>(
    api.teacher.getMatchingVacancy,
  );
  return data || [];
};

export const useGetMatchingVacancyList = () => {
  return useQuery(['matchingvacancy'], () => getMatchingVacancyList(), {
    keepPreviousData: true,
  });
};
