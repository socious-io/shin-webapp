import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const useIntegrations = () => {
  const { t: translate } = useTranslation();
  const [openAddModal, setOpenAddModal] = useState(false);

  const onAddIntegrationClick = () => setOpenAddModal(true);

  return {
    data: { translate, openAddModal },
    operations: { onAddIntegrationClick, setOpenAddModal },
  };
};
