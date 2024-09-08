import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { details, DetailsReq } from 'src/core/adaptors';
import { setUserProfile } from 'src/store/reducers/user.reducer';
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
  const dispatch = useDispatch();
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
    const { name, lastName, password, jobTitle } = getValues();
    const param: DetailsReq = {
      firstName: name,
      lastName,
      email,
      password,
      jobTitle,
    };
    const res = await details(param);
    dispatch(setUserProfile(res.data));
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
