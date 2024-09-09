import React from 'react';

import styles from './index.module.scss';
import { ChipProps } from './index.types';

const Chip: React.FC<ChipProps> = ({
  label,
  onStartIconClick,
  onEndIconClick,
  startIcon,
  endIcon,
  theme = 'primary',
  shape = 'round',
  size = 'md',
  transparent = false,
}) => {
  const chipClasses = `${styles[`chip-${size}`]} ${styles[`${theme}-theme`]} ${
    shape === 'round' ? styles.round : styles.sharp
  } ${transparent ? styles[`${theme}-transparent`] : ''}`;

  return (
    <div className={chipClasses}>
      {startIcon && <div onClick={onStartIconClick}>{startIcon}</div>}
      {label}
      {endIcon && <div onClick={onEndIconClick}>{endIcon}</div>}
    </div>
  );
};

export default Chip;
