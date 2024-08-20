import React from 'react';

import css from './index.module.scss';
import { PaginationDotGroupProps } from './index.types';

const PaginationDotGroup: React.FC<PaginationDotGroupProps> = props => {
  const { shape = 'oval', count, transparent = true, active = 0, size } = props;
  return (
    <div className={`${css['container']} ${transparent && 'bg-transparent'}`}>
      {[...Array(count)].map((e, n) => (
        <div
          key={n}
          className={`${css['indicator']} ${css[`indicator--${size}`]} ${css[`indicator--${shape}`]} ${n === active && css['indicator--active']}`}
        />
      ))}
    </div>
  );
};

export default PaginationDotGroup;
