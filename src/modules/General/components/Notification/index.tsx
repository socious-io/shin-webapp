import React from 'react';
import { useDispatch } from 'react-redux';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './index.module.scss';
import { NotificationProps } from './index.types';
import IconButton from '../IconButton';

const Notification: React.FC<NotificationProps> = ({ title, icon, onClose }) => {
  const dispatch = useDispatch();
  return (
    <div className={css['container']}>
      <div className={css['notification']}>
        <div className={css['notification__message']}>
          {icon}
          <div className={css['notification__title']}>{title}</div>
        </div>
        <IconButton
          iconName="x-close"
          iconSize={20}
          iconColor={variables.color_grey_600}
          size="large"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default Notification;
