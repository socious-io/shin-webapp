import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { getUserProfileAdaptor } from 'src/core/adaptors';
import { setUserProfile } from 'src/store/reducers/user.reducer';

const Base = () => {
  const dispatch = useDispatch();
  getUserProfileAdaptor().then(res => {
    if (res.error == null && res.data != null) dispatch(setUserProfile(res.data));
  });
  return <Outlet />;
};

export default Base;
