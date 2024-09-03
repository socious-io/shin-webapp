import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router-dom';
import { changeOrgProfileAdaptor, ProfileReq, ProfileRes } from 'src/core/adaptors';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    name: yup.string().required('This field is required'),
    description: yup.string().max(160, 'Too long').optional(),
  })
  .required();

export const useManageOrg = () => {
  const limitDescription = 160;
  const { t: translate } = useTranslation();
  const { profile } = (useLoaderData() as { profile: ProfileRes }) || {};
  const [letterCount, setLetterCount] = useState(0);
  const [attachment, setAttachment] = useState<string[]>([profile.imageUrl || '']);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    setError,
    clearErrors,
  } = useForm<ProfileReq>({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const initializeValues = () => {
    const initialVal = {
      name: profile.name || '',
      description: profile.description || '',
    };
    setAttachment([]);
    reset(initialVal);
  };

  useEffect(() => initializeValues(), []);

  const onSubmit = async (formData: ProfileReq) => {
    console.log('submit', formData);
    const payload = {
      ...formData,
      imageUrl: attachment[0],
    };
    await changeOrgProfileAdaptor(payload);
  };

  const onCopy = () => {
    navigator.clipboard.writeText(profile.did);
    setOpenSnackbar(true);
  };

  const onChangeDescription = (value: string) => {
    setValue('description', value);
    setLetterCount(value.length);
    if (value.length > limitDescription) setError('description', { message: 'Too long' });
    else clearErrors('description');
  };

  return {
    data: { translate, letterCount, register, errors, avatarImg: attachment[0], did: profile.did, openSnackbar },
    operations: { handleSubmit, onSubmit, onChangeDescription, setAttachment, onCopy, setOpenSnackbar },
  };
};
