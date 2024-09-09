import React from 'react';
import FeaturedIcon from 'src/modules/General/components/FeaturedIcon';
import { Link } from 'src/modules/General/components/Link';
import Modal from 'src/modules/General/components/Modal';
import { ProofRequestModal } from 'src/modules/Verifications/components/ProofRequestModal';

import { useProofRequest } from './useProofRequest';

export const ProofRequest = () => {
  const { verificationStatus, setVerificationStatus, verification, translate } = useProofRequest();
  return (
    <>
      <ProofRequestModal
        open={!verificationStatus}
        handleClose={() => {
          return;
        }}
        title={verification?.name || ''}
        subtitle={verification?.description || ''}
        shortLink={verification?.connection_url}
      />
      <Modal
        open={verificationStatus === 'succeed'}
        handleClose={() => setVerificationStatus(undefined)}
        icon={<FeaturedIcon iconName="check-circle" theme="success" size="xl" type="light-circle" />}
        title={translate('proof-succeed')}
        subTitle={translate('proof-succeed-desc')}
        mobileFullHeight
        headerDivider={false}
      >
        <div className="flex items-center justify-center mb-8">
          <Link label={translate('proof-continue')} href="/" />
        </div>
      </Modal>
      <Modal
        open={verificationStatus === 'error'}
        handleClose={() => setVerificationStatus(undefined)}
        icon={<FeaturedIcon iconName="alert-circle" theme="warning" size="xl" type="light-circle" />}
        title={translate('proof-error')}
        subTitle={translate('proof-error-desc')}
        mobileFullHeight
        headerDivider={false}
      >
        <div className="flex items-center justify-center mb-8">
          <Link label={translate('proof-try-again')} href="/" />
        </div>
      </Modal>

      <Modal
        open={verificationStatus === 'failed'}
        handleClose={() => setVerificationStatus(undefined)}
        icon={<FeaturedIcon iconName="alert-circle" theme="error" size="xl" type="light-circle" />}
        title={translate('proof-failed')}
        subTitle="proof-failed-desc"
        mobileFullHeight
        headerDivider={false}
      >
        <div className="flex items-center justify-center mb-8">
          <Link label={translate('proof-continue')} href="/" />
        </div>
      </Modal>
    </>
  );
};
