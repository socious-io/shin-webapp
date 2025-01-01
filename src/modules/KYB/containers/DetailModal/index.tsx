import React from 'react';
import Button from 'src/modules/General/components/Button';
import FeaturedIcon from 'src/modules/General/components/FeaturedIcon';
import Modal from 'src/modules/General/components/Modal';
import ProgressFileUploader from 'src/modules/General/components/ProgressFileUploader';

import css from './index.module.scss';
import { DetailModalProps } from './index.types';
import { useDetailModal } from './useDetailModal';

const DetailModal: React.FC<DetailModalProps> = ({ open, handleClose, handleSuccess }) => {
  const {
    data: { translate, files, progressValues, uploadedErrors, error, loading },
    operations: { handleContinue, onDropFiles, onDeleteFiles },
  } = useDetailModal(handleSuccess);
  const footerJSX = (
    <div className={css['footer']}>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleContinue}
        disabled={!files.length || !!Object.values(uploadedErrors).some(Boolean)}
      >
        {translate('kyb-send-button')}
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
      icon={<FeaturedIcon type="light-circle" theme="primary" size="lg" iconName="upload-cloud-02" />}
      title={translate('kyb-detail-modal-title')}
      subTitle={translate('kyb-detail-modal-subtitle')}
      footer={footerJSX}
      mobileFullHeight={false}
      mobileCentered
      footerDivider={false}
      customStyle="md:max-w-[480px]"
      inlineTitle={false}
    >
      <div className="px-4 py-5 md:px-6">
        <ProgressFileUploader
          files={files}
          onDropFiles={onDropFiles}
          onDeleteFiles={onDeleteFiles}
          fileTypes={['PDF', 'PNG', 'JPG']}
          progressValues={progressValues}
          uploadedErrors={uploadedErrors}
          maxSize={2}
          maxFiles={10}
          error={error}
          loading={loading}
          customStyle="h-[126px]"
        />
      </div>
    </Modal>
  );
};

export default DetailModal;
