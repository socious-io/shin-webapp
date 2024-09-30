import { ReactNode } from 'react';

export interface NotificationProps {
  icon: ReactNode;
  title: string;
  onClose: () => void;
}
