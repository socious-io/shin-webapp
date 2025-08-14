import css from './index.module.scss';
import { ChipProps } from './index.types';

const Chip: React.FC<ChipProps> = ({
  label,
  onStartIconClick,
  onEndIconClick,
  startIcon,
  endIcon,
  theme = 'primary',
  shape = 'round',
  size = 'md',
  transparent = false,
}) => {
  const chipClasses = `${css[`chip-${size}`]} ${css[`${theme}-theme`]} ${
    shape === 'round' ? css.round : css.sharp
  } ${transparent ? css[`${theme}-transparent`] : ''}`;

  return (
    <div className={chipClasses}>
      {startIcon && <div onClick={onStartIconClick}>{startIcon}</div>}
      {label}
      {endIcon && <div onClick={onEndIconClick}>{endIcon}</div>}
    </div>
  );
};

export default Chip;
