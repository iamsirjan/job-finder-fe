export type IvacancyRequest = {
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
  fooding: boolean;
  salary: number;
  salary_per_period: number;
  job_from_time: string;
  job_to_time: string;
  is_active: boolean;
};

export interface IVacancyResponse {
  id: string;
  qualification: string;
  grade: string[];
  subject: string[];
  no_of_applications: number;
  from_date: Date;
  to_date: Date;
  experience_iin_years: number;
  allow_fresher: boolean;
  job_type: string;
  lodging: boolean;
  fooding: boolean;
  salary: number;
  salary_per_period: number;
  job_from_time: string;
  job_to_time: string;
  is_active: boolean;
  organization_full_detail: {
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
}
