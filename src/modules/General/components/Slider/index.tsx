import { Slide } from '@mui/material';
import React, { useRef } from 'react';

import css from './index.module.scss';
import { SliderProps } from './index.types';
import CloseButton from '../CloseButton';

export const Slider: React.FC<SliderProps> = ({ open, onClose, children, title }) => {
  return (
    <Slide direction="left" in={open} mountOnEnter unmountOnExit>
      <div className={css['container']} id="slide-out">
        <div className={css['container__title']}>
          {title}
          <CloseButton handleClose={onClose} customStyle={css['container__close']} />
        </div>
        <div className={css['container__content']}>{children}</div>
      </div>
    </Slide>
  );
};
