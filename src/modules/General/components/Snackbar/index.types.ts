import { SnackbarProps } from '@mui/material';

export interface CustomSnackbarProps extends SnackbarProps {
  theme?: 'primary' | 'gray' | 'error' | 'warning' | 'success';
  icon?: React.ReactNode;
  containerClassName?: string;
  contentClassName?: string;
}
