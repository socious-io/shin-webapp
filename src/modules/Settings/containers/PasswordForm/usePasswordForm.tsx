import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { changePasswordAdaptor, PasswordReq } from 'src/core/adaptors';
import { passwordPattern } from 'src/core/helpers/regexs';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    currentPass: yup.string().required('Current password is required'),
    newPass: yup
      .string()
      .required('Password is required')
      .notOneOf([yup.ref('currentPass'), null], 'Your password cannot be the same as the current password')
      .min(8, 'Minimum 8 characters')
      .matches(passwordPattern, 'Password complexity is week'),
    confirmPass: yup
      .string()
      .required('Confirm password is required')
      .oneOf([yup.ref('newPass')], 'Passwords must match'),
  })
  .required();

export const usePasswordForm = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordReq>({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const onSubmit = async formData => {
    const { error } = await changePasswordAdaptor(formData);
    error && setErrorMessage(error);
  };

  return { data: { register, errors, errorMessage }, operations: { handleSubmit, onSubmit } };
};
