import { useNavigate } from 'react-router-dom';
import { translate } from 'src/core/helpers/utils';
import Button from 'src/modules/General/components/Button';

import styles from './index.module.scss';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles['container']}>
      <h1 className={styles['header']}>{translate('error-not-found.header')}</h1>
      <p className={styles['subheader']}>
        {translate('error-not-found.subheader')}
        <span className={styles['brand']}> {'Socious Verify'}</span>.
      </p>
      <Button color="primary" onClick={() => navigate('/')}>
        {translate('error-not-found.go-to-home-btn')}
      </Button>
    </div>
  );
};
