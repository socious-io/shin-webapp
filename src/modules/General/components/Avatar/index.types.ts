import { CSSProperties } from 'react';
import { IdentityType } from 'src/core/adaptors';

export interface AvatarProps extends CSSProperties {
  size?: string;
  type: IdentityType;
  img?: string;
  iconName?: string;
  onClick?: () => void;
  customStyle?: string;
  iconCustomStyle?: string;
  badge?: { image: string; color: string; width?: string; height?: string };
  iconSize?: number;
  hasBorder?: boolean;
  isVerified?: boolean;
}
