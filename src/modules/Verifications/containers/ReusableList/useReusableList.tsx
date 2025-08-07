import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import {
  deleteVerificationAdaptor,
  getReusableVerificationsAdaptor,
  ReusableVerificationsRes,
  SingleUseVerificationsRes,
} from 'src/core/adaptors';

export const useReusableList = (
  setOpenModal: (val: { name: 'delete' | 'copy' | 'history'; open: boolean }) => void,
  selectedId?: string,
) => {
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;

  const { reusableList } = useLoaderData() as {
    reusableList?: ReusableVerificationsRes;
    singleUseList?: SingleUseVerificationsRes;
  };

  const [list, setList] = useState(reusableList?.items || []);
  const [total, setTotal] = useState(Math.ceil((reusableList?.totalCount || 0) / PER_PAGE));

  const fetchMore = async (newPage: number) => {
    setPage(newPage);
    const res = await getReusableVerificationsAdaptor(newPage, PER_PAGE);
    if (!res.data) return;
    setList(res.data.items);
    setTotal(Math.ceil(res.data.totalCount / PER_PAGE));
  };

  const handleDelete = async () => {
    if (!selectedId) return;

    const res = await deleteVerificationAdaptor(selectedId);
    if (res.error) return;

    const newPage = list.length === 1 && page > 1 ? page - 1 : page;
    await fetchMore(newPage);
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
    },
  };
};
