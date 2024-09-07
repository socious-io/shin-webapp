export interface IconProps {
  name: string;
  color?: string;
  fontSize?: number;
  className?: string;
  containerClass?: string;
  cursor?: 'pointer' | 'text' | 'default';
  onClick?: (e?: React.MouseEvent<HTMLDivElement>) => void;
}
