import { object, string } from 'yup';

export const DegreeFormValidation = object().shape({
  name: string()
    .required('Stream name is required')
    .max(250, 'Max characters allowed are 250')
    .trim(),

  stream: string().min(1, 'Please select one stream'),
});

export const DegreeDefaultValues = {
  name: '',
  stream: '',
};
