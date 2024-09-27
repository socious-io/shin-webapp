import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Outlet, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { getOrgIdAdaptor, getUserProfileAdaptor } from 'src/core/adaptors';
import { setOrgProfile } from 'src/store/reducers/org.reducer';
import { setUserProfile } from 'src/store/reducers/user.reducer';

const Base = () => {
  const authenticated = useLoaderData();
  if (authenticated) return <Outlet />;
  else return <Navigate to="/sign-in" />;
};

export default Base;
