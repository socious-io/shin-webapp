import React, { CSSProperties, useEffect, useState } from 'react';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './index.module.scss';
import { AvatarProps } from './index.types';
import Icon from '../Icon';

const Avatar: React.FC<AvatarProps> = props => {
  const {
    badge,
    customStyle = '',
    size = '3rem',
    onClick,
    type = 'users',
    hasBorder = false,
    isVerified = false,
    img,
    iconName,
    iconSize,
    iconCustomStyle,
    ...rest
  } = props;

  const [icon, setIcon] = useState('');

  useEffect(() => {
    if (iconName) setIcon(iconName);
    else setIcon(type === 'users' ? 'user-01' : 'building-05');
  }, [iconName, type]);

  const style: CSSProperties = {
    width: size,
    height: size,
    minWidth: size,
    minHeight: size,
    ...rest,
  };

  return (
    <div
      onClick={onClick}
      style={{ width: size, height: size, minWidth: size, minHeight: size }}
      className={`${css['container']} ${hasBorder && css['container__border']} ${customStyle} `}
    >
      <div onClick={onClick} style={style} className={css['avatar']}>
        {img ? (
          <img className={`${css['avatar__img']} ${iconCustomStyle}`} src={img} alt="" />
        ) : (
          <Icon name={icon} fontSize={iconSize || 24} color={variables.color_grey_600} className={iconCustomStyle} />
        )}
      </div>
      {badge && (
        <div
          className={css['badge']}
          style={{ backgroundColor: badge.color, width: badge.width, height: badge.height }}
        >
          <img className={css['badge__img']} src={badge.image} alt="badge" />
        </div>
      )}
      {isVerified && (
        <div className={css['badge--verified']}>
          <Icon name="check-verified-02-filled" color="#0788F5" fontSize={20} />
        </div>
      )}
    </div>
  );
};

export default Avatar;
