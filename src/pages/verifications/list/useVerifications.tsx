import { useLoaderData, useNavigate } from 'react-router-dom';
import { VerificationsRes } from 'src/core/adaptors/verifications';

export const useVerifications = () => {
  const navigate = useNavigate();
  const data = useLoaderData() as VerificationsRes;
  const handleCreate = () => {
    navigate('/verifications/create');
  };
  return { data, handleCreate };
};
