import { CircularProgress, LinearProgress, Typography } from '@mui/material';
import React from 'react';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './index.module.scss';
import { FileUploaderMultipleProps } from './index.types';
import { useFileUploader } from './useFileUploaderMultiple';
import Icon from '../Icon';

const FileUploaderMultiple: React.FC<FileUploaderMultipleProps> = ({
  fileTypes,
  maxFileNumbers = 1,
  maxSize = 10,
  customStyle,
  uploaded,
  setUploaded,
  onDeleteFile,
  setShowFiles,
  showFiles,
  loading,
}) => {
  const {
    getRootProps,
    getInputProps,
    getSubtitle,
    error,
    readableFileSize,
    getFileIcon,
    deleteFile,
    uploading,
    progress,
    files,
    translate,
  } = useFileUploader(fileTypes, maxFileNumbers, maxSize, uploaded, setUploaded, setShowFiles, showFiles);
  const currentFiles = showFiles?.length ? showFiles : files;

  return (
    <>
      {loading ? (
        <div className={css['progress']}>
          <CircularProgress size="4rem" sx={{ color: variables.color_primary_700 }} />
        </div>
      ) : (
        <div className={css['container']}>
          <div {...getRootProps()} className={`${css['upload']} ${customStyle}`}>
            <input {...getInputProps()} />
            <Icon name="upload-cloud-02" fontSize={20} color={variables.color_grey_600} />
            <div className="flex">
              <Typography variant="subtitle2" color={variables.color_primary_700} className="700 mr-1">
                {translate('file-uploader-click')}
              </Typography>
              <Typography variant="caption" color={variables.color_grey_600}>
                {translate('file-uploader-drag')}
              </Typography>
            </div>
            <p className={css['upload__subtitle']}>{getSubtitle()}</p>
          </div>
          {error && (
            <Typography variant="caption" color={variables.color_error_600}>
              {error}
            </Typography>
          )}
          {!!currentFiles.length && (
            <div className={css['list']}>
              <div className={css['list__files']}>
                {currentFiles.map((item, index) => (
                  <div key={`${item.name}-${index}`} className="flex gap-4">
                    <div>
                      <img src={getFileIcon(item.type)} alt="" />
                    </div>
                    <div className={css['file']}>
                      <div className={css['file__row']}>
                        <span className={css['file__name']}>{item.name}</span>
                        <Icon
                          name="trash-01"
                          fontSize={20}
                          color={variables.color_grey_500}
                          onClick={() => {
                            deleteFile(index);
                            onDeleteFile?.(index);
                          }}
                          cursor="pointer"
                        />
                      </div>
                      <span className={css['file__size']}>{readableFileSize(item.size)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {uploading && (
            <div className="w-full">
              <LinearProgress variant="determinate" value={progress} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default FileUploaderMultiple;
