import { Typography } from '@mui/material';
import variables from 'src/styles/constants/_exports.module.scss';

import styles from './index.module.scss';
import { FileUploaderProps } from './index.types';
import { useFileUploader } from './useFileUploader';
import FeaturedIcon from '../FeaturedIcon';
import Icon from '../Icon';

const FileUploader: React.FC<FileUploaderProps> = ({
  files,
  onDropFiles,
  fileTypes,
  showPreviewImages = false,
  showFileName = true,
  deleteOnFileName = false,
  onDeleteFiles,
  maxSize = 10,
  maxFiles = 1,
  limitUploading = false,
  multiple = true,
  error = '',
  containerClassName = '',
  customStyle = '',
}) => {
  const { translate, getRootProps, getInputProps, subtitle, errorMessage } = useFileUploader(
    files,
    onDropFiles,
    fileTypes,
    maxSize,
    maxFiles,
    multiple,
    error,
    limitUploading,
  );

  return (
    <div className={`${styles['container']} ${containerClassName}`}>
      <div {...getRootProps()} className={`${styles['input']} ${customStyle}`}>
        <input {...getInputProps()} />
        <FeaturedIcon iconName="upload-cloud-02" size="md" type="modern" theme="gray" />
        <div className="flex mt-2">
          <Typography variant="subtitle2" color={variables.color_primary_700} className="700 mr-1">
            {translate('file-uploader-click')}
          </Typography>
          <Typography variant="caption" color={variables.color_grey_600}>
            {translate('file-uploader-drag')}
          </Typography>
        </div>
        <p className={styles['input__description']}>{subtitle}</p>
      </div>
      {errorMessage && (
        <Typography variant="caption" color={variables.color_error_600}>
          {errorMessage}
        </Typography>
      )}
      {showFileName && files.some(file => file.name) && (
        <div className={styles['filename']}>
          {files.map(file => (
            <div key={file.id} className={styles['filename__name']}>
              <Typography variant="caption" color={variables.color_grey_600}>
                {file.name}
              </Typography>
              {deleteOnFileName && (
                <Icon
                  name="x-close"
                  color={variables.color_grey_700}
                  fontSize={16}
                  cursor="pointer"
                  onClick={() => onDeleteFiles?.(file.id)}
                />
              )}
            </div>
          ))}
        </div>
      )}
      {showPreviewImages && files.some(file => file.url) && (
        <div className={styles['preview']}>
          {files.map(file => (
            <div key={file.id} className={styles['preview__item']}>
              <img src={file.url} className={styles['preview__image']} />
              <div className={styles['preview__delete']} onClick={() => onDeleteFiles?.(file.id)}>
                <Icon name="x-close" color={variables.color_grey_700} fontSize={16} cursor="pointer" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
