import { object, string } from 'yup';
import * as Yup from 'yup';
export const RegisterFormValidation = object().shape({
  email: string()
    .required('Email is required')
    .email('Please enter a valid email'),

  address: string().required('Address is required'),
  password: string().required('password is required'),
  confirm_password: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
  user_type: string().required('user type is required'),
  phone: Yup.string()

    .required('Phone number is required')
    .matches(/^\d{10}$/, 'Phone number must be 10 digits long'),
});

export const RegisterDefaultValues = {
  email: '',
  address: '',
  password: '',
  confirm_password: '',
  user_type: '',
  phone: '',
};
