import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import shinLogo from 'src/assets/images/logo/logo.svg';
import Icon from 'src/modules/General/components/Icon';

import css from './index.module.scss';

interface SignInLayoutProps {
  children: ReactNode;
}
const SignInLayout: React.FC<SignInLayoutProps> = ({ children }) => {
  const { t } = useTranslation();
  return (
    <div className={css['container']}>
      <div className={`w-full lg:min-w-[600px] ${css['form']}`}>
        <img src={shinLogo} alt="SHIN_LOGO" width="79px" height="32px" />
        {children}
        <div className={css['form__footer']}>
          <span className={css['form__subtitle']}>@ Socious Global Inc. 2024</span>
          <span className={`flex gap-2 ${css['form__subtitle']}`}>
            <Icon name="mail-01" fontSize={16} className="text-Gray-light-mode-600" />
            help@socious.io
          </span>
        </div>
      </div>
      <div className={`hidden lg:flex ${css['section']}`}>
        <div className="pr-16">
          <div className={css['section__title']}>{t('picture-desc')}</div>
          <div className={css['section__stars']}>
            {[...Array(5).map(i => <Icon key={i} name="Star" fontSize={20} className="text-Gray-light-mode-900" />)]}
          </div>
        </div>
        <div className={css['section__image']} />
      </div>
    </div>
  );
};

export default SignInLayout;
