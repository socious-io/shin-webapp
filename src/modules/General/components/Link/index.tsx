import { Link as MuiLink } from '@mui/material';
import React from 'react';

import css from './index.module.scss';
import { LinkProps } from './index.types';
const Link: React.FC<LinkProps> = props => {
  const { label, href, customStyle, target = '_self' } = props;
  return (
    <MuiLink className={`${css.link} ${customStyle}`} href={href} target={target} {...props}>
      {label}
    </MuiLink>
  );
};
export default Link;
