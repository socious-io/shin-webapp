import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { preRegisterAdaptor } from 'src/core/adaptors/signUp';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    email: yup
      .string()
      .trim()
      .email('Enter a correct email')
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i, 'Enter a correct email')
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
    setError,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const onContinue = async () => {
    const res = await preRegisterAdaptor(getValues('email'));
    if (res.error) {
      setError('email', {
        type: 'manual',
        message: res.error,
      });
      return;
    }
    if (res.email) {
      setError('email', {
        type: 'manual',
        message: 'Email already exists',
      });
      return;
    }
    navigate(`/sign-up/verification?email=${getValues().email}`);
  };

  return {
    register,
    handleSubmit,
    errors,
    isValid,
    getValues,
    onContinue,
  };
};