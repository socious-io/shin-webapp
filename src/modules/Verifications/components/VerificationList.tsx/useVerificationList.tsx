import { useEffect, useState } from 'react';
import { Verification } from 'src/core/adaptors/verifications';

export const useVerificationList = (list: Verification[], totalItems: number) => {
  const [verifications, setVerifications] = useState(list);
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;
  const [total, setTotal] = useState(Math.ceil(totalItems / PER_PAGE));

  useEffect(() => {
    // TODO: get next items
    // TODO:setList, setTotal
  }, [page]);

  return {
    data: {
      verifications,
      page,
      total,
    },
    operations: {
      setPage,
    },
  };
};
