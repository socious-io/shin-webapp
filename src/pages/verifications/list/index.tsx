import { useTranslation } from 'react-i18next';
import Button from 'src/modules/General/components/Button';
import Icon from 'src/modules/General/components/Icon';
import EmptyVerifications from 'src/modules/Verifications/components/EmptyVerfications.tsx';
import VerificationList from 'src/modules/Verifications/components/VerificationList.tsx';

import css from './index.module.scss';
import { useVerifications } from './useVerifications';

export const Verifications = () => {
  const { t: translate } = useTranslation();
  const { data, handleCreate } = useVerifications();
  return (
    <div className={css['container']}>
      <div className={css['header']}>
        <div className={css['text']}>
          <div className={css['text__title']}>{translate('ver_title')}</div>
          <div className={css['text__subtitle']}>{translate('ver_subtitle')}</div>
        </div>
        <Button color="primary" onClick={handleCreate}>
          <Icon fontSize={20} name="plus" className="text-Base-White" />

          {translate('ver_create_btn')}
        </Button>
      </div>
      {data.items.length ? (
        <VerificationList list={data.items} totalItems={data.totalCount} />
      ) : (
        <EmptyVerifications handleCreate={handleCreate} />
      )}
    </div>
  );
};
