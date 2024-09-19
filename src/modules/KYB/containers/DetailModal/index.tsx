import React from 'react';
import Button from 'src/modules/General/components/Button';
import FeaturedIcon from 'src/modules/General/components/FeaturedIcon';
import { FileUploaderMultiple } from 'src/modules/General/components/fileUploaderMultiple';
import Modal from 'src/modules/General/components/Modal';

import css from './index.module.scss';
import { DetailModalProps } from './index.types';
import { useDetailModal } from './useDetailModal';

const DetailModal: React.FC<DetailModalProps> = ({ open, handleClose, handleSuccess }) => {
  const {
    data: { loading, files },
    operations: { handleContinue, setFiles },
  } = useDetailModal(handleSuccess);
  const footerJSX = (
    <div className={css['footer']}>
      <Button variant="contained" color="primary" fullWidth onClick={handleContinue} disabled={!files.length}>
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
      icon={<FeaturedIcon type="light-circle" theme="primary" size="lg" iconName="upload-cloud-02" />}
      title="Send your organization details"
      subTitle="Please upload your company registration document, like a certificate or equivalent."
      footer={footerJSX}
      mobileFullHeight={false}
      mobileCentered
      footerDivider={false}
      customStyle="md:max-w-[480px]"
      inlineTitle={false}
    >
      <div className="px-4 py-5 md:px-6">
        <FileUploaderMultiple
          fileTypes={['PDF', 'PNG', 'JPG']}
          maxFileNumbers={10}
          maxSize={2}
          customStyle="w-full h-[126px]"
          uploaded={files}
          setUploaded={setFiles}
          loading={loading}
        />
      </div>
    </Modal>
  );
};

export default DetailModal;
