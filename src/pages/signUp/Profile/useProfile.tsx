import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { isTouchDevice } from 'src/core/helpers/device-type-detector';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    imageUrl: yup.string().trim().required('Required'),
    orgName: yup.string().trim().required('Required'),
    description: yup.string(),
  })
  .required();

export const useProfile = () => {
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

  const descInputHeight = isTouchDevice() ? '188px' : '128px';
  return {
    register,
    handleSubmit,
    errors,
    isValid,
    getValues,
    img: getValues('imageUrl'),
    setAttachment,
    descInputHeight,
  };
};
