import { ReactNode } from 'react';
export type ChipTheme = 'primary' | 'secondary' | 'grey_blue' | 'error' | 'warning' | 'success';
export interface ChipProps {
  label: string;
  theme?: ChipTheme;
  shape?: 'round' | 'sharp';
  onStartIconClick?: () => void;
  onEndIconClick?: () => void;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  transparent?: boolean;
}
