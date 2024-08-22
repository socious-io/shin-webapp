import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { callSignIn } from 'src/core/adaptors/signIn';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';
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
    // password: yup.string().required('Enter a correct password'),
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

  const onContinue = () => {
    // const { email, password } = getValues()
    // const res = await callSignIn(email, password)
    // const setStorages = [
    //   nonPermanentStorage.set({ key: 'access_token', value: res.access_token }),
    //   nonPermanentStorage.set({ key: 'refresh_token', value: res.refresh_token }),
    //   nonPermanentStorage.set({ key: 'token_type', value: res.token_type })]
    // await Promise.all(setStorages)
    navigate(`/sign-in/password?email=${getValues().email}`);

    // catch (error) {
    //   setError('email', {
    //     type: 'manual',
    //     message: 'Username or password not matched',
    //   });
    // }
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
