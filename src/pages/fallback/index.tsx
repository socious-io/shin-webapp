import Button from 'src/modules/General/components/Button';

import css from './index.module.scss';

export const FallBack = () => {
  const flag = 'refreshed';
  const refreshed = sessionStorage.getItem(flag);

  if (!refreshed) {
    sessionStorage.setItem(flag, `${new Date().getTime()}`);
    window.location.reload();
    return <></>;
  }

  return (
    <div className={css['container']}>
      <div className={css['error__code']}>500</div>
      <div className={css['error__msg']}>Internal Server Error</div>
      <div className={css['error__details']}>We apologize for the inconvenience. Please try again later</div>
      <div className={css['content']}>
        <Button color="primary" variant="outlined" className={css['content__button']}>
          <a href="/" className={css['content__link']}>
            Home Page
          </a>
        </Button>
      </div>
    </div>
  );
};
