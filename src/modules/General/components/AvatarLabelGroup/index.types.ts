export interface AccountItem {
  id: string;
  img?: string;
  type: 'organizations' | 'users';
  name: string;
  email: string;
  selected?: boolean;
}

export interface AvatarLabelGroupProps {
  account: AccountItem;
  customStyle?: string;
  handleClick?: () => void;
  avatarSize?: string;
  removeFull?: boolean;
}
