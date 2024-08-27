import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { forgetPasswordAdaptor } from 'src/core/adaptors/forgetPassword';
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
    formState: { errors },
    getValues,
    setError,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const handleForgetPassword = async () => {
    const { email } = getValues();
    const res = await forgetPasswordAdaptor(email);
    if (res.error)
      setError('email', {
        type: 'manual',
        message: 'Enter a correct email',
      });
    else navigate(`../otp?email=${email}`);
  };

  const handleBack = () => {
    navigate('/sign-in/email');
  };

  return { register, errors, handleSubmit, handleForgetPassword, handleBack };
};
