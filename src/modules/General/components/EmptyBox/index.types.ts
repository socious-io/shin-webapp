import { ReactNode } from 'react';
import { ButtonProps } from 'src/modules/General/components/Button/index.types';

export interface EmptyBoxProps {
  icon?: ReactNode;
  title?: string;
  subtitle?: string;
  button?: ButtonProps;
}
