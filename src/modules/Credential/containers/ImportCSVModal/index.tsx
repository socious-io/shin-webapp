import Button from 'src/modules/General/components/Button';
import LoadingSpinner from 'src/modules/General/components/LoadingSpinner';
import Modal from 'src/modules/General/components/Modal';
import NewFileUploader from 'src/modules/General/components/NewFileUploader';

import css from './index.module.scss';
import { ImportCSVModalProps } from './index.types';
import { useImportCSVModal } from './useImportCSVModal';

const ImportCSVModal: React.FC<ImportCSVModalProps> = ({
  open,
  handleClose,
  selectedSchema,
  totalImportedRecipients = 0,
  onImportFiles,
}) => {
  const {
    data: { translate, file, disabledButton, loading, showError },
    operations: { onUploadFile, onDeleteFile, onImport, onDownload },
  } = useImportCSVModal(onImportFiles, selectedSchema, open);

  const footerJSX = (
    <div className={css['footer']}>
      {totalImportedRecipients ? (
        <Button variant="text" color="primary" customStyle="!p-0" onClick={handleClose}>
          {translate('credential-step2.import.uploaded-button')}
        </Button>
      ) : (
        <>
          <Button color="primary" disabled={disabledButton} onClick={onImport}>
            {loading ? <LoadingSpinner /> : translate('credential-step2.import.button')}
          </Button>
          <Button variant="outlined" color="primary" onClick={onDownload}>
            {translate('credential-step2.import.download', { name: selectedSchema.name })}
          </Button>
        </>
      )}
    </div>
  );

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title={
        totalImportedRecipients
          ? translate('credential-step2.import.uploaded-title', { total: totalImportedRecipients })
          : translate('credential-step2.import.title')
      }
      subTitle={
        totalImportedRecipients
          ? translate('credential-step2.import.uploaded-subtitle')
          : translate('credential-step2.import.subtitle')
      }
      headerDivider={false}
      footer={footerJSX}
      footerDivider={false}
      mobileCentered
      customStyle="md:max-w-[480px]"
      contentClassName={css['content']}
    >
      <NewFileUploader
        files={file}
        fileTypes={['CSV']}
        onDropFiles={onUploadFile}
        onDeleteFiles={onDeleteFile}
        maxSize={50}
        maxFiles={1}
        error={showError ? translate('credential-step2.import.upload-error') : ''}
        loadingMessage={totalImportedRecipients ? translate('credential-step2.import.uploaded-loading') : ''}
        customText={translate('credential-step2.import.upload-text')}
        showSubtitle={false}
        customStyle="h-[126px]"
      />
    </Modal>
  );
};

export default ImportCSVModal;
