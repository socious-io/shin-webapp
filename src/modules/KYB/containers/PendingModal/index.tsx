import React from 'react';
import { useTranslation } from 'react-i18next';
import FeaturedIcon from 'src/modules/General/components/FeaturedIcon';
import Modal from 'src/modules/General/components/Modal';

import { PendingModalProps } from './idex.types';

const PendingModal: React.FC<PendingModalProps> = ({ open, handleClose }) => {
  const { t: translate } = useTranslation();
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      icon={<FeaturedIcon type="light-circle" theme="warning" size="lg" iconName="alert-circle" />}
      title={translate('kyb-pending-modal-title')}
      subTitle={translate('kyb-pending-modal-subtitle')}
      mobileFullHeight={false}
      mobileCentered={false}
      headerDivider={false}
      footerDivider={false}
      inlineTitle={false}
      customStyle="md:max-w-[480px]"
    />
  );
};

export default PendingModal;
