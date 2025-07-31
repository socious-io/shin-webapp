import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { translate } from 'src/core/helpers/utils';

import { Files } from './index.types';

export const useProgressFileUploader = (
  files: Files[],
  fileTypes: string[],
  onDropFiles: (files: File[]) => void,
  maxSize: number,
  maxFiles: number,
  error?: string,
  multiple?: boolean,
) => {
  const [errorMessage, setErrorMessage] = useState('');
  const KB = 1024;
  const types = {
    DOC: { doc: 'application/msword', extension: ['.doc'], icon: '' },
    DOCX: {
      doc: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      extension: ['.docx'],
      icon: '',
    },
    PDF: { doc: 'application/pdf', extension: ['.pdf'], icon: '/icons/file-pdf.svg' },
    SVG: { doc: 'image/svg+xml', extension: ['.svg'], icon: '' },
    PNG: { doc: 'image/png', extension: ['.png'], icon: '/icons/file-png.svg' },
    JPG: { doc: 'image/jpeg', extension: ['.jpg'], icon: '/icons/file-jpg.svg' },
    GIF: { doc: 'image/gif', extension: ['.gif'], icon: '' },
    CSV: { doc: 'text/csv', extension: ['.csv'], icon: '/icons/file-csv.svg' },
  };
  const joinedFileTypes = fileTypes.slice(0, fileTypes.length - 1).join(', ');
  const subtitle = `${joinedFileTypes} ${translate('file-uploader-or')} ${fileTypes[fileTypes.length - 1]} (${translate('file-uploader-max')}. ${maxSize}MB)`;
  const acceptedFileTypes = fileTypes.reduce((acc, value) => {
    if (types[value]) {
      const { doc, extension } = types[value];
      acc[doc] = extension;
    }
    return acc;
  }, {});

  useEffect(() => {
    setErrorMessage(error || '');
  }, [error]);

  const getIconByType = (type: string) => {
    return Object.values(types).find(item => item.doc === type)?.icon;
  };

  const generateFileSize = (fileSize: number) => {
    const sizeInKb = fileSize / KB;
    if (sizeInKb > KB) {
      return `${(sizeInKb / KB).toFixed(2)} MB`;
    } else {
      return `${sizeInKb.toFixed(2)} KB`;
    }
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setErrorMessage('');
      const validFiles: File[] = [];
      const totalUploadedFiles = files.length + acceptedFiles.length;
      if (totalUploadedFiles > maxFiles) {
        setErrorMessage(translate('file-uploader-limit-error', { limit: maxFiles }));
      } else {
        for (const file of acceptedFiles) {
          if (file.size > maxSize * KB * KB) {
            setErrorMessage(translate('file-uploader-max-error', { name: file.name, max: maxSize }));
          } else {
            validFiles.push(file);
          }
        }
        onDropFiles(validFiles);
      }
    },
    [files],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    maxFiles,
    multiple,
    disabled: files.length + 1 > maxFiles,
  });

  return {
    data: { translate, subtitle, errorMessage },
    operations: { generateFileSize, getIconByType, getRootProps, getInputProps },
  };
};
