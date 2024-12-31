import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserProfileAdaptor, profileAdaptor, ProfileReq, uploadMediaAdaptor } from 'src/core/adaptors';
import { isTouchDevice } from 'src/core/helpers/device-type-detector';
import { Files } from 'src/modules/General/components/FileUploader/index.types';
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
  const [attachments, setAttachments] = useState<Files[]>([]);
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
  const descInputHeight = isTouchDevice() ? '188px' : '128px';
  const length = (watch('description') || '').length;

  const onDropFiles = async (newFiles: File[]) => {
    newFiles.forEach(async (file: File) => {
      const { error, data } = await uploadMediaAdaptor(file);
      if (error) return;
      data && setAttachments([{ id: data.id, url: data.url }]);
    });
  };

  const onSubmit = async () => {
    const { orgName, description } = getValues();
    const params: ProfileReq = {
      logoId: attachments[0]?.id || '',
      name: orgName,
      description,
    };
    const res = await profileAdaptor(params);
    if (res.data) {
      const userRes = await getUserProfileAdaptor();
      dispatch(setUserProfile(userRes.data));
      dispatch(setOrgProfile(res.data));
    }
    if (!res.error) {
      navigate('/');
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isValid,
    getValues,
    attachments,
    img: attachments[0]?.url || '',
    onDropFiles,
    descInputHeight,
    onSubmit,
    length,
  };
};
