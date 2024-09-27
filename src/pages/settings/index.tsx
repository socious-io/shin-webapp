import { useTranslation } from 'react-i18next';
import DeleteAccount from 'src/modules/Settings/containers/DeleteAccount';
import InfoForm from 'src/modules/Settings/containers/InfoForm';
import LanguageSwitcher from 'src/modules/Settings/containers/LanguageSwitcher';
import PasswordForm from 'src/modules/Settings/containers/PasswordForm';

import css from './index.module.scss';

export const Settings = () => {
  const { t: translate } = useTranslation();

  return (
    <div className={css['container']}>
      <div className={css['top']}>
        <div className={css['top__header']}>
          <h1 className={css['top__title']}>{translate('settings-header')}</h1>
        </div>
      </div>
      <div className={css['content']}>
        <InfoForm />
        <PasswordForm />
        <LanguageSwitcher />
        <DeleteAccount />
      </div>
    </div>
  );
};
