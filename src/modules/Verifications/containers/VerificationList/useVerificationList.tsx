import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { MenuItem } from 'src/modules/General/components/ThreeDotButton/index.type';

export const useVerificationList = () => {
  const { t: translate } = useTranslation();
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState<{ name: 'delete' | 'copy' | 'history'; open: boolean }>();
  const [selectedId, setSelectedId] = useState('');
  const getMenuItems = (id: string): MenuItem[] => {
    return [
      {
        iconName: 'pencil-line',
        label: translate('ver-cell-edit'),
        action: () => {
          navigate(`/verifications/edit/${id}`);
        },
      },
      {
        iconName: 'clock-fast-forward',
        label: translate('ver-cell-History'),
        action: () => {
          handleOpenHistory(id);
        },
      },
      {
        iconName: 'trash-01',
        label: translate('ver-cell-delete'),
        action: () => {
          setSelectedId(id);
          setOpenModal({ name: 'delete', open: true });
        },
      },
    ];
  };

  const handleOpenHistory = async (verificationId: string) => {
    setSelectedId(verificationId);
    setOpenModal({ name: 'history', open: true });
  };

  return {
    operation: {
      getMenuItems,
      setOpenModal,
    },
    data: {
      selectedId,
      openModal,
    },
  };
};
