import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import HamburgerMenu from './containers/HamburgerMenu';
import Navbar from './containers/Navbar';
import css from './index.module.scss';

const Layout = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className={`${css['container']} ${openMenu && css['container--open']}`}>
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
