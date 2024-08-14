import { OrganizationTypeEnum } from 'pages/Register/OrganizationRegistration/firstStep/interface';

import * as Yup from 'yup';

export const CombinedFormValidation = Yup.object().shape({
  user: Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Please enter a valid email'),
    address: Yup.string().required('Address is required'),
    password: Yup.string().required('Password is required'),
    confirm_password: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
    user_type: Yup.string().required('User type is required'),
    phone: Yup.string()
      .required('Phone number is required')
      .matches(/^\d{10}$/, 'Phone number must be 10 digits long'),
  }),
  org: Yup.object().shape({
    name: Yup.string().trim().required('Name is required'),
    phone_number: Yup.string()
      .required('Phone number is required')
      .matches(/^\d{10}$/, 'Phone number must be 10 digits long'),
    pan_number: Yup.string().trim().required('PAN number is required'),
    organization_type: Yup.string().required('Organization type is required'),
    web_site_link: Yup.string()
      .trim()
      .required('Organization website is required'),
    address: Yup.string().trim().required('Address is required'),
  }),
});

export const CombinedDefaultValues = {
  user: {
    email: '',
    address: '',
    password: '',
    confirm_password: '',
    user_type: '3',
    phone: '',
  },
  org: {
    name: '',
    phone_number: '',
    pan_number: '',
    organization_type: OrganizationTypeEnum.PRIVATE,
    web_site_link: '',
    address: '',
  },
};
