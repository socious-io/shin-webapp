import FeaturedIcon from 'src/modules/General/components/FeaturedIcon';
import Link from 'src/modules/General/components/Link';
import Modal from 'src/modules/General/components/Modal';
import { ProofRequestModal } from 'src/modules/Verifications/components/ProofRequestModal';

import { useProofRequest } from './useProofRequest';

export const ProofRequest = () => {
  const {
    data: { translate, data, dataStatus },
    operations: { setDataStatus, navigate },
  } = useProofRequest();

  return (
    <>
      <ProofRequestModal
        open={!dataStatus}
        handleClose={() => navigate('/verifications')}
        title={data?.name || ''}
        subtitle={data?.description || ''}
        shortLink={data?.connection_url}
      />
      <Modal
        open={dataStatus === 'succeed'}
        handleClose={() => setDataStatus('')}
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
        open={dataStatus === 'error'}
        handleClose={() => setDataStatus('')}
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
        open={dataStatus === 'failed'}
        handleClose={() => setDataStatus('')}
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
