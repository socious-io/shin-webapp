import Button from 'src/modules/General/components/Button';

import styles from './fallback.module.scss';

export const FallBack = () => {
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
      <div className={styles['error__msg']}>Internal Server Error</div>
      <div className={styles['error__details']}>We apologize for the inconvenience. Please try again later</div>
      <div className={styles['content']}>
        <Button color="primary" variant="outlined" className={styles['content__button']}>
          <a href="/" className={styles['content__link']}>
            Home Page
          </a>
        </Button>
      </div>
    </div>
  );
};
