import { useTranslation } from 'react-i18next';
import IssuedList from 'src/modules/Credential/containers/IssuedList';

export const useCredentials = () => {
  const { t: translate } = useTranslation();
  const tabs = [{ label: translate('credential-tab1'), content: <IssuedList /> }];

  return {
    data: { translate, tabs },
  };
};
