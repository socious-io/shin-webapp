import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { changeUserProfileAdaptor, uploadMediaAdaptor, UserProfileReq, UserProfileRes } from 'src/core/adaptors';
import { Files } from 'src/modules/General/components/FileUploader/index.types';
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
  const defaultUserProfile = userProfile?.avatar?.id
    ? [{ id: userProfile.avatar.id || '', url: userProfile.avatar.url || '' }]
    : [];
  const [attachments, setAttachments] = useState<Files[]>(defaultUserProfile);
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
      firstName: userProfile?.firstName || '',
      lastName: userProfile?.lastName || '',
      jobTitle: userProfile?.jobTitle || '',
    };
    setAttachments(defaultUserProfile);
    reset(initialVal);
  };

  useEffect(() => initializeValues(), []);

  const onDropFiles = async (newFiles: File[]) => {
    newFiles.forEach(async (file: File) => {
      const { error, data } = await uploadMediaAdaptor(file);
      if (error) return;
      data && setAttachments([{ id: data.id, url: data.url }]);
    });
  };

  const onSubmit = async formData => {
    const payload = {
      ...formData,
      avatarId: attachments[0]?.id || '',
    };
    const { data } = await changeUserProfileAdaptor(payload);
    data && dispatch(setUserProfile(data));
  };

  return {
    data: {
      translate,
      register,
      attachments,
      avatarImg: attachments[0]?.url || '',
      nameErrors,
      email: userProfile?.email || '',
    },
    operations: { handleSubmit, onSubmit, onDropFiles },
  };
};
