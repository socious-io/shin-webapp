import logo from 'src/assets/logo/logo.svg';
import { AvatarDropDown } from 'src/modules/General/containers/AvatarDropdown';
import LinkItem from 'src/modules/Layout/components/LinkItem';

import css from './index.module.scss';
import { HamburgerMenuProps } from './index.types';
import { useHamburgerMenu } from './useHamburgerMenu';

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ animatable = false, menuIsOpened = false, onCloseMenu }) => {
  const {
    data: { translate, menuItems, selectedItem },
    operations: { handleNavigate, onLogout, onCreateOrganization },
  } = useHamburgerMenu();

  return (
    <div className={`${css['container']} ${animatable && !menuIsOpened && css['container--closed']}`}>
      <div className={css['container__top']}>
        <img src={logo} alt="Socious-Verify-Logo" width={175} height={36} className="ml-2" />
        <div className={css['menu']}>
          {menuItems.map(item => (
            <LinkItem
              key={item.id}
              {...item}
              onClick={() => {
                handleNavigate(item.id, item.path);
                onCloseMenu?.();
              }}
              isSelected={selectedItem.includes(item.id)}
            />
          ))}
        </div>
      </div>
      <div className={css['container__bottom']}>
        <div className={css['menu']}>
          <LinkItem
            iconName="settings-01"
            title={translate('layout-settings')}
            isSelected={selectedItem === 'settings'}
            onClick={() => {
              handleNavigate('settings', '/settings');
              onCloseMenu?.();
            }}
          />
          <LinkItem
            iconName="log-out-01"
            title={translate('layout-logout')}
            isSelected={selectedItem === 'logout'}
            onClick={onLogout}
          />
        </div>
        <div className={css['avatar']}>
          <AvatarDropDown displayOtherAccounts onCreateAccount={onCreateOrganization} />
        </div>
      </div>
    </div>
  );
};

export default HamburgerMenu;
