import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { resetPasswordAdaptor } from 'src/core/adaptors/forgetPassword';
import * as yup from 'yup';

export const useNewPassword = () => {
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

  const navigate = useNavigate();

  const schema = yup.object().shape({
    password: yup
      .string()
      .required('Required')
      .test('password-validation', 'Weak password', function (value) {
        const errors: yup.ValidationError[] = [];
        if (!value || value.length < 8) errors.push(this.createError({ path: 'password', message: '' }));

        if (!value || !passwordPattern.test(value)) errors.push(this.createError({ path: 'password', message: '' }));

        if (errors.length) return false;
        return true;
      }),
    confirmPassword: yup.string().test('passwords-match', 'Passwords entered are not the same', function (value) {
      return this.parent.password === value;
    }),
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
    navigate('/sign-in/email');
  };
  return { handleBack, register, errors, handleSubmit, handleReset };
};
