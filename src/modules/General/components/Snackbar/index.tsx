import { IconButton, Snackbar, SnackbarContent } from '@mui/material';
import Icon from 'src/modules/General/components/Icon';

import css from './index.module.scss';
import { CustomSnackbarProps } from './index.types';

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
  open,
  onClose,
  anchorOrigin = { vertical: 'top', horizontal: 'center' },
  children,
  theme = 'gray',
  icon,
  containerClassName = '',
  contentClassName = '',
  ...props
}) => {
  return (
    <Snackbar open={open} onClose={onClose} anchorOrigin={anchorOrigin} {...props}>
      <SnackbarContent
        className={`${css['container']} ${css[`container--${theme}`]} ${containerClassName}`}
        message={
          <div className={`${css['content']} ${css[`content--${theme}`]} ${contentClassName}`}>
            {icon}
            {children}
          </div>
        }
        action={[
          <IconButton key="close" className={css['close']} onClick={e => onClose?.(e, 'clickaway')}>
            <Icon name="x-close" fontSize={20} className="text-Gray-light-mode-500" cursor="pointer" />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
};

export default CustomSnackbar;
