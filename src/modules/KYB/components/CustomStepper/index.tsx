import React from 'react';
import FeaturedIcon from 'src/modules/General/components/FeaturedIcon';

import css from './index.module.scss';
import { CustomStepperProps } from './index.types';

const CustomStepper: React.FC<CustomStepperProps> = ({ iconName, title, subtitle, displayDivider }) => {
  return (
    <div className={css['container']}>
      <div className={css['connector']}>
        <FeaturedIcon iconName={iconName} type="modern" size="lg" theme="gray" />
        {displayDivider && <div className={css['connector__divider']} />}
      </div>
      <div className={css['content']}>
        <div className={css['content__title']}>{title}</div>
        <div className={css['content__subtitle']}>{subtitle}</div>
      </div>
    </div>
  );
};

export default CustomStepper;
