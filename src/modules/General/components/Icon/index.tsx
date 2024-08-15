// Use docs/icons-reference.html for icons reference
import React from 'react';

import css from './index.module.scss';
import { IconProps } from './index.types';

const Icon: React.FC<IconProps> = props => {
  const { name, color, fontSize, className = '', containerClass, cursor = 'default', onClick } = props;
  const iconStyle = {
    fontSize: `${fontSize}px`,
    color: color,
    cursor: cursor,
  };
  return (
    <div className={`${css['container']} ${containerClass}`} onClick={onClick}>
      <span className={`icon-${name} ${css['icon']} ${className}`} style={iconStyle} />
    </div>
  );
};

export default Icon;
