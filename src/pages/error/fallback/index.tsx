import { translate } from 'src/core/helpers/utils';
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
      <div className={css['error__msg']}>{translate('error-internal.header')}</div>
      <div className={css['error__details']}>{translate('error-internal.subheader')}</div>
      <div className={css['content']}>
        <Button color="primary" variant="outlined" className={css['content__button']}>
          <a href="/" className={css['content__link']}>
            {translate('error-internal.home-btn')}
          </a>
        </Button>
      </div>
    </div>
  );
};
