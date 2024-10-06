import { Navigate, Outlet, useLoaderData } from 'react-router-dom';

const Base = () => {
  const authenticated = useLoaderData();
  if (authenticated) return <Outlet />;
  else return <Navigate to="/sign-in" />;
};

export default Base;
