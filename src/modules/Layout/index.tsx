import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from 'src/store';

import HamburgerMenu from './containers/HamburgerMenu';
import Navbar from './containers/Navbar';
import css from './index.module.scss';

const Layout = () => {
  const isAuth = useSelector((state: RootState) => state.user.isAuthenticated);
  const [openMenu, setOpenMenu] = useState(false);

  if (!isAuth) return <Navigate to="/sign-in" />;

  return (
    <div className={css['container']}>
      <div className="hidden md:block">
        <HamburgerMenu />
      </div>
      <div className="block md:hidden">
        <Navbar menuIsOpened={openMenu} onOpenMenu={setOpenMenu} />
      </div>
      <div className={css['content']}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
