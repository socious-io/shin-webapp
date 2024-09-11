import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getOrgIdAdaptor, getUserProfileAdaptor } from 'src/core/adaptors';
import { setOrgProfile } from 'src/store/reducers/org.reducer';
import { setUserProfile } from 'src/store/reducers/user.reducer';

const Base = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allowedRoutes = new Set(['sign-in', 'sign-up']);
  const { pathname } = useLocation();
  const isUnknownAllowed = allowedRoutes.has(pathname.split('/')[1]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await getUserProfileAdaptor();
        if (!userResponse.data && !isUnknownAllowed) navigate('/sign-in');
        else if (userResponse.data) {
          dispatch(setUserProfile(userResponse.data));
          const orgResponse = await getOrgIdAdaptor();
          if (orgResponse.error == null && orgResponse.data != null) {
            dispatch(setOrgProfile(orgResponse.data));
          }
        }
      } catch (error) {
        console.error('Failed to fetch user or org data:', error);
      }
    };

    fetchUserData();
  }, [dispatch]);

  return <Outlet />;
};

export default Base;
