import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserProfileRes } from 'src/core/adaptors';
import { cleanAuthParams } from 'src/core/api/auth/auth.service';
import { RootState } from 'src/store';
import { clearOrgProfile, OrgState } from 'src/store/reducers/org.reducer';
import { clearUserProfile } from 'src/store/reducers/user.reducer';

export const useHamburgerMenu = () => {
  const { t: translate } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const path = pathname.replace('/', '');
  const [selectedItem, setSelectedItem] = useState(path || 'credentials');

  const userProfile = useSelector<RootState, UserProfileRes>(state => state.user.userProfile);
  const orgProfileId = useSelector<RootState, OrgState>(state => state.org).id || '';

  const menuItems = [
    {
      id: 'credentials',
      iconName: 'shield-tick',
      title: translate('layout-credentials'),
      path: '/credentials',
    },
    {
      id: 'schemas',
      iconName: 'file-05',
      title: translate('layout-schemas'),
      path: '/schemas',
    },
    {
      id: 'verifications',
      iconName: 'scan',
      title: translate('layout-verifications'),
      path: '/verifications',
    },
    {
      id: 'organization-profile',
      iconName: 'building-06',
      title: translate('layout-org-profile'),
      path: `/organization/${orgProfileId}`,
    },
  ];

  const handleNavigate = (selected: string, path: string) => {
    setSelectedItem(selected);
    navigate(path);
  };

  const onLogout = () => {
    cleanAuthParams();
    dispatch(clearUserProfile());
    dispatch(clearOrgProfile());
    navigate('/sign-in');
  };

  return {
    data: {
      translate,
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
