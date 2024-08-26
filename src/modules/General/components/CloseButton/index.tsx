import React from 'react';
import Icon from 'src/modules/General/components/Icon';

import css from './index.module.scss';
import { CloseButtonProps } from './index.types';

const CloseButton: React.FC<CloseButtonProps> = ({ handleClose, customStyle }) => {
  return (
    <button className={`${css.btn} ${customStyle}`} onClick={handleClose}>
      <Icon
        name="x-close"
        fontSize={20}
        className="text-Gray-light-mode-500 !cursor-pointer"
        containerClass="!cursor-pointer"
      />
    </button>
  );
};

export default CloseButton;
