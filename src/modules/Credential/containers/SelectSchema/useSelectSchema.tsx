import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const useSelectSchema = () => {
  const { t: translate } = useTranslation();
  const navigate = useNavigate();

  const onCreateSchema = () => navigate('/schemas/create');

  return {
    data: { translate },
    operations: { onCreateSchema },
  };
};
