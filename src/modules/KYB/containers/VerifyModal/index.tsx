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
  } = useVerifyModal();
  const footer = (
    <div className={css['footer']}>
      <Button variant="contained" color="primary" fullWidth onClick={handleContinue}>
        Continue
      </Button>
      <Button variant="outlined" color="primary" fullWidth onClick={handleClose}>
        Cancel
      </Button>
    </div>
  );
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      icon={<FeaturedIcon type="light-circle" theme="success" size="lg" iconName="check-verified-03" />}
      title="Verify your organization"
      subTitle="Get your organization verified to issue credentials."
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
