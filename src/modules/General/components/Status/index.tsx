import Icon from 'src/modules/General/components/Icon';
import variables from 'src/styles/constants/_exports.module.scss';

import { StatusProps } from './index.types';
import Chip from '../Chip';

const Status: React.FC<StatusProps> = ({ theme, icon, label, transparent = false }) => {
  const iconColor = {
    primary: variables.color_primary_600,
    success: variables.color_success_600,
    error: variables.color_error_600,
    warning: variables.color_warning_600,
    secondary: transparent ? variables.color_grey_600 : variables.color_grey_500,
  };

  return (
    <>
      <Chip
        startIcon={icon && <Icon name={icon} color={iconColor[theme]} fontSize={12} />}
        label={label}
        shape="round"
        theme={theme}
        size="sm"
        transparent={transparent}
      />
    </>
  );
};

export default Status;
