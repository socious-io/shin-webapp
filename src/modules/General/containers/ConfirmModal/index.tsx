import React from 'react';
import Button from 'src/modules/General/components/Button';
import Modal from 'src/modules/General/components/Modal';

import css from './index.module.scss';
import { ConfirmModalProps } from './index.types';

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  handleClose,
  confirmHeader,
  confirmSubheader = '',
  buttons = [],
  headerDivider = false,
  mobileCentered = true,
  contentClassName = '',
  ...props
}) => {
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      headerDivider={headerDivider}
      mobileCentered={mobileCentered}
      contentClassName={`${css['content']} ${contentClassName}`}
      {...props}
    >
      <div className="flex flex-col gap-1">
        <span className={css['content__title']}>{confirmHeader}</span>
        <span className={css['content__subtitle']}>{confirmSubheader}</span>
      </div>
      {!!buttons.length && (
        <div className={css['content__buttons']}>
          {buttons.map((button, index) => (
            <Button key={index} {...button} />
          ))}
        </div>
      )}
    </Modal>
  );
};

export default ConfirmModal;
