import { CircularProgress, Typography } from '@mui/material';
import FeaturedIcon from 'src/modules/General/components/FeaturedIcon';
import Icon from 'src/modules/General/components/Icon';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './index.module.scss';
import { FileUploaderProps } from './index.types';
import { useFileUploader } from './useFileUploader';

//TODO: replace it with FileUploader
const NewFileUploader: React.FC<FileUploaderProps> = ({
  files = [],
  fileTypes,
  onDropFiles,
  onDeleteFiles,
  maxSize = 10,
  maxFiles = 1,
  error = '',
  loadingMessage = '',
  customText = '',
  showSubtitle = true,
  customStyle = '',
}) => {
  const {
    data: { translate, subtitle },
    operations: { generateFileSize, getIconByType, getRootProps, getInputProps },
  } = useFileUploader(files, fileTypes, onDropFiles, maxSize, maxFiles);

  const dragDropJSX = (
    <>
      <Icon name="upload-cloud-02" fontSize={20} color={variables.color_grey_600} />
      <div className="flex">
        <Typography variant="subtitle2" color={variables.color_primary_700} className="700 mr-1">
          {translate('file-uploader-click')}
        </Typography>
        <Typography variant="caption" color={variables.color_grey_600}>
          {customText || translate('file-uploader-drag')}
        </Typography>
      </div>
      {showSubtitle && <p className={css['upload__subtitle']}>{subtitle}</p>}
    </>
  );

  const dragDropErrorJSX = (
    <>
      <FeaturedIcon iconName="alert-circle" theme="error" size="md" type="light-circle" />
      <div className={css['error']}>
        <span className={css['error--bold']}>Error: </span>
        {error}
      </div>
    </>
  );

  return (
    <div className={css['container']}>
      {(files.length + 1 <= maxFiles || error) && (
        <div {...getRootProps()} className={`${css['upload']} ${error && css['upload--error']} ${customStyle}`}>
          <input {...getInputProps()} />
          {error ? dragDropErrorJSX : dragDropJSX}
        </div>
      )}
      {!!files.length && !error && (
        <div className={css['list']}>
          <div className={css['list__files']}>
            {files.map((item, index) => (
              <div key={`${item.name}-${index}`} className={`${css['file']} ${loadingMessage && css['file--loading']}`}>
                {getIconByType(item.type) && (
                  <img src={getIconByType(item.type)} alt={item.type} width={40} height={40} />
                )}
                {loadingMessage ? (
                  <div className={css['file__loading']}>
                    <CircularProgress size="0.75rem" color="primary" thickness={6} />
                    {loadingMessage}
                  </div>
                ) : (
                  <div className={css['file__right']}>
                    <div className={css['file__info']}>
                      {item.name}
                      <Icon
                        name="trash-01"
                        fontSize={20}
                        color={variables.color_grey_500}
                        cursor="pointer"
                        className={css['file__delete']}
                        onClick={() => onDeleteFiles(index)}
                      />
                    </div>
                    <span className={css['file__size']}>{generateFileSize(item.size)}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewFileUploader;
