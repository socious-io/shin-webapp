export interface BannerProps {
  theme: 'warning' | 'error' | 'success';
  iconName: string;
  title: string;
  subtitle: string;
  primaryBtnLabel: string;
  primaryBtnAction: () => void;
  secondaryBtnLabel?: string;
  secondaryBtnAction?: () => void;
}
