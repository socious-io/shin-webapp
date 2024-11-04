import { ReactNode } from 'react';

export type SliderProps = {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  title: string;
};
