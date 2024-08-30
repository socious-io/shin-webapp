import React, { useState } from 'react';
import Icon from 'src/modules/General/components/Icon';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './index.module.scss';
import { ThreeDotButtonProps } from './index.type';

const ThreeDotButton: React.FC<ThreeDotButtonProps> = ({ menuItems }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={css['container']}>
      <button onClick={() => setOpen(!open)}>
        <Icon name="dots-vertical" fontSize={20} color={variables.color_grey_500} className={css['btn']} />
      </button>
      {open && (
        <div className={css['menu']}>
          {menuItems.map(item => (
            <div key={item.label} className={css['menu__item']} onClick={item.action}>
              {item.iconName && <Icon name={item.iconName} fontSize={16} color={variables.color_grey_500} />}
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThreeDotButton;
