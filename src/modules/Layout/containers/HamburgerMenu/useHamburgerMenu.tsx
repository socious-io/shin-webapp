import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserProfileRes } from 'src/core/adaptors';
import { cleanAuthParams } from 'src/core/api/auth/auth.service';
import { RootState } from 'src/store';
import { clearUserProfile } from 'src/store/reducers/user.reducer';

export const useHamburgerMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const path = pathname.replace('/', '');
  const [selectedItem, setSelectedItem] = useState(path || 'credentials');

  const userProfile = useSelector<RootState, UserProfileRes>(state => state.user.userProfile);

  const menuItems = [
    {
      id: 'credentials',
      iconName: 'shield-tick',
      title: 'Credentials',
      path: '/credentials',
    },
    {
      id: 'schemas',
      iconName: 'file-05',
      title: 'Schemas',
      path: '/schemas',
    },
    {
      id: 'verifications',
      iconName: 'scan',
      title: 'Verifications',
      path: '/verifications',
    },
    {
      id: 'organization-profile',
      iconName: 'building-06',
      title: 'Organization profile',
      path: '/profile/org',
    },
  ];

  const handleNavigate = (selected: string, path: string) => {
    setSelectedItem(selected);
    navigate(path);
  };

  const onLogout = () => {
    cleanAuthParams();
    dispatch(clearUserProfile());
  };

  return {
    data: {
      menuItems,
      selectedItem,
      userProfile,
    },
    operations: {
      handleNavigate,
      onLogout,
    },
  };
};
