import { useNavigate } from 'react-router-dom';

export const useSelectSchema = () => {
  const navigate = useNavigate();

  const onCreateSchema = () => navigate('/schemas/create');

  return {
    operations: { onCreateSchema },
  };
};
