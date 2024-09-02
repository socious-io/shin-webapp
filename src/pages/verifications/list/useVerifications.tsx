import { useLoaderData, useNavigate } from 'react-router-dom';
import { AdaptorRes, VerificationsRes } from 'src/core/adaptors';

export const useVerifications = () => {
  const navigate = useNavigate();
  const { data } = useLoaderData() as AdaptorRes<VerificationsRes>;
  const handleCreate = () => {
    navigate('/verifications/create');
  };
  return { data, handleCreate };
};
