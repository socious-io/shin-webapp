import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { deleteVerificationAdaptor, getSingleUseVerificationsAdaptor, SingleUseVerification } from 'src/core/adaptors';

export const useSingleUseList = (
  list: SingleUseVerification[],
  setList: (val: SingleUseVerification[]) => void,
  totalItems: number,
  setOpenModal: (val: { name: 'delete' | 'copy' | 'history'; open: boolean }) => void,
  selectedId?: string,
) => {
  const { t: translate } = useTranslation();

  const [page, setPage] = useState(1);
  const PER_PAGE = 10;
  const [total, setTotal] = useState(Math.ceil(totalItems / PER_PAGE));

  const fetchMore = async () => {
    const res = await getSingleUseVerificationsAdaptor(page, PER_PAGE);
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
    const verificationRes = await getSingleUseVerificationsAdaptor(newPage, PER_PAGE);
    if (verificationRes.error) return;
    setOpenModal({ name: 'delete', open: false });
    setList(verificationRes.data?.items || []);
    setTotal(Math.ceil((verificationRes.data?.totalCount || 0) / PER_PAGE));
    setPage(newPage);
  };

  return {
    data: {
      page,
      total,
    },
    operations: {
      setPage,
      handleDelete,
      translate,
    },
  };
};
