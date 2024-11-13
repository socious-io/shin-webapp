import React from 'react';

import css from './index.module.scss';
import { PaginationDotGroupProps } from './index.types';

const PaginationDotGroup: React.FC<PaginationDotGroupProps> = props => {
  const {
    shape = 'oval',
    count,
    transparent = true,
    active = 0,
    size,
    titles = [],
    highlightPrevSteps = false,
    containerClassName = '',
    customStyle = '',
  } = props;
  return (
    <div className={`${css['container']} ${transparent && 'bg-transparent'} ${containerClassName}`}>
      {[...Array(count)].map((e, n) => (
        <div key={n} className={`${css['step']} ${css[`step--${shape}`]} ${customStyle}`}>
          <div
            className={`${css['indicator']} ${css[`indicator--${size}`]} ${highlightPrevSteps ? n <= active && css['indicator--active'] : n === active && css['indicator--active']}`}
          />
          {titles[n]}
        </div>
      ))}
    </div>
  );
};

export default PaginationDotGroup;
