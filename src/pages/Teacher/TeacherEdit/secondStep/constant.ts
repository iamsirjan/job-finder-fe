import * as yup from 'yup';
export const FormValidation = yup.object().shape({
  degree: yup
    .array()
    .of(yup.string().required('At least one degree is required')),
  grade: yup
    .array()
    .of(yup.string().required('At least one grade is required')),
  subject: yup
    .array()
    .of(yup.string().required('At least one subject is required')),
});

export const DefaultValues = {
  degree: [],
  grade: [],
  subject: [],
  documents: [],
  citizen_ship: [],
  cv: [],
  can_work_in_village: false,
  can_work_in_city: false,
};
