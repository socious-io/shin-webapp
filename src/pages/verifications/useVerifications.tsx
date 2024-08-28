import { useLoaderData } from 'react-router-dom';

export const useVerifications = () => {
  const data = useLoaderData();
  return { data };
};
