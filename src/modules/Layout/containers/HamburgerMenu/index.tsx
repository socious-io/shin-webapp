import logo from 'src/assets/logo/logo.svg';
import AvatarLabelGroup from 'src/modules/General/components/AvatarLabelGroup';
import IconButton from 'src/modules/General/components/IconButton';
import LinkItem from 'src/modules/Layout/components/LinkItem';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './index.module.scss';
import { HamburgerMenuProps } from './index.types';
import { useHamburgerMenu } from './useHamburgerMenu';

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ animatable = false, menuIsOpened = false, onCloseMenu }) => {
  const {
    data: { translate, menuItems, selectedItem, userProfile },
    operations: { handleNavigate, onLogout },
  } = useHamburgerMenu();

  return (
    <div className={`${css['container']} ${animatable && !menuIsOpened && css['container--closed']}`}>
      <div className={css['container__top']}>
        <img src={logo} alt="Shin-Logo" className="ml-2" />
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
            <AvatarLabelGroup
              account={{
                id: userProfile.id,
                name: `${userProfile.firstName} ${userProfile.lastName}`,
                type: 'users',
                email: userProfile.email,
                img: userProfile.avatar.url,
              }}
              customStyle="px-2"
            />
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
