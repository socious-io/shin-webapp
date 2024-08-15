import { ReactNode } from 'react';

import { IconProps } from '../Icon/index.types';

export interface CardRadioButtonProps {
  items: CardRadioButtonItem[];
  selectedValue?: string;
  setSelectedValue: (value: string) => void;
}

export type CardRadioButtonItem = {
  value: string;
  title: string;
  description?: string;
  icon?: IconProps;
  img?: ReactNode;
};
