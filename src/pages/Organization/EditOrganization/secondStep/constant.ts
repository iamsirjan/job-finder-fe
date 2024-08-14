import { object, string } from 'yup';

export const FormValidation = object().shape({
  latitude: string().trim().required('latitude is required'),
  longitude: string().trim().required('longitude is required'),
});

export const DefaultValues = {
  longitude: 0,
  latitude: 0,
};
