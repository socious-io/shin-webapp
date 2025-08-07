import { translate } from 'src/core/helpers/utils';
import LanguageSwitcher from 'src/modules/Settings/containers/LanguageForm';

import css from './index.module.scss';

export const Settings = () => {
  return (
    <div className={css['container']}>
      <div className={css['top']}>
        <div className={css['top__header']}>
          <h1 className={css['top__title']}>{translate('settings-header')}</h1>
        </div>
      </div>
      <div className={css['content']}>
        {/* <InfoForm /> */}
        {/* <PasswordForm /> */}
        <LanguageSwitcher />
        {/* <DeleteAccount /> */}
      </div>
    </div>
  );
};
