import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    name: yup.string().trim().required('Required'),
    lastName: yup.string().trim().required('Required'),
    jobTitle: yup.string(),
    password: yup.string().required('Required'),
  })
  .required();

export const useDetail = () => {
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

  return {
    register,
    handleSubmit,
    errors,
    isValid,
    getValues,
  };
};
