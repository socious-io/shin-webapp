import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { signInAdaptor } from 'src/core/adaptors/signIn';
import { getIdentityAdaptor } from 'src/core/adaptors/site';
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
      const res = await signInAdaptor(email, password);
      if (res.error) {
        return;
      }
      if (res.access_token && res.refresh_token && res.token_type) {
        const setStorages = [
          nonPermanentStorage.set({ key: 'access_token', value: res.access_token }),
          nonPermanentStorage.set({ key: 'refresh_token', value: res.refresh_token }),
          nonPermanentStorage.set({ key: 'token_type', value: res.token_type }),
        ];
        await Promise.all(setStorages);
        const identityRes = await getIdentityAdaptor();
        identityRes.identity && dispatch(setIdentity(identityRes.identity));
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
