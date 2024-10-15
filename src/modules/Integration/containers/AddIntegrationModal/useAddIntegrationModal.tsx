import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { addOrUpdateIntegrationAdaptor, Integration, IntegrationReq } from 'src/core/adaptors';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    name: yup.string().required('This field is required'),
  })
  .required();

export const useAddIntegrationModal = (onAddIntegration: () => void, integration?: Integration) => {
  const { t: translate } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IntegrationReq>({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const initializeValues = () => {
    const initialVal = {
      name: integration?.name || '',
    };
    reset(initialVal);
  };

  useEffect(() => initializeValues(), [integration]);

  const onSubmit = async (formData: IntegrationReq) => {
    const { error } = await addOrUpdateIntegrationAdaptor(formData, integration?.id || '');
    if (error) return;
    onAddIntegration();
    reset();
  };

  return {
    data: { translate, register, errors },
    operations: { handleSubmit, onSubmit },
  };
};
