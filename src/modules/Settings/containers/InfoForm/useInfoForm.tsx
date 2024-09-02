import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router-dom';
import { changeUserProfileAdaptor, UserProfileReq, UserProfileRes } from 'src/core/adaptors';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    firstName: yup.string().required('This field is required'),
    lastName: yup.string().required('This field is required'),
    jobTitle: yup.string(),
  })
  .required();

export const useInfoForm = () => {
  const { t: translate } = useTranslation();
  const { userProfile } = (useLoaderData() as { userProfile: UserProfileRes }) || {};
  const [attachment, setAttachment] = useState<string[]>([userProfile.imageUrl || '']);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserProfileReq>({
    mode: 'all',
    resolver: yupResolver(schema),
  });
  const nameErrors = errors['firstName']?.message || errors['lastName']?.message;

  const initializeValues = () => {
    const initialVal = {
      firstName: userProfile.firstName || '',
      lastName: userProfile.lastName || '',
      jobTitle: userProfile.jobTitle || '',
    };
    setAttachment([]);
    reset(initialVal);
  };

  useEffect(() => initializeValues(), []);

  const onSubmit = async formData => {
    console.log('submit', formData);
    const payload = {
      ...formData,
      imageUrl: attachment[0],
    };
    await changeUserProfileAdaptor(payload);
  };

  return {
    data: { translate, register, avatarImg: attachment[0], nameErrors, email: userProfile.email },
    operations: { handleSubmit, onSubmit, setAttachment },
  };
};
