import { Typography } from '@mui/material';
import React from 'react';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './index.module.scss';
import { AvatarLabelGroupProps } from './index.types';
import Avatar from '../Avatar';

const AvatarLabelGroup: React.FC<AvatarLabelGroupProps> = props => {
  const { account, customStyle, handleClick, avatarSize, removeFull = false } = props;

  return (
    <div
      className={`${css['container']} ${!removeFull && css['container--full']} ${customStyle} ${handleClick && 'cursor-pointer'}`}
      onClick={handleClick}
    >
      <Avatar img={account.img} type={account.type} size={avatarSize || '40px'} />
      <div className={css['info']}>
        <Typography variant="subtitle2" color={variables.color_grey_900}>
          {account.name}
        </Typography>
        <div className={css['subtitle']}>{account.email}</div>
      </div>
    </div>
  );
};

export default AvatarLabelGroup;
