import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
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
  const { t: translate } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordReq>({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const onSubmit = async formData => {
    console.log('submit', formData);
    await changePasswordAdaptor(formData);
  };

  return { data: { translate, register, errors }, operations: { handleSubmit, onSubmit } };
};
