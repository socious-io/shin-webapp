import React from 'react';
import logo from 'src/assets/logo/logo.svg';
import Icon from 'src/modules/General/components/Icon';
import PaginationDotGroup from 'src/modules/General/components/PaginationDotGroup';
import Stepper from 'src/modules/General/components/Stepper';

import css from './index.module.scss';
import { StepperLayoutProps } from './index.types';
import { useStepperLayout } from './useStepperLayout';

const StepperLayout: React.FC<StepperLayoutProps> = ({ activeStep, children }) => {
  const { steps } = useStepperLayout();
  return (
    <div className={css['container']}>
      <div className={`hidden md:flex ${css['stepper']}`}>
        <img src={logo} alt="SHIN_LOGO" width="79px" height="32px" />
        <Stepper activeStep={activeStep} steps={steps} orientation="vertical" />
        <div className={css['stepper__footer']}>
          <span className={css['stepper__footer__text']}>© Socious Global Inc. 2024</span>
          <div className="flex gap-2">
            <Icon name="mail-01" fontSize={16} className="text-Gray-light-mode-600" />
            <span className={css['stepper__footer__text']}>help@socious.io</span>
          </div>
        </div>
      </div>
      <div className={css['form']}>
        {children}
        <PaginationDotGroup shape="oval" count={3} transparent active={activeStep} size="sm" />
      </div>
    </div>
  );
};

export default StepperLayout;
