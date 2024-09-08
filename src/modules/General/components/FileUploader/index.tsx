import { Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Icon from 'src/modules/General/components/Icon';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './index.module.scss';
import { FileUploaderProps } from './index.types';
import { useFileUploader } from './useFileUploader';

const FileUploader: React.FC<FileUploaderProps> = ({
  customStyle,
  fileTypes,
  maxFileSize = 10,
  maxFileNumbers = 1,
  showFileName = true,
  setAttachments,
  setAttachmentsUrl,
}) => {
  const { t: translate } = useTranslation();
  const { getRootProps, getInputProps, getSubtitle, error, fileName } = useFileUploader(
    fileTypes,
    maxFileNumbers,
    maxFileSize,
    setAttachments,
    setAttachmentsUrl,
  );

  return (
    <>
      <div {...getRootProps()} className={`${css.container} ${customStyle}`}>
        <input {...getInputProps()} />
        <Icon name="upload-cloud-02" fontSize={20} color={variables.color_grey_600} />
        <div className="flex">
          <Typography variant="subtitle2" color={variables.color_primary_700} className="700 mr-1">
            {translate('upload')}
          </Typography>
          <Typography variant="caption" color={variables.color_grey_600}>
            {translate('drag-and-drop')}
          </Typography>
        </div>
        <p className={css.subtitle}>{getSubtitle()}</p>
      </div>
      {error && (
        <Typography variant="caption" color={variables.color_error_600}>
          {error}
        </Typography>
      )}
      {showFileName && fileName && (
        <Typography variant="caption" color={variables.color_grey_600}>
          {fileName}
        </Typography>
      )}
    </>
  );
};

export default FileUploader;
