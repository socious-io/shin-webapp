import React from 'react';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './cardRadioButton.module.scss';
import Icon from '../Icon';
import { IconProps } from '../Icon/index.types';

interface CardRadioButtonIconProps {
  selected: boolean;
  icon: IconProps;
}

export const CardRadioButtonIcon: React.FC<CardRadioButtonIconProps> = ({ selected, icon }) => {
  return (
    <div className={css.iconDiv}>
      <Icon
        name={icon.name}
        fontSize={icon.fontSize}
        color={selected ? variables.color_primary_600 : variables.color_primary_600}
      />
    </div>
  );
};
