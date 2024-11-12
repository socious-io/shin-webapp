import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { config } from 'src/config';
import { deleteVerificationAdaptor, getReusableVerificationsAdaptor, Verification } from 'src/core/adaptors';
import { MenuItem } from 'src/modules/General/components/ThreeDotButton/index.type';

export const useReusableList = (
  list: Verification[],
  setList: (val: Verification[]) => void,
  totalItems: number,
  selectedId,
  setSelectedId,
  setOpenModal,
) => {
  const { t: translate } = useTranslation();
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;
  const [total, setTotal] = useState(Math.ceil(totalItems / PER_PAGE));
  const [url, setUrl] = useState('');

  const fetchMore = async () => {
    const res = await getReusableVerificationsAdaptor(page, PER_PAGE);
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
    const verificationRes = await getReusableVerificationsAdaptor(newPage, PER_PAGE);
    if (verificationRes.error) return;
    setOpenModal({ name: 'delete', open: false });
    setList(verificationRes.data?.items || []);
    setTotal(Math.ceil((verificationRes.data?.totalCount || 0) / PER_PAGE));
    setPage(newPage);
  };

  const handleOpenCopy = (id: string) => {
    const copyUrl = `${config.appBaseURL}/connect/verification/${id}`;
    setUrl(copyUrl);
    setOpenModal({ name: 'copy', open: true });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
  };

  return {
    data: {
      page,
      total,
      url,
    },
    operations: {
      setPage,
      handleDelete,
      handleOpenCopy,
      handleCopy,
      translate,
    },
  };
};
