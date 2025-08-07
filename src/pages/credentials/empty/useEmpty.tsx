import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'src/store';

export const useEmpty = () => {
  const navigate = useNavigate();
  const orgId = useSelector((state: RootState) => state.identity.currentId);

  const navigateToOrgProfile = () => navigate('/organization');

  return { data: { navigateToOrgProfile, orgId } };
};
