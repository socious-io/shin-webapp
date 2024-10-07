import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'src/store';

export const useEmpty = () => {
  const { t: translate } = useTranslation();
  const navigate = useNavigate();
  const orgId = useSelector<RootState, string>((state: RootState) => state.org.id);

  const navigateToOrgProfile = () => navigate('/organization');

  return {
    data: { translate, navigateToOrgProfile, orgId },
  };
};
