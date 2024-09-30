import { useTranslation } from 'react-i18next';
import Button from 'src/modules/General/components/Button';
import Icon from 'src/modules/General/components/Icon';
import Notification from 'src/modules/General/components/Notification';
import EmptyVerifications from 'src/modules/Verifications/components/EmptyVerfications.tsx';
import VerificationList from 'src/modules/Verifications/components/VerificationList.tsx';

import css from './index.module.scss';
import { useVerifications } from './useVerifications';

export const Verifications = () => {
  const { t: translate } = useTranslation();
  const { list, setList, handleCreate, totalCount, notification, onCloseNotification } = useVerifications();
  return (
    <>
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
        {list?.length ? (
          <VerificationList list={list} setList={setList} totalItems={totalCount || 0} />
        ) : (
          <EmptyVerifications handleCreate={handleCreate} />
        )}
      </div>
      {notification.display && (
        <Notification title={notification.title} icon={notification.icon} onClose={onCloseNotification} />
      )}
    </>
  );
};
