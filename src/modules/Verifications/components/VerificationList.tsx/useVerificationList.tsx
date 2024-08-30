import { useEffect, useState } from 'react';
import { Verification } from 'src/core/adaptors/verifications';
import { MenuItem } from 'src/modules/General/components/ThreeDotButton/index.type';

export const useVerificationList = (list: Verification[], totalItems: number) => {
  const [verifications, setVerifications] = useState(list);
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;
  const [total, setTotal] = useState(Math.ceil(totalItems / PER_PAGE));

  const menuItems: MenuItem[] = [
    {
      iconName: 'pencil-line',
      label: 'Edit',
      action: () => {
        return;
      },
    },
    {
      iconName: 'clock-fast-forward',
      label: 'History',
      action: () => {
        return;
      },
    },
    {
      iconName: 'trash-01',
      label: 'Delete',
      action: () => {
        return;
      },
    },
  ];

  useEffect(() => {
    // TODO: get next items
    // TODO:setList, setTotal
  }, [page]);

  return {
    data: {
      verifications,
      page,
      total,
      menuItems,
    },
    operations: {
      setPage,
    },
  };
};
