import React from 'react';
import Button from 'src/modules/General/components/Button';
import FeaturedIcon from 'src/modules/General/components/FeaturedIcon';
import Modal from 'src/modules/General/components/Modal';
import CustomStepper from 'src/modules/KYB/components/CustomStepper';

import css from './index.module.scss';
import { VerifyModalProps } from './index.types';
import { useVerifyModal } from './useVerifyModal';

const VerifyModal: React.FC<VerifyModalProps> = ({ open, handleClose, handleContinue }) => {
  const {
    data: { steps },
    operations: { translate },
  } = useVerifyModal();
  const footer = (
    <div className={css['footer']}>
      <Button variant="contained" color="primary" fullWidth onClick={handleContinue}>
        {translate('kyb-continue')}
      </Button>
      <Button variant="outlined" color="primary" fullWidth onClick={handleClose}>
        {translate('kyb-cancel')}
      </Button>
    </div>
  );
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      icon={<FeaturedIcon type="light-circle" theme="success" size="lg" iconName="check-verified-03" />}
      title={translate('kyb-verify-modal-title')}
      subTitle={translate('kyb-verify-modal-subtitle')}
      mobileFullHeight={false}
      mobileCentered
      headerDivider
      footerDivider={false}
      inlineTitle={false}
      footer={footer}
      customStyle="md:max-w-[480px]"
    >
      <div className={css['container']}>
        {steps.map(item => (
          <CustomStepper key={item.title} {...item} />
        ))}
      </div>
    </Modal>
  );
};

export default VerifyModal;
