import { FormControlLabel, Checkbox as MUICheckbox } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './index.module.scss';
import { CheckboxProps } from './index.types';
import Icon from '../Icon';

const Checkbox: React.FC<CheckboxProps> = ({
  name,
  id,
  label,
  errors,
  type = 'square',
  size = 'small',
  control,
  ...props
}) => {
  const checkboxSize = size === 'small' ? 'w-4 h-4 ' : 'w-5 h-5';
  const fontSize = size === 'small' ? 12 : 14;

  return (
    <div className={css['container']}>
      <div className={`${css['checkbox']} ${errors ? css['checkbox--error'] : css['checkbox--normal']}`}>
        {control ? (
          <FormControlLabel
            control={
              <Controller
                name={name || ''}
                control={control}
                rules={{ required: props.required }}
                render={({ field: { onChange, value } }) => (
                  <MUICheckbox
                    id={id}
                    disableRipple
                    color="default"
                    checkedIcon={
                      <div className={`${checkboxSize} ${css[type]} ${css[`${type}--checked`]}`}>
                        <Icon
                          name="check"
                          color={type === 'square' ? variables.color_primary_600 : 'white'}
                          fontSize={fontSize}
                        />
                      </div>
                    }
                    icon={<div className={`${checkboxSize} ${css[type]} ${css[`${type}--checked`]}`} />}
                    sx={{ padding: '0' }}
                    checked={value}
                    onChange={onChange}
                  />
                )}
              />
            }
            label={
              label && (
                <label htmlFor={id} className={`${css['label']} ml-2`} aria-describedby={id}>
                  {label}
                </label>
              )
            }
          />
        ) : (
          <>
            <MUICheckbox
              id={id}
              disableRipple
              color="default"
              checkedIcon={
                <div className={`${checkboxSize} ${css[type]} ${css[`${type}--checked`]}`}>
                  <Icon
                    name="check"
                    color={type === 'square' ? variables.color_primary_600 : 'white'}
                    fontSize={fontSize}
                  />
                </div>
              }
              icon={<div className={`${checkboxSize} ${css[type]} ${css[`${type}--checked`]}`} />}
              sx={{ padding: '0' }}
              {...props}
            />
            {label && (
              <label htmlFor={id} className={css.label} aria-describedby={id}>
                {label}
              </label>
            )}
          </>
        )}
      </div>
      {errors &&
        errors.map((e, index) => (
          <p key={index} className={css['error']}>
            {e}
          </p>
        ))}
    </div>
  );
};

export default Checkbox;
