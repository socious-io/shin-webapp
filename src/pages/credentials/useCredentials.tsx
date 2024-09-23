import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import IssuedList from 'src/modules/Credential/containers/IssuedList';

export const useCredentials = () => {
  const { t: translate } = useTranslation();
  const navigate = useNavigate();
  const tabs = [{ label: translate('credential-tab1'), content: <IssuedList /> }];

  const onCreateCredential = () => navigate('create');

  return {
    data: { translate, tabs },
    operations: { onCreateCredential },
  };
};
