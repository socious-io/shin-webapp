import React from 'react';
import { useTranslation } from 'react-i18next';
import FeaturedIcon from 'src/modules/General/components/FeaturedIcon';
import Modal from 'src/modules/General/components/Modal';

import { RejectedModalProps } from './index.types';

const RejectedModal: React.FC<RejectedModalProps> = ({ open, handleClose }) => {
  const { t: translate } = useTranslation();
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      icon={<FeaturedIcon type="light-circle" theme="error" size="lg" iconName="alert-circle" />}
      title={translate('kyb-rejected-modal-title')}
      subTitle={translate('kyb-rejected-modal-subtitle')}
      mobileFullHeight={false}
      mobileCentered={false}
      headerDivider={false}
      footerDivider={false}
      inlineTitle={false}
      customStyle="md:max-w-[480px]"
    />
  );
};

export default RejectedModal;
