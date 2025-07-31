import logo from 'src/assets/logo/new-logo.svg';
import IconButton from 'src/modules/General/components/IconButton';
import { AvatarDropDown } from 'src/modules/General/containers/AvatarDropdown';
import LinkItem from 'src/modules/Layout/components/LinkItem';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './index.module.scss';
import { HamburgerMenuProps } from './index.types';
import { useHamburgerMenu } from './useHamburgerMenu';

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ animatable = false, menuIsOpened = false, onCloseMenu }) => {
  const {
    data: { translate, menuItems, selectedItem },
    operations: { handleNavigate, onLogout },
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
        <LinkItem
          iconName="settings-01"
          title={translate('layout-settings')}
          isSelected={selectedItem === 'settings'}
          onClick={() => {
            handleNavigate('settings', '/settings');
            onCloseMenu?.();
          }}
        />

        <div className={css['profile']}>
          <div className={css['avatar']}>
            <AvatarDropDown displayOtherAccounts onCreateAccount={() => console.log('fuck')} />
          </div>
          <IconButton
            iconName="log-out-01"
            iconSize={20}
            size="small"
            iconColor={variables.color_grey_600}
            onClick={onLogout}
            customStyle="mt-[-8px]"
          />
        </div>
      </div>
    </div>
  );
};

export default HamburgerMenu;
