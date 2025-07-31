import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'src/store';

export const useEmpty = () => {
  const { t: translate } = useTranslation();
  const navigate = useNavigate();
  const accounts = useSelector((state: RootState) => state.organizations.entities);
  const orgId = accounts.find(account => account.current)?.id;

  const navigateToOrgProfile = () => navigate('/organization');

  return {
    data: { translate, navigateToOrgProfile, orgId },
  };
};
