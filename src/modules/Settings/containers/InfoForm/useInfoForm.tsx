import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { changeUserProfileAdaptor, UserProfileReq, UserProfileRes } from 'src/core/adaptors';
import { setUserProfile } from 'src/store/reducers/user.reducer';
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
  const dispatch = useDispatch();
  const { userProfile } = (useLoaderData() as { userProfile: UserProfileRes }) || {};
  const { id: avatarId = '', url: avatarImage = '' } = userProfile.avatar || {};
  const [attachment, setAttachment] = useState<string[]>([avatarId]);
  const [attachmentUrl, setAttachmentUrl] = useState<string[]>([avatarImage]);
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
    setAttachment([avatarId]);
    setAttachmentUrl([avatarImage]);
    reset(initialVal);
  };

  useEffect(() => initializeValues(), []);

  const onSubmit = async formData => {
    const payload = {
      ...formData,
      avatarId: attachment[0],
    };
    const { data } = await changeUserProfileAdaptor(payload);
    data && dispatch(setUserProfile(data));
  };

  return {
    data: { translate, register, avatarImg: attachmentUrl[0], nameErrors, email: userProfile.email },
    operations: { handleSubmit, onSubmit, setAttachment, setAttachmentUrl },
  };
};
