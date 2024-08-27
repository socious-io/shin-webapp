import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { profileAdaptor, profileAdaptorReq } from 'src/core/adaptors/signUp';
import { isTouchDevice } from 'src/core/helpers/device-type-detector';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    orgName: yup.string().trim().required('Required'),
    description: yup.string(),
  })
  .required();

export const useProfile = () => {
  const navigate = useNavigate();
  const [attachment, setAttachment] = useState<string[]>([]);
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
    const { orgName, description } = getValues();
    const params: profileAdaptorReq = {
      imageUrl: attachment[0],
      name: orgName,
      description,
    };
    const res = await profileAdaptor(params);
    if (!res.error) {
      navigate('/home');
    }
  };

  const descInputHeight = isTouchDevice() ? '188px' : '128px';
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
  };
};
