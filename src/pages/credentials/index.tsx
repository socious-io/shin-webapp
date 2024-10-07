import Button from 'src/modules/General/components/Button';
import HorizontalTabs from 'src/modules/General/components/HorizontalTabs';
import Icon from 'src/modules/General/components/Icon';
import DetailModal from 'src/modules/KYB/containers/DetailModal';
import PendingModal from 'src/modules/KYB/containers/PendingModal';
import RejectedModal from 'src/modules/KYB/containers/RejectedModal';
import SuccessModal from 'src/modules/KYB/containers/SuccessModal';
import VerifyModal from 'src/modules/KYB/containers/VerifyModal';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './index.module.scss';
import { useCredentials } from './useCredentials';

export const Credentials = () => {
  const {
    data: { translate, tabs, isVerified, openModal },
    operations: { onCreateCredential, setOpenModal, onComplete },
  } = useCredentials();

  return (
    <>
      <div className={css['container']}>
        <div className={css['top']}>
          <div className={css['top__header']}>
            <h1 className={css['top__title']}>{translate('credential-header')}</h1>
            <h2 className={css['top__subtitle']}>{translate('credential-subheader')}</h2>
          </div>
          {isVerified && (
            <Button
              color="primary"
              startIcon={<Icon name="plus" color={variables.color_white} />}
              onClick={onCreateCredential}
            >
              {translate('credential-issue')}
            </Button>
          )}
        </div>
        <HorizontalTabs tabs={tabs} />
      </div>
      <VerifyModal
        open={openModal?.name === 'verify' && openModal.open}
        handleClose={() => setOpenModal({ name: 'verify', open: false })}
        handleContinue={() => setOpenModal({ name: 'detail', open: true })}
      />
      <DetailModal
        open={openModal?.name === 'detail' && openModal.open}
        handleClose={() => setOpenModal({ name: 'detail', open: false })}
        handleSuccess={() => setOpenModal({ name: 'success', open: true })}
      />
      <SuccessModal open={openModal?.name === 'success' && openModal.open} handleClose={onComplete} />
      <PendingModal
        open={openModal?.name === 'pending' && openModal?.open}
        handleClose={() => {
          setOpenModal({ name: 'pending', open: false });
        }}
      />
      <RejectedModal
        open={openModal?.name === 'rejected' && openModal?.open}
        handleClose={() => {
          setOpenModal({ name: 'rejected', open: false });
        }}
      />
    </>
  );
};
