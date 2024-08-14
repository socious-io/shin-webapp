import React, { CSSProperties, useEffect, useState } from 'react';
import { Icon } from 'src/modules/general/components/Icon';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './avatar.module.scss';
import { AvatarProps } from './avatar.types';

export const Avatar: React.FC<AvatarProps> = props => {
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
      className={`${css.container} ${customStyle} ${hasBorder ? css.avatarBorder : ''}`}
    >
      <div onClick={onClick} style={style} className={css.imageContainer}>
        {img ? (
          <img className={`${css.img} ${iconCustomStyle}`} src={img} alt="" />
        ) : (
          <Icon
            name={icon}
            fontSize={iconSize ? iconSize : 24}
            color={variables.color_grey_600}
            className={`${iconCustomStyle}`}
          />
        )}
      </div>
      {badge && (
        <div className={css.badge} style={{ backgroundColor: badge.color, width: badge.width, height: badge.height }}>
          <img className={css.img} src={badge.image} alt="" />
        </div>
      )}
      {isVerified && (
        <div className={css.verifiedBadge}>
          <img src="/icons/verified-blue.svg" />
        </div>
      )}
    </div>
  );
};
