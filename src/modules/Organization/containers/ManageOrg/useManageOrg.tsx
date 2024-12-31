import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import {
  changeOrgProfileAdaptor,
  profileAdaptor,
  OrgProfileReq,
  OrgProfileRes,
  uploadMediaAdaptor,
} from 'src/core/adaptors';
import { Files } from 'src/modules/General/components/FileUploader/index.types';
import { setOrgProfile } from 'src/store/reducers/org.reducer';
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: orgId } = useParams() || '';
  const { profile } = (useLoaderData() as { profile: OrgProfileRes }) || {};
  const defaultProfile = profile?.logo?.id ? [{ id: profile.logo.id || '', url: profile.logo.url || '' }] : [];
  const [letterCount, setLetterCount] = useState(profile?.description?.length || 0);
  const [attachments, setAttachments] = useState<Files[]>(defaultProfile);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    setError,
    clearErrors,
  } = useForm<OrgProfileReq>({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const initializeValues = () => {
    const initialVal = {
      name: profile?.name || '',
      description: profile?.description || '',
    };
    setAttachments(defaultProfile);
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

  const onCopy = () => {
    if (profile?.did) {
      navigator.clipboard.writeText(profile.did);
      setOpenSnackbar(true);
    }
  };

  const onChangeDescription = (value: string) => {
    setValue('description', value);
    setLetterCount(value.length);
    if (value.length > limitDescription) setError('description', { message: 'Too long' });
    else clearErrors('description');
  };

  const onSubmit = async (formData: OrgProfileReq) => {
    const payload = {
      ...formData,
      logoId: attachments[0]?.id || '',
    };
    if (orgId) {
      await changeOrgProfileAdaptor(orgId, payload);
    } else {
      const { data: createdOrgId, error } = await profileAdaptor(payload);
      if (error) {
        setErrorMessage(translate('org-profile-create-error'));
        return;
      } else if (createdOrgId) {
        dispatch(setOrgProfile(createdOrgId));
        navigate(createdOrgId);
      }
    }
  };

  return {
    data: {
      translate,
      letterCount,
      register,
      errors,
      attachments,
      avatarImg: attachments[0]?.url || '',
      did: profile?.did || '',
      orgId,
      openSnackbar,
      errorMessage,
    },
    operations: {
      handleSubmit,
      onSubmit,
      onDropFiles,
      onChangeDescription,
      onCopy,
      setOpenSnackbar,
    },
  };
};
