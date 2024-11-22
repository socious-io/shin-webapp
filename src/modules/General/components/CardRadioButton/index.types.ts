import { ReactNode } from 'react';

export interface CardRadioButtonProps {
  items: CardRadioButtonItem[];
  selectedValue?: string;
  setSelectedValue: (value: string) => void;
  customStyle?: string;
  containerClassName?: string;
}

export type CardRadioButtonItem = {
  id: string;
  value: string;
  title: string;
  disabled: boolean;
  description?: string;
  icon?: ReactNode;
  radioSize?: 'small' | 'medium';
};
