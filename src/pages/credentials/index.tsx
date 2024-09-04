import HorizontalTabs from 'src/modules/General/components/HorizontalTabs';

import css from './index.module.scss';
import { useCredentials } from './useCredentials';

export const Credentials = () => {
  const {
    data: { tabs },
  } = useCredentials();

  return (
    <div className={css['container']}>
      <div className={css['top']}>
        <div className={css['top__header']}>
          <h1 className={css['top__title']}>Credentials</h1>
          <h2 className={css['top__subtitle']}>Manage your credentials here.</h2>
        </div>
      </div>
      <HorizontalTabs tabs={tabs} />
    </div>
  );
};
