import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { resetPasswordAdaptor } from 'src/core/adaptors';
import * as yup from 'yup';

export const useNewPassword = () => {
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

  const navigate = useNavigate();
  const { t: translate } = useTranslation();

  const schema = yup.object().shape({
    password: yup
      .string()
      .required('Required')
      .min(8, 'Minimum 8 characters')
      .test('password-validation', 'Weak password', function (value) {
        if (!passwordPattern.test(value)) return false;
        return true;
      }),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords entered are not the same'),
  });

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

  const handleReset = async () => {
    const res = await resetPasswordAdaptor(getValues().password);
    if (res.error)
      setError('password', {
        type: 'manual',
        message: res.error,
      });
    else navigate('../reset');
  };

  const handleBack = () => {
    navigate('/sign-in');
  };
  return { handleBack, register, errors, handleSubmit, handleReset, translate };
};
