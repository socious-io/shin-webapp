import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { config } from 'src/config';
import { deleteVerificationAdaptor, getVerificationsAdaptor, Verification } from 'src/core/adaptors';
import { MenuItem } from 'src/modules/General/components/ThreeDotButton/index.type';

export const useVerificationList = (
  list: Verification[],
  setList: (val: Verification[]) => void,
  totalItems: number,
) => {
  const { t: translate } = useTranslation();
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;
  const [total, setTotal] = useState(Math.ceil(totalItems / PER_PAGE));
  const [openModal, setOpenModal] = useState<{ name: 'delete' | 'copy' | 'history'; open: boolean }>();
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

  const fetchMore = async () => {
    const res = await getVerificationsAdaptor(page, PER_PAGE);
    if (!res.data) return;
    setList(res.data.items);
    setTotal(Math.ceil(res.data.totalCount / PER_PAGE));
  };

  useEffect(() => {
    fetchMore();
  }, [page]);

  const handleDelete = async () => {
    if (!selectedId) return;
    const res = await deleteVerificationAdaptor(selectedId);
    if (res.error) return;
    const newPage = list.length === 1 && page > 1 ? page - 1 : page;
    const verificationRes = await getVerificationsAdaptor(newPage, PER_PAGE);
    if (verificationRes.error) return;
    setOpenModal({ name: 'delete', open: false });
    setList(verificationRes.data?.items || []);
    setTotal(Math.ceil((verificationRes.data?.totalCount || 0) / PER_PAGE));
    setPage(newPage);
  };

  const handleOpenCopy = (id: string) => {
    const copyUrl = `${config.appBaseURL}/connect/redirect/${id}`;
    setUrl(copyUrl);
    setOpenModal({ name: 'copy', open: true });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
  };

  const handleOpenHistory = async (verificationId: string) => {
    setSelectedId(verificationId);
    setOpenModal({ name: 'history', open: true });
  };

  return {
    data: {
      list,
      page,
      total,
      getMenuItems,
      openModal,
      url,
      selectedId,
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
