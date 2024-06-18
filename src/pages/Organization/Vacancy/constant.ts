import * as yup from 'yup';

export const VacancyFormValidation = yup.object().shape({
  grade: yup
    .array()
    .of(yup.string().required('Each grade must be a valid string'))
    .min(1, 'At least one grade is required')
    .required('Grade is required'),

  subject: yup
    .array()
    .of(yup.string().required('Each subject must be a valid string'))
    .min(1, 'At least one subject is required')
    .required('Subject is required'),

  qualification: yup.string().required('Minimum qualification is required'),

  no_of_applications: yup
    .number()
    .typeError('Number of applicants must be a number')
    .min(1, 'At least one applicant is required')
    .required('Number of applicants is required'),

  job_type: yup
    .string()
    .oneOf(['1', '2'], 'Job type must be either PARTTIME or FULLTIME')
    .required('Job type is required'),

  salary_per_period: yup
    .number()
    .typeError('Salary must be a number')
    .positive('Salary must be a positive number')
    .required('Salary per period is required'),

  job_from_time: yup.string().when('job_type', {
    is: '2',
    then: (schema) =>
      schema.required('Job from time is required for part-time jobs'),
    otherwise: (schema) => schema.notRequired(), // Optional if not part-time
  }),

  job_to_time: yup.string().when('job_type', {
    is: '1',
    then: (schema) =>
      schema.required('Job to time is required for part-time jobs'),
    otherwise: (schema) => schema.notRequired(), // Optional if not part-time
  }),

  lodging: yup.boolean(),
  fooding: yup.boolean(),
  allow_fresher: yup.boolean(),

  experience_in_years: yup.number().when('allow_fresher', {
    is: false,
    then: (schema) =>
      schema
        .typeError('Experience must be a number')
        .min(1, 'Experience must be at least 1 year')
        .required('Experience in years is required'),
    otherwise: (schema) => schema.notRequired(), // Optional if freshers are allowed
  }),

  from_date: yup.date().nullable(),
  to_date: yup
    .date()
    .nullable()
    .min(yup.ref('from_date'), 'To date cannot be before from date'),
});

export const VacancyDefaultValues = {
  subject: [],
  grade: [],
  qualification: '',
  no_of_applicants: 0,
  from_date: undefined,
  to_date: undefined,
  experience_in_years: 0,
  allow_fresher: false,
  job_type: '',
  lodging: false,
  fooding: false,
  salary: 0,
  job_from_time: undefined,
  job_to_time: undefined,
  is_active: true,
};
