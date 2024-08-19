import { Checkbox as MUICheckbox } from '@mui/material';
import React from 'react';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './index.module.scss';
import { CheckboxProps, IconProps } from './index.types';
import Icon from '../Icon';

const SquareIcon: React.FC<IconProps> = ({ checked, size }) => {
  return (
    <div
      className={`${size === 'small' ? 'w-4 h-4 ' : 'w-5 h-5 '} ${css.icon} ${!checked && css.iconNotChecked} ${
        checked && css.iconChecked
      }`}
    >
      {checked && <Icon name="check" color={variables.color_primary_600} fontSize={size === 'small' ? 12 : 14} />}
    </div>
  );
};

const CircleIcon: React.FC<IconProps> = ({ checked, size }) => {
  return (
    <div
      className={` rounded-lg flex items-center justify-center ${size === 'small' ? 'w-4 h-4 ' : 'w-5 h-5 '} ${
        !checked && css.circleIconNotChecked
      } ${checked && css.circleIconChecked}`}
    >
      {checked && <Icon name="check" color="white" fontSize={size === 'small' ? 10 : 14} />}
    </div>
  );
};

const Checkbox: React.FC<CheckboxProps> = ({
  name,
  id,
  label,
  required,
  register,
  errors,
  isValid,
  type = 'checkBox',
  size = 'small',
  ...props
}) => {
  return (
    <div className={css.container}>
      <div className={css.checkboxContainer}>
        <MUICheckbox
          id={id}
          disableRipple
          color="default"
          checkedIcon={type === 'checkBox' ? <SquareIcon checked size={size} /> : <CircleIcon checked size={size} />}
          icon={
            type === 'checkBox' ? (
              <SquareIcon checked={false} size={size} />
            ) : (
              <CircleIcon checked={false} size={size} />
            )
          }
          sx={{ padding: '2px 0 0 0' }}
          {...(register ? register(name) : {})}
          {...props}
        />
        {label && (
          <label htmlFor={id} className={css.label} aria-describedby={id}>
            {label}
          </label>
        )}
      </div>
    </div>
  );
};

export default Checkbox;
