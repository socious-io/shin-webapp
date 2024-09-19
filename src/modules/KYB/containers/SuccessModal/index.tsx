import React from 'react';
import FeaturedIcon from 'src/modules/General/components/FeaturedIcon';
import Modal from 'src/modules/General/components/Modal';

import { SuccessModalProps } from './index.type';

const SuccessModal: React.FC<SuccessModalProps> = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      icon={<FeaturedIcon type="light-circle" theme="success" size="lg" iconName="check-circle" />}
      title="Your documents have been sent"
      subTitle="Our verification team will take 1-3 days to process your verification request. An email and notification will be sent to you upon successful verification and you will then be able to issue credentials."
      mobileFullHeight={false}
      mobileCentered={false}
      headerDivider={false}
      footerDivider={false}
      inlineTitle={false}
      customStyle="md:max-w-[480px]"
    />
  );
};

export default SuccessModal;
