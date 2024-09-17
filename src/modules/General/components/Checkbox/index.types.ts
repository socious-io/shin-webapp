import { CheckboxProps as DefaultProps } from '@mui/material';

export interface CheckboxProps extends DefaultProps {
  id: string;
  label?: string;
  control?: any;
  errors?: string[];
  type?: 'square' | 'circle';
  size?: 'small' | 'medium';
}

export interface IconProps {
  checked: boolean;
  size: 'small' | 'medium';
}
