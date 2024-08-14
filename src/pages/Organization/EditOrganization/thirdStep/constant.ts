import { object, string, array } from 'yup';

const CourseDetailSchema = object().shape({
  name: string().trim().required('Course name is required'),
  price: string().trim().required('Price is required'),
  duration: string().trim().required('Duration is required'),
  grade: string().trim().required('Grade is required'),
});

export const FormValidation = object().shape({
  gradeSelect: array().of(string().required('Grade is required')),
  courses: array().of(CourseDetailSchema),
});
export const DefaultValues = {
  gradeSelect: [],
  courses: [
    {
      name: '',
      price: '',
      duration: '',
      grade: '',
    },
  ],
};
