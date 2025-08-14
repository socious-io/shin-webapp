import Button from 'src/modules/General/components/Button';
import CopyLinkModal from 'src/modules/General/components/CopyLinkModal';
import HorizontalTabs from 'src/modules/General/components/HorizontalTabs';
import Icon from 'src/modules/General/components/Icon';
import CustomSnackbar from 'src/modules/General/components/Snackbar';
import EmptyVerifications from 'src/modules/Verifications/containers/EmptyVerifications';
import HistorySlider from 'src/modules/Verifications/containers/HistorySlider';

import css from './index.module.scss';
import { useVerifications } from './useVerifications';

export const Verifications = () => {
  const {
    data: { notification, emptyList, tabs, url, openModal, selectedId },
    operations: { handleCreate, onCloseNotification, translate, setOpenModal, handleCopy },
  } = useVerifications();
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
        {emptyList ? (
          <EmptyVerifications handleCreate={handleCreate} />
        ) : (
          <>
            <HorizontalTabs tabs={tabs} />
            {url && (
              <CopyLinkModal
                open={openModal?.name === 'copy' && openModal.open}
                handleClose={() => setOpenModal({ name: 'copy', open: false })}
                title={translate('ver-copy-modal-title')}
                subtitle={translate('ver-copy-modal-subtitle')}
                link={url}
                onCopy={handleCopy}
              />
            )}
            {openModal?.name === 'history' && openModal.open && (
              <HistorySlider
                verificationId={selectedId}
                open={openModal?.name === 'history' && openModal.open}
                handleClose={() => setOpenModal({ name: 'history', open: false })}
              />
            )}
          </>
        )}
      </div>
      <CustomSnackbar
        open={notification.display}
        onClose={onCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        className={css['snackbar']}
        autoHideDuration={5000}
      >
        <div className={css['snackbar__content']}>
          {notification.icon}
          {notification.title}
        </div>
      </CustomSnackbar>
    </>
  );
};
