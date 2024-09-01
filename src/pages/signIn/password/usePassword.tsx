import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getIdentity, signIn } from 'src/core/adaptors';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';
import { setIdentity } from 'src/store/reducers/identity.reducer';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    password: yup.string().required('Enter a correct password'),
  })
  .required();

export const usePassword = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  const dispatch = useDispatch();
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

  const onSubmit = async () => {
    try {
      const { password } = getValues();
      const res = await signIn(email, password);

      if (res.error) {
        return;
      }
      if (res.data) {
        const setStorages = [
          nonPermanentStorage.set({ key: 'access_token', value: res.data.access_token }),
          nonPermanentStorage.set({ key: 'refresh_token', value: res.data.refresh_token }),
          nonPermanentStorage.set({ key: 'token_type', value: res.data.token_type }),
        ];
        await Promise.all(setStorages);
        const identityRes = await getIdentity();
        identityRes.data && dispatch(setIdentity(identityRes.data.identity));
        navigate(`/home`);
      }
    } catch (error) {
      setError('password', {
        type: 'manual',
        message: 'Username or password not matched',
      });
    }
  };
  return { email, register, errors, handleSubmit, onSubmit };
};
