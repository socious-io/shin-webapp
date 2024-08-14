import { Typography } from '@mui/material';
import React from 'react';
import variables from 'src/styles/constants/_exports.module.scss';

import { AvatarLabelGroupProps } from './avatarLabelGroup.types';
import { Avatar } from '../Avatar';

export const AvatarLabelGroup: React.FC<AvatarLabelGroupProps> = props => {
  const { account, customStyle, handleClick, avatarSize, removeFull = false } = props;
  const nonFull = removeFull ? '' : 'w-full';

  return (
    <div
      className={`${nonFull} h-fit flex flex-row gap-3 py-3 px-4 ${customStyle} ${handleClick && 'cursor-pointer'}`}
      onClick={handleClick}
    >
      <Avatar img={account.img} type={account.type} size={avatarSize || '40px'} />
      <div className="flex flex-col">
        <Typography variant="subtitle2" color={variables.color_grey_900}>
          {account.name}
        </Typography>
        <Typography variant="caption" color={variables.color_grey_600}>
          {account.username.includes('@') ? account.username : `@${account.username}`}
        </Typography>
      </div>
    </div>
  );
};
