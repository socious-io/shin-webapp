import { SlideProps as MUISlideProps } from '@mui/material';

export interface SliderProps extends MUISlideProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  showHeader?: boolean;
  containerClassName?: string;
  contentClassName?: string;
}
