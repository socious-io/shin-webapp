import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { config } from 'src/config';
import { deleteVerification, getVerifications } from 'src/core/adaptors';
import { Verification } from 'src/core/adaptors/verifications';
import { MenuItem } from 'src/modules/General/components/ThreeDotButton/index.type';

export const useVerificationList = (list: Verification[], totalItems: number) => {
  const [verifications, setVerifications] = useState(list);
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;
  const [total, setTotal] = useState(Math.ceil(totalItems / PER_PAGE));
  const [openModal, setOpenModal] = useState<{ name: 'delete' | 'copy'; open: boolean }>();
  const [selectedId, setSelectedId] = useState('');
  const [url, setUrl] = useState('');
  const navigate = useNavigate();
  const getMenuItems = (id: string): MenuItem[] => {
    return [
      {
        iconName: 'pencil-line',
        label: 'Edit',
        action: () => {
          navigate(`/verifications/edit/${id}`);
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
          setSelectedId(id);
          setOpenModal({ name: 'delete', open: true });
        },
      },
    ];
  };

  useEffect(() => {
    // TODO: get next items
    // TODO:setList, setTotal
  }, [page]);

  const handleDelete = async () => {
    if (!selectedId) return;
    const res = await deleteVerification(selectedId);
    if (res.error) return;
    const verificationRes = await getVerifications(page, PER_PAGE);
    if (verificationRes.error) return;
    setVerifications(verificationRes.data?.items || []);
    setOpenModal({ name: 'delete', open: false });
  };

  const handleOpenCopy = (id: string) => {
    const copyUrl = `${config.appBaseURL}/verifications/${id}`;
    setUrl(copyUrl);
    setOpenModal({ name: 'copy', open: true });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
  };

  return {
    data: {
      verifications,
      page,
      total,
      getMenuItems,
      openModal,
      url,
    },
    operations: {
      setPage,
      setOpenModal,
      handleDelete,
      handleOpenCopy,
      handleCopy,
    },
  };
};
