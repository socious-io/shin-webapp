import ManageOrg from 'src/modules/Profile/containers/ManageOrg';

import css from './index.module.scss';

export const OrgProfile = () => {
  return (
    <div className={css['container']}>
      <div className={css['top']}>
        <div className={css['top__header']}>
          <h1 className={css['top__title']}>Organization profile</h1>
          <h2 className={css['top__subtitle']}>Update your logo and organization details here.</h2>
        </div>
      </div>
      <ManageOrg />
    </div>
  );
};
