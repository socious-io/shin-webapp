import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { logout } from 'src/core/api/auth/auth.service';
import { RootState } from 'src/store';

export const useHamburgerMenu = () => {
  const { t: translate } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const path = pathname.replace('/', '');
  const accounts = useSelector((state: RootState) => state.organizations.entities);
  const orgId = accounts.find(account => account.current)?.id || '';
  const [selectedItem, setSelectedItem] = useState(path || 'credentials');

  const menuItems = [
    {
      id: 'credentials',
      iconName: 'shield-tick',
      title: translate('layout-credentials'),
      path: `/credentials/${orgId}`,
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
      id: 'integrations',
      iconName: 'code-snippet-02',
      title: translate('layout-integrations'),
      path: '/integrations',
    },
    {
      id: 'organization-profile',
      iconName: 'building-06',
      title: translate('layout-org-profile'),
      path: `/organization/${orgId}`,
    },
  ];

  useEffect(() => {
    setSelectedItem(pathname.replace('/', ''));
  }, [pathname]);

  const handleNavigate = (selected: string, path: string) => {
    setSelectedItem(selected);
    navigate(path);
  };

  const onLogout = () => {
    logout();
    // dispatch(clearUserProfile());
    // dispatch(clearOrgProfile());
    navigate('/intro');
  };

  return {
    data: {
      translate,
      menuItems,
      selectedItem,
    },
    operations: {
      handleNavigate,
      onLogout,
    },
  };
};
