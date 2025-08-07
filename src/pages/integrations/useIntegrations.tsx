import { useState } from 'react';

export const useIntegrations = () => {
  const [openAddModal, setOpenAddModal] = useState(false);

  const onAddIntegrationClick = () => setOpenAddModal(true);

  return {
    data: { openAddModal },
    operations: { onAddIntegrationClick, setOpenAddModal },
  };
};
