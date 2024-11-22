import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router-dom';
import {
  deleteVerificationAdaptor,
  getSingleUseVerificationsAdaptor,
  ReusableVerificationsRes,
  SingleUseVerificationsRes,
} from 'src/core/adaptors';

export const useSingleUseList = (
  setOpenModal: (val: { name: 'delete' | 'copy' | 'history'; open: boolean }) => void,
  selectedId?: string,
) => {
  const { t: translate } = useTranslation();

  const [page, setPage] = useState(1);
  const PER_PAGE = 10;
  const { singleUseList } = useLoaderData() as {
    reusableList?: ReusableVerificationsRes;
    singleUseList?: SingleUseVerificationsRes;
  };
  const [list, setList] = useState(singleUseList?.items || []);
  const [total, setTotal] = useState(Math.ceil((singleUseList?.totalCount || 0) / PER_PAGE));

  const fetchMore = async (newPage: number) => {
    setPage(newPage);
    const res = await getSingleUseVerificationsAdaptor(newPage, PER_PAGE);
    if (!res.data) return;
    setList(res.data.items);
    setTotal(Math.ceil(res.data.totalCount / PER_PAGE));
  };

  const handleDelete = async () => {
    if (!selectedId) return;
    const res = await deleteVerificationAdaptor(selectedId);
    if (res.error) return;

    const newPage = list.length === 1 && page > 1 ? page - 1 : page;
    fetchMore(newPage);
    setOpenModal({ name: 'delete', open: false });
  };

  return {
    data: {
      page,
      total,
      list,
    },
    operations: {
      fetchMore,
      handleDelete,
      translate,
    },
  };
};
