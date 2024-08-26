import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { detailsAdaptor, detailsAdaptorReq } from 'src/core/adaptors/signUp';
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
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
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
    // TODO: Apply API call
    const { name, lastName, password, jobTitle } = getValues();
    const param: detailsAdaptorReq = {
      firstName: name,
      lastName,
      email,
      password,
      jobTitle,
    };
    const res = await detailsAdaptor(param);
    if (res.error) {
      setError('password', {
        type: 'manual',
        message: res.error,
      });
      return;
    }

    navigate(`/sign-up/profile`);
  };
  return {
    email,
    register,
    handleSubmit,
    errors,
    isValid,
    getValues,
    onContinue,
  };
};
