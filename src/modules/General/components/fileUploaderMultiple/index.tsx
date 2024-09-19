import { CircularProgress, LinearProgress, Typography } from '@mui/material';
import React from 'react';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './fileUploaderMultiple.module.scss';
import { FileUploaderMultipleProps } from './fileUploaderMultiple.types';
import { useFileUploader } from './useFileUploaderMultiple';
import Icon from '../Icon';

export const FileUploaderMultiple: React.FC<FileUploaderMultipleProps> = ({
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
  } = useFileUploader(fileTypes, maxFileNumbers, maxSize, uploaded, setUploaded, setShowFiles, showFiles);
  const currentFiles = showFiles?.length ? showFiles : files;

  return (
    <>
      {loading ? (
        <div className="w-full h-full min-h-[280px] flex items-center justify-center">
          <CircularProgress size="64px" sx={{ color: variables.color_primary_700 }} />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div {...getRootProps()} className={`${css.container} ${customStyle}`}>
            <input {...getInputProps()} />
            <Icon name="upload-cloud-02" fontSize={20} color={variables.color_grey_600} />
            <div className="flex">
              <Typography variant="subtitle2" color={variables.color_primary_700} className="700 mr-1">
                Click to upload
              </Typography>
              <Typography variant="caption" color={variables.color_grey_600}>
                or drag and drop
              </Typography>
            </div>
            <p className={css.subtitle}>{getSubtitle()}</p>
          </div>
          {error && (
            <Typography variant="caption" color={variables.color_error_600}>
              {error}
            </Typography>
          )}
          {!!currentFiles.length && (
            <div className="flex flex-col gap-3">
              <div className="max-h-40  flex flex-col gap-3 overflow-y-auto p-4 rounded-xl border border-solid border-Gray-light-mode-200">
                {currentFiles.map((item, index) => (
                  <div key={`${item.name}-${index}`} className="flex gap-4">
                    <div>
                      <img src={getFileIcon(item.type)} alt="" />
                    </div>
                    <div className="flex flex-grow flex-col">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium leading-5 text-Gray-light-mode-700">{item.name}</span>
                        <Icon
                          name="trash-01"
                          fontSize={20}
                          color={variables.color_grey_500}
                          onClick={() => {
                            deleteFile(index);
                            onDeleteFile?.(index);
                          }}
                          className="!cursor-pointer"
                        />
                      </div>
                      <span className="text-sm font-normal leading-5 text-Gray-light-mode-600">
                        {readableFileSize(item.size)}
                      </span>
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
