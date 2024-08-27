import { AvailableTypeEnum } from 'pages/Register/TeacherRegistration/firstStep/constant';

export type IvacancyRequest = {
  name: string;
  qualification: string;
  grade: string[];
  subject: string[];
  no_of_applications: number;
  from_date: string;
  to_date: string;
  experience_in_years: number;
  allow_fresher: boolean;
  job_type: string;
  lodging: boolean;
  organization: string;
  fooding: boolean;
  salary: number;
  salary_per_period: number;
  job_from_time: string;
  job_to_time: string;
  is_active: boolean;
};

export interface IVacancyDetails {
  data: {
    name: string;
    id: string;
    qualification: {
      id: string;
      name: string;
    };
    grade: string[];
    subject: string[];
    no_of_applicants: number;
    from_date: Date;
    to_date: Date;
    experience_in_years: number;
    allow_fresher: boolean;
    job_type: AvailableTypeEnum;
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
  };
}

export interface IVacancyResponse {
  data: {
    name: string;
    id: string;
    qualification: string;
    grade: string[];
    subject: string[];
    is_admin_created: boolean;
    no_of_applicants: number;
    from_date: Date;
    to_date: Date;
    experience_in_years: number;
    allow_fresher: boolean;
    job_type: AvailableTypeEnum;
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
  }[];
}
