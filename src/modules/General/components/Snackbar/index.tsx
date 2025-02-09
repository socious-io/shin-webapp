import { IconButton, Snackbar, SnackbarContent } from '@mui/material';
import React from 'react';
import Icon from 'src/modules/General/components/Icon';

import styles from './index.module.scss';
import { CustomSnackbarProps } from './index.types';

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
  open,
  onClose,
  anchorOrigin = { vertical: 'top', horizontal: 'center' },
  children,
  icon,
  containerClassName = '',
  contentClassName = '',
  ...props
}) => {
  return (
    <Snackbar open={open} onClose={onClose} anchorOrigin={anchorOrigin} {...props}>
      <SnackbarContent
        className={`${styles['container']} ${containerClassName}`}
        message={
          <div className={`${styles['content']} ${contentClassName}`}>
            {icon}
            {children}
          </div>
        }
        action={[
          <IconButton key="close" className={styles['close']} onClick={e => onClose?.(e, 'clickaway')}>
            <Icon name="x-close" fontSize={20} className="text-Gray-light-mode-500" cursor="pointer" />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
};

export default CustomSnackbar;
