import { translate } from 'src/core/helpers/utils';
import ManageOrg from 'src/modules/Organization/containers/ManageOrg';

import css from './index.module.scss';

export const OrgProfile = () => {
  return (
    <div className={css['container']}>
      <div className={css['top']}>
        <div className={css['top__header']}>
          <h1 className={css['top__title']}>{translate('org-profile-header')}</h1>
          <h2 className={css['top__subtitle']}>{translate('org-profile-subheader')}</h2>
        </div>
      </div>
      <ManageOrg />
    </div>
  );
};
