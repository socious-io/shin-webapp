import React from 'react';
import FeaturedIcon from 'src/modules/General/components/FeaturedIcon';
import { Link } from 'src/modules/General/components/Link';
import Modal from 'src/modules/General/components/Modal';
import { ProofRequestModal } from 'src/modules/Verifications/components/ProofRequestModal';

import { useProofRequest } from './useProofReques';

export const ProofRequest = () => {
  const { connectUrl, loading, verificationStatus, setVerificationStatus, verification } = useProofRequest();
  return (
    <>
      <ProofRequestModal
        open={!verificationStatus}
        handleClose={() => {
          return;
        }}
        title={verification?.name || ''}
        subtitle={verification?.description || ''}
        shortLink={connectUrl}
        loading={loading}
      />
      <Modal
        open={verificationStatus === 'succeed'}
        handleClose={() => setVerificationStatus(undefined)}
        icon={<FeaturedIcon iconName="check-circle" theme="success" size="xl" type="light-circle" />}
        title="Verification Successful"
        subTitle="Thank you! Your credentials have been verified successfully."
        mobileFullHeight
        headerDivider={false}
      >
        <Link label="Continue" href="/home" />
      </Modal>
      <Modal
        open={verificationStatus === 'error'}
        handleClose={() => setVerificationStatus(undefined)}
        icon={<FeaturedIcon iconName="alert-circle" theme="warning" size="xl" type="light-circle" />}
        title="Verification Error"
        subTitle="An error occurred during the verification process. Please try again later or contact support if the problem persists."
        mobileFullHeight
        headerDivider={false}
      >
        <Link label="Try again" href="/home" />
      </Modal>

      <Modal
        open={verificationStatus === 'failed'}
        handleClose={() => setVerificationStatus(undefined)}
        icon={<FeaturedIcon iconName="alert-circle" theme="error" size="xl" type="light-circle" />}
        title="Verification Failed"
        subTitle="We're sorry, but we couldn't verify your credentials."
        mobileFullHeight
        headerDivider={false}
      >
        <Link label="Continue" href="/home" />
      </Modal>
    </>
  );
};
