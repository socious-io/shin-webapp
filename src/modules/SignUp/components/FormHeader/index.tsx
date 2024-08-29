import React from 'react';

import css from './index.module.scss';
import { FormHeaderProps } from './index.types';

const FormHeader: React.FC<FormHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className={css['header']}>
      <div className={css['header__title']}>{title}</div>
      <div className={css['header__subtitle']}>{subtitle}</div>
    </div>
  );
};

export default FormHeader;
