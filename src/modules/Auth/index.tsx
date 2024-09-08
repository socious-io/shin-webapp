import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from 'src/store';

const Auth = () => {
  const isAuth = useSelector((state: RootState) => state.user.isAuthenticated);

  if (isAuth) return <Navigate to="/" />;

  return <Outlet />;
};

export default Auth;
