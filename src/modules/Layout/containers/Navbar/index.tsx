import logo from 'src/assets/logo/logo.svg';
import Icon from 'src/modules/General/components/Icon';
import IconButton from 'src/modules/General/components/IconButton';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './index.module.scss';
import { NavbarProps } from './index.types';
import HamburgerMenu from '../HamburgerMenu';

const Navbar: React.FC<NavbarProps> = ({ menuIsOpened, onOpenMenu }) => {
  return (
    <>
      <div className={css['container']}>
        <img src={logo} alt="Socious-Verify-Logo" width={175} height={36} />
        <IconButton
          iconName="menu-02"
          iconSize={24}
          size="small"
          iconColor={variables.color_grey_700}
          onClick={() => onOpenMenu(true)}
        />
      </div>
      <HamburgerMenu animatable menuIsOpened={menuIsOpened} onCloseMenu={() => onOpenMenu(false)} />
      <div className={`${css['overlay']} ${!menuIsOpened && css['overlay--closed']}`}>
        {menuIsOpened && (
          <Icon name="x-close" fontSize={26} className={css['overlay__close']} onClick={() => onOpenMenu(false)} />
        )}
      </div>
    </>
  );
};

export default Navbar;
