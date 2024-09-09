import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { AdaptorRes, VerificationsRes } from 'src/core/adaptors';

export const useVerifications = () => {
  const navigate = useNavigate();
  const { data } = useLoaderData() as AdaptorRes<VerificationsRes>;
  const [list, setList] = useState(data?.items);
  const handleCreate = () => {
    navigate('/verifications/create');
  };
  return { list, setList, handleCreate, totalCount: data?.totalCount };
};
