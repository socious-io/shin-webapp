import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useHamburgerMenu = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const path = pathname.replace('/', '');
  const [selectedItem, setSelectedItem] = useState(path || 'credentials');

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

  const onLogout = () => console.log('log out');

  return {
    data: {
      menuItems,
      selectedItem,
    },
    operations: {
      handleNavigate,
      onLogout,
    },
  };
};
