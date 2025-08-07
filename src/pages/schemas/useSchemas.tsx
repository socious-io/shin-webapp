import { useNavigate } from 'react-router-dom';

export const useSchemas = () => {
  const navigate = useNavigate();

  const onCreateSchema = () => navigate('create');

  return {
    operations: {
      onCreateSchema,
    },
  };
};
