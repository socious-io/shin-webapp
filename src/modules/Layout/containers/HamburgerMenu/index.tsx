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
    data: { menuItems, selectedItem },
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
          title="Settings"
          isSelected={selectedItem === 'settings'}
          onClick={() => {
            handleNavigate('settings', '/settings');
            onCloseMenu?.();
          }}
        />
        <div className={css['profile']}>
          <AvatarLabelGroup
            //FIXME: user profile and info
            account={{ id: '1', name: 'Sanaz', type: 'users', username: 'satanmourner' }}
            customStyle="px-2"
          />
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
