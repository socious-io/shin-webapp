import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { getOrgIdAdaptor, getUserProfileAdaptor } from 'src/core/adaptors';
import { setOrgProfile } from 'src/store/reducers/org.reducer';
import { setUserProfile } from 'src/store/reducers/user.reducer';

const Base = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await getUserProfileAdaptor();
        if (userResponse.error == null && userResponse.data != null) {
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
