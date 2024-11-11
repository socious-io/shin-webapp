import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { emailPattern } from 'src/core/helpers/regexs';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    email: yup
      .string()
      .trim()
      .email('Enter a correct email')
      .matches(emailPattern, 'Enter a correct email')
      .required('Enter a correct email'),
  })
  .required();

export const useEmail = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const onContinue = () => {
    navigate(`/sign-in/password?email=${getValues().email}`);
  };

  const continueWithSocious = () => navigate('/oauth/socious');

  const continueWithGoogle = () => navigate('/oauth/google');

  return {
    register,
    handleSubmit,
    errors,
    isValid,
    getValues,
    onContinue,
    continueWithSocious,
    continueWithGoogle,
  };
};
