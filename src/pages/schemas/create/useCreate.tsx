import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export const useCreate = () => {
  const navigate = useNavigate();
  const createSchemaRef = useRef<{ submitForm: () => void }>(null);

  const handlePublish = () => {
    if (createSchemaRef.current) {
      createSchemaRef.current.submitForm();
    }
  };

  const onCancelCreateSchema = () => navigate('/schemas');

  return {
    data: { createSchemaRef },
    operations: {
      onCancelCreateSchema,
      handlePublish,
    },
  };
};
