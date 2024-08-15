import { Button as MaterialButton } from '@mui/material';
import * as React from 'react';

import css from './index.module.scss';
import { ButtonProps } from './index.types';

const Button: React.FC<ButtonProps> = ({
  children,
  customStyle,
  color = 'primary',
  variant = 'contained',
  block,
  ...props
}) => {
  const size = block ? css['block'] : null;

  return (
    <MaterialButton
      disableRipple
      className={`${css['default']} ${css[color]} ${size} ${customStyle}`}
      color={color}
      variant={variant}
      {...props}
    >
      {children}
    </MaterialButton>
  );
};

export default Button;
