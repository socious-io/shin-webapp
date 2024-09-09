import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { changeOrgProfileAdaptor, profile as profileAdaptor, OrgProfileReq, OrgProfileRes } from 'src/core/adaptors';
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
  const { url: logoUrl = '', id: logoId = '' } = profile?.logo || {};
  const [letterCount, setLetterCount] = useState(profile?.description?.length || 0);
  const [attachment, setAttachment] = useState<string[]>([logoId]);
  const [attachmentUrl, setAttachmentUrl] = useState<string[]>([logoUrl]);
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
    setAttachment([logoId]);
    setAttachmentUrl([logoUrl]);
    reset(initialVal);
  };

  useEffect(() => initializeValues(), []);

  const onSubmit = async (formData: OrgProfileReq) => {
    if (orgId) {
      const updatePayload = {
        ...formData,
        logoId: attachment[0],
      };
      await changeOrgProfileAdaptor(orgId, updatePayload);
    } else {
      //FIXME: imageUrl to logoId
      const createPayload = {
        ...formData,
        imageUrl: attachment[0],
      };
      const { data: createdOrgId, error } = await profileAdaptor(createPayload);
      if (error) {
        setErrorMessage('An error occurred in creating your organization');
        return;
      } else if (createdOrgId) {
        dispatch(setOrgProfile(createdOrgId));
        navigate(createdOrgId);
      }
    }
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

  return {
    data: {
      translate,
      letterCount,
      register,
      errors,
      avatarImg: attachmentUrl[0],
      did: profile?.did || '',
      orgId,
      openSnackbar,
      errorMessage,
    },
    operations: {
      handleSubmit,
      onSubmit,
      onChangeDescription,
      setAttachment,
      setAttachmentUrl,
      onCopy,
      setOpenSnackbar,
    },
  };
};
