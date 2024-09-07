import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const useSchemas = () => {
  const navigate = useNavigate();
  const { t: translate } = useTranslation();

  const onCreateSchema = () => navigate('create');

  return {
    data: { translate },
    operations: {
      onCreateSchema,
    },
  };
};
