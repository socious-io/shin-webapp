import React from 'react';
import FeaturedIconOutlined from 'src/modules/General/components/FeaturedIconOutlined';

import css from './index.module.scss';
import { BannerProps } from './index.types';

const Banner: React.FC<BannerProps> = props => {
  const { title, subtitle, theme, iconName, primaryBtnLabel, primaryBtnAction, secondaryBtnLabel, secondaryBtnAction } =
    props;

  return (
    <div className={css['container']}>
      <FeaturedIconOutlined size="lg" iconName={iconName} theme={theme} />
      <div className={css['content']}>
        <div className={css['content__title']}>{title}</div>
        <div className={css['content__subtitle']}>{subtitle}</div>
        <div className="flex gap-3">
          {secondaryBtnLabel && (
            <button className={`${css['btn']} ${css['btn--gray']}`} onClick={secondaryBtnAction}>
              {secondaryBtnLabel}
            </button>
          )}

          <button className={`${css['btn']} ${css[`btn--${theme}`]}`} onClick={primaryBtnAction}>
            {primaryBtnLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
