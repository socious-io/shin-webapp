import { Navigate, Outlet, useLoaderData } from 'react-router-dom';

const Auth = () => {
  const authenticated = useLoaderData();
  if (authenticated) return <Navigate to="/" />;

  return <Outlet />;
};

export default Auth;
