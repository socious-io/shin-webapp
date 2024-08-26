import Icon from 'src/modules/General/components/Icon';

import css from './index.module.scss';
import { LinkItemProps } from './index.types';

const LinkItem: React.FC<LinkItemProps> = ({ iconName, title, isSelected = false, onClick }) => {
  return (
    <div className={`${css['container']} ${isSelected && css['selected']}`} onClick={onClick}>
      <Icon name={iconName} fontSize={24} className={`${css['icon']} ${isSelected && css['selected']}`} />
      {title}
    </div>
  );
};

export default LinkItem;
