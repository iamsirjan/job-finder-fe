import { useQuery } from 'react-query';
import { HttpClient } from './service-axios';
import { ApiResponse, api } from './service-api';
import { OrganizationFullDetail } from './service-offer-teacher';
import { IVacancyResponse } from 'pages/Admin/Vacancy/interface';

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

interface Grade {
  id: number;
  name: string;
}

interface Subject {
  id: number;
  name: string;
}

interface Degree {
  id: number;
  name: string;
}

interface Teacher {
  id: number;
  grade: Grade[];
  subject: Subject[];
  degree: Degree;
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
  organization: number | null;
  province: number;
  district: number;
  municipality: number;
}

interface UserProfile {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  gender: string;
  date_of_birth: string;
  profile_picture: string;
  user_details: UserDetails;
}

interface UserDetails {
  id: number;
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

interface Document {
  id: number;
  file: string;
}

interface Matching {
  matched_subject: string[];
  matched_degree: string;
  matched_grade: string[];
  match_lodging: boolean;
  match_fooding: boolean;
  match_salary: MatchSalary;
  match_organization_type: boolean;
  match_experience_in_years: boolean;
}

interface MatchSalary {
  salary: number;
  is_matched: boolean;
}

interface TeacherFullDetail {
  teacher: Teacher;
  user_profile: UserProfile;
  document: Document[];
  cv: Document[];
  citizenship: Document[];
}

interface TeacherData {
  teacher_full_detail: TeacherFullDetail;
  matching: {
    matching: Matching;
    match_count: number;
  };
}

export interface ITeacherMatchingResponse {
  id: string;
  name: string;
  teacher_details: TeacherData[];
  vacancy_details: IVacancyResponse;
}

const getMatchingVacancyList = async (teacherId?: string) => {
  const url = teacherId
    ? `${api.teacher.getMatchingVacancy}?teacher=${teacherId}`
    : api.teacher.getMatchingVacancy;

  const { data } = await HttpClient.get<IVacancyResponse>(url);
  return data || [];
};

export const useGetMatchingVacancyList = (teacherId?: string) => {
  return useQuery(
    ['matchingvacancy', teacherId],
    () => getMatchingVacancyList(teacherId),
    {
      keepPreviousData: true,
    },
  );
};

const getMatchingTeacherList = async () => {
  const { data } = await HttpClient.get<ApiResponse<IVacancyMatchingResponse>>(
    api.organization.getMatchingVacancy,
  );
  return data || [];
};

export const useGetMatchingTeacherList = () => {
  return useQuery(['matchingvacancyteacher'], () => getMatchingTeacherList(), {
    keepPreviousData: true,
  });
};
