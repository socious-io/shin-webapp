import { yupResolver } from '@hookform/resolvers/yup';
import debounce from 'lodash.debounce';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { preRegister, registerAdaptor } from 'src/core/adaptors';
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
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
    watch,
    trigger,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });
  const email = watch('email');

  const preRegisterCheck = async () => {
    setLoading(true);
    const res = await preRegister(email);
    if (res.error) {
      setError('email', {
        type: 'manual',
        message: res.error,
      });
    } else if (res.data?.email !== 'AVAILABLE') {
      setError('email', {
        type: 'manual',
        message: 'Email already exists',
      });
    } else setDisabled(false);
    setLoading(false);
  };
  const onContinue = async () => {
    setDisabled(true);
    const registerRes = await registerAdaptor(email);
    if (registerRes.error) {
      setError('email', {
        type: 'manual',
        message: registerRes.error,
      });
      setDisabled(false);
    } else navigate(`/sign-up/verification?email=${email}`);
  };

  useEffect(() => {
    setDisabled(true);
    const checkEmailValidity = debounce(async () => {
      const isValidEmail = await trigger('email');
      if (isValidEmail) {
        preRegisterCheck();
      }
    }, 500);

    checkEmailValidity();

    return () => {
      checkEmailValidity.cancel();
    };
  }, [email, trigger]);

  const continueWithSocious = () => navigate('/oauth/socious');

  const continueWithGoogle = () => navigate('/oauth/google');

  return {
    register,
    handleSubmit,
    errors,
    getValues,
    onContinue,
    disabled,
    loading,
    continueWithSocious,
    continueWithGoogle,
  };
};
