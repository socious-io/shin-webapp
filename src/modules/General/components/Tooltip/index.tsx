import { Tooltip as MUITooltip } from '@mui/material';
import React from 'react';

import css from './index.module.scss';
import { TooltipProps } from './index.types';

const Tooltip: React.FC<TooltipProps> = ({ children, offset, onClickTooltip, customStyle = '', ...props }) => {
  return (
    <MUITooltip
      slotProps={{
        popper: {
          onClick: onClickTooltip,
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [offset?.y || 0, offset?.x || 0],
              },
            },
          ],
        },
        tooltip: {
          className: `${css['tooltip']} ${customStyle}`,
        },
      }}
      {...props}
    >
      {children}
    </MUITooltip>
  );
};

export default Tooltip;
