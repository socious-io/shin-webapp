import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router-dom';
import Button from 'src/modules/General/components/Button';

import css from './index.module.scss';
import { useVerifications } from './useVerifications';

export const Verifications = () => {
  const { t } = useTranslation();
  const { data } = useVerifications();
  return (
    <div className={css.container}>
      <div className={css['header']}>
        <div className={css['text']}>
          <div className={css['text__title']}>{t('ver_title')}</div>
          <div className={css['text__subtitle']}>{t('ver_subtitle')}</div>
        </div>
        <Button color="primary">{t('ver_create_btn')}</Button>
      </div>
    </div>
  );
};
