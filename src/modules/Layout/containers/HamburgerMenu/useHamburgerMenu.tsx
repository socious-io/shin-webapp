import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { config } from 'src/config';
import { logout } from 'src/core/api/auth/auth.service';
import { translate } from 'src/core/helpers/utils';
import { RootState } from 'src/store';

export const useHamburgerMenu = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const path = pathname.replace('/', '');
  const orgId = useSelector((state: RootState) => state.identity.currentId);
  const [selectedItem, setSelectedItem] = useState(path || 'credentials');

  const menuItems = [
    {
      id: 'credentials',
      iconName: 'shield-tick',
      title: translate('layout-credentials'),
      path: `/credentials/${orgId}`,
    },
    { id: 'schemas', iconName: 'file-05', title: translate('layout-schemas'), path: '/schemas' },
    { id: 'verifications', iconName: 'scan', title: translate('layout-verifications'), path: '/verifications' },
    { id: 'integrations', iconName: 'code-snippet-02', title: translate('layout-integrations'), path: '/integrations' },
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
    setSelectedItem('logout');
    logout();
    navigate('/intro');
  };

  const onCreateOrganization = () => {
    window.location.href = config.accountCenterURL + '/organizations/register/pre';
  };

  return {
    data: { translate, menuItems, selectedItem },
    operations: { handleNavigate, onLogout, onCreateOrganization },
  };
};
