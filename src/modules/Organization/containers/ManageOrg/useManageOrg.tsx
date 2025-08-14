import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData, useParams } from 'react-router-dom';
import {
  updateOrgProfileAdaptor,
  OrgProfileReq,
  OrgProfileRes,
  uploadMediaAdaptor,
  UploadMediaRes,
} from 'src/core/adaptors';
import { translate } from 'src/core/helpers/utils';
import { RootState } from 'src/store';
import { setIdentityList } from 'src/store/reducers/identity.reducer';
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
  const dispatch = useDispatch();
  const { id: orgId } = useParams() || '';
  const { profile } = (useLoaderData() as { profile: OrgProfileRes }) || {};
  const { entities: identities, currentId } = useSelector((state: RootState) => state.identity);
  const [letterCount, setLetterCount] = useState(profile?.description?.length || 0);
  const [attachment, setAttachment] = useState<UploadMediaRes | null>(profile?.logo);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState<{ open: boolean; type: 'success' | 'error'; message: string }>({
    open: false,
    type: 'success',
    message: '',
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: { name: profile?.name || '', description: profile?.description || '' },
  });

  const onDropFiles = async (newFiles: File[]) => {
    newFiles.forEach(async (file: File) => {
      const { error, data } = await uploadMediaAdaptor(file);
      if (error) return;
      data && setAttachment(data);
    });
  };

  const onCopy = () => {
    if (profile?.did) {
      navigator.clipboard.writeText(profile.did);
      setOpenSnackbar({ open: true, type: 'success', message: translate('schema-copy-snackbar') });
    }
  };

  const onChangeDescription = (value: string) => {
    setValue('description', value);
    setLetterCount(value.length);
    if (value.length > limitDescription) setError('description', { message: 'Too long' });
    else clearErrors('description');
  };

  const onSubmit = async (formData: OrgProfileReq) => {
    setLoading(true);
    const payload = { ...formData, logo: attachment || undefined };
    if (!orgId) return;
    const { error, data } = await updateOrgProfileAdaptor(payload, orgId);
    if (error) setOpenSnackbar({ open: true, type: 'error', message: translate('org-profile-error-message') });
    if (data) {
      const filteredIdentities = identities.map(identity => {
        return identity.id === currentId ? data : identity;
      });
      dispatch(setIdentityList({ entities: filteredIdentities, currentId }));
      setOpenSnackbar({ open: true, type: 'success', message: translate('org-profile-success-message') });
    }
    setLoading(false);
  };

  return {
    data: {
      translate,
      letterCount,
      register,
      errors,
      attachments: attachment ? [attachment] : [],
      avatarImg: attachment?.url || '',
      did: profile?.did || '',
      orgId,
      loading,
      openSnackbar,
    },
    operations: { handleSubmit, onSubmit, onDropFiles, onChangeDescription, onCopy, setOpenSnackbar },
  };
};
