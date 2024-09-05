import React from 'react';
import BackLink from 'src/modules/General/components/BackLink';

import css from './index.module.scss';
import { EmptyPageLayoutProps } from './index.type';

const EmptyPageLayout: React.FC<EmptyPageLayoutProps> = ({
  children,
  headerIcon,
  title,
  subtitle,
  subtitle2,
  backLinkLabel,
  backLinkAction,
}) => {
  return (
    <div className={`${css['layout']} py-12 px-4 md:pt-24 md:pb-12 md:px-8`}>
      <div className={`${css['container']} w-full md:w-[360px]`}>
        <div className={css['header']}>
          {headerIcon}
          <div className="text-center">
            <div className={css['header__title']}>{title}</div>
            <div className={css['header__subtitle1']}>{subtitle}</div>
            {subtitle2 && <div className={css['header__subtitle2']}>{subtitle2}</div>}
          </div>
        </div>
        {children}
        {backLinkLabel && <BackLink title={backLinkLabel} onBack={backLinkAction} />}
      </div>
    </div>
  );
};

export default EmptyPageLayout;
