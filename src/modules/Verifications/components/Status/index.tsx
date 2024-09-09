import React from 'react';
import Chip from 'src/modules/General/components/Chip';
import { ChipTheme } from 'src/modules/General/components/Chip/index.types';

import { StatusProps, StatusValue } from './index.types';

const Status: React.FC<StatusProps> = ({ status }) => {
  const theme: Record<StatusValue, ChipTheme> = {
    REQUESTED: 'grey_blue',
    VEIFIED: 'success',
    FAILED: 'error',
  };

  const label: Record<StatusValue, string> = {
    REQUESTED: 'Requested',
    VEIFIED: 'Verified',
    FAILED: 'Failed',
  };

  return <Chip label={label[status]} shape="round" theme={theme[status]} size="sm" />;
};

export default Status;
