import React from 'react';

import css from './index.module.scss';
import { FeaturedIconOutlinedProps } from './index.type';
import Icon from '../Icon';

const FeaturedIconOutlined: React.FC<FeaturedIconOutlinedProps> = ({ iconName, size, theme, customStyle = '' }) => {
  const iconSize = size === 'sm' ? 16 : size === 'md' ? 20 : size === 'lg' ? 24 : 28;
  return (
    <div className={`${css.outline} ${css[`outer-${size}`]} ${css[`${theme}-outer`]} ${customStyle}`}>
      <div className={`${css.outline} ${css[`inner-${size}`]} ${css[`${theme}-inner`]}`}>
        <Icon name={iconName} fontSize={iconSize} className={`${css[`icon-color-${theme}`]}`} />
      </div>
    </div>
  );
};

export default FeaturedIconOutlined;
