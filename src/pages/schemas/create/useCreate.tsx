import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const useCreate = () => {
  const navigate = useNavigate();
  const { t: translate } = useTranslation();
  const createSchemaRef = useRef<{ submitForm: () => void }>(null);

  const handlePublish = () => {
    if (createSchemaRef.current) {
      createSchemaRef.current.submitForm();
    }
  };

  const onCancelCreateSchema = () => navigate('/schemas');

  return {
    data: { translate, createSchemaRef },
    operations: {
      onCancelCreateSchema,
      handlePublish,
    },
  };
};
