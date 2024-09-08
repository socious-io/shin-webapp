import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { preRegister, registerAdaptor, sendOtp } from 'src/core/adaptors';
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
    const { email } = getValues();
    // FIXME: DO it after Yup validation
    /* const res = await preRegister(email);
    if (res.error) {
      setError('email', {
        type: 'manual',
        message: res.error,
      });
      return;
    }
    if (res.data?.email !== 'AVAILABLE') {
      setError('email', {
        type: 'manual',
        message: 'Email already exists',
      });
      return;
    } */
    const registerRes = await registerAdaptor(email);
    if (registerRes.error)
      setError('email', {
        type: 'manual',
        message: registerRes.error,
      });
    else navigate(`/sign-up/verification?email=${getValues().email}`);
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
