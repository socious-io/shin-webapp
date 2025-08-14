import { useNavigate } from 'react-router-dom';
import { translate } from 'src/core/helpers/utils';
import Button from 'src/modules/General/components/Button';

import styles from './index.module.scss';

export const FallBack = () => {
  const navigate = useNavigate();
  const flag = 'refreshed';
  const refreshed = sessionStorage.getItem(flag);

  if (!refreshed) {
    sessionStorage.setItem(flag, `${new Date().getTime()}`);
    window.location.reload();
    return <></>;
  }

  return (
    <div className={styles['container']}>
      <div className={styles['error__code']}>500</div>
      <div className={styles['error__msg']}>{translate('error-internal.header')}</div>
      <div className={styles['error__details']}>{translate('error-internal.subheader')}</div>
      <Button color="primary" onClick={() => navigate('/')}>
        {translate('error-internal.home-btn')}
      </Button>
    </div>
  );
};
