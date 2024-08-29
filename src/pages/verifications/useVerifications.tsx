import { useLoaderData } from 'react-router-dom';
import { VerificationsRes } from 'src/core/adaptors/verifications';

export const useVerifications = () => {
  const data = useLoaderData() as VerificationsRes;
  return { data };
};
