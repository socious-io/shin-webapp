import { ReactNode } from 'react';

export interface EmptyPageLayoutProps {
  headerIcon: ReactNode;
  title: string;
  subtitle: string;
  subtitle2?: string;
  children: ReactNode;
  backLinkLabel?: string;
  backLinkAction?: () => void;
}
