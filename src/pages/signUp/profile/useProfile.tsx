import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserProfileAdaptor, profile, ProfileReq } from 'src/core/adaptors';
import { isTouchDevice } from 'src/core/helpers/device-type-detector';
import { setOrgProfile } from 'src/store/reducers/org.reducer';
import { setUserProfile } from 'src/store/reducers/user.reducer';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    orgName: yup.string().trim().required('Required'),
    description: yup.string().max(160, 'Too long'),
  })
  .required();

export const useProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [attachment, setAttachment] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    watch,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const onSubmit = async () => {
    const { orgName, description } = getValues();
    const params: ProfileReq = {
      imageUrl: attachment[0],
      name: orgName,
      description,
    };
    const res = await profile(params);
    if (res.data) {
      const userRes = await getUserProfileAdaptor();
      dispatch(setUserProfile(userRes.data));
      dispatch(setOrgProfile(res.data));
    }
    if (!res.error) {
      navigate('/');
    }
  };

  const descInputHeight = isTouchDevice() ? '188px' : '128px';
  const length = (watch('description') || '').length;
  return {
    register,
    handleSubmit,
    errors,
    isValid,
    getValues,
    img: attachment[0],
    setAttachment,
    descInputHeight,
    onSubmit,
    length,
  };
};
