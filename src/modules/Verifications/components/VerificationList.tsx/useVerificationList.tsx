import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { config } from 'src/config';
import { deleteVerificationAdaptor, getVerificationsAdaptor, Verification } from 'src/core/adaptors';
import { MenuItem } from 'src/modules/General/components/ThreeDotButton/index.type';

export const useVerificationList = (list: Verification[], totalItems: number) => {
  const { t: translate } = useTranslation();
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
        label: translate('ver-cell-edit'),
        action: () => {
          navigate(`/verifications/edit/${id}`);
        },
      },
      {
        iconName: 'clock-fast-forward',
        label: translate('ver-cell-History'),
        action: () => {
          return;
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

  const fetchMore = async () => {
    const res = await getVerificationsAdaptor(page, PER_PAGE);
    if (!res.data) return;
    setVerifications(res.data.items);
    setTotal(Math.ceil(res.data.totalCount / PER_PAGE));
  };

  useEffect(() => {
    fetchMore();
  }, [page]);

  const handleDelete = async () => {
    if (!selectedId) return;
    const res = await deleteVerificationAdaptor(selectedId);
    if (res.error) return;
    const verificationRes = await getVerificationsAdaptor(page, PER_PAGE);
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
      translate,
    },
  };
};