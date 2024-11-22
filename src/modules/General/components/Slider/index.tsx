import { Slide } from '@mui/material';

import css from './index.module.scss';
import { SliderProps } from './index.types';
import CloseButton from '../CloseButton';

export const Slider: React.FC<SliderProps> = ({
  open,
  onClose,
  children,
  title,
  direction = 'left',
  mountOnEnter = true,
  unmountOnExit = true,
  showHeader = true,
  containerClassName = '',
  contentClassName = '',
  ...props
}) => {
  return (
    <Slide in={open} direction={direction} mountOnEnter={mountOnEnter} unmountOnExit={unmountOnExit} {...props}>
      <div className={`${css['container']} ${containerClassName}`} id="slide-out">
        {showHeader && (
          <div className={css['header']}>
            <div className={css['header__title']}>{title}</div>
            <CloseButton handleClose={onClose} customStyle={css['header__close']} />
          </div>
        )}
        <div className={`${css['content']} ${contentClassName}`}>{children}</div>
      </div>
    </Slide>
  );
};
