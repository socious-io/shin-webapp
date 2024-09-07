export interface MenuItem {
  iconName?: string;
  label: string;
  action: () => void;
}
export interface ThreeDotButtonProps {
  menuItems: MenuItem[];
}
