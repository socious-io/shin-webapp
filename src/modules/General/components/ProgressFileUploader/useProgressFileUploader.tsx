import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';

export const useProgressFileUploader = (
  files: File[],
  fileTypes: string[],
  onDropFiles: (files: File[]) => void,
  maxSize: number,
  maxFiles: number,
  error?: string,
  multiple?: boolean,
) => {
  const { t: translate } = useTranslation();
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
  const fileTypesToString = fileTypes.join(', ');
  const subtitle = `${fileTypesToString} (max. ${maxSize}MB)`;
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

  const onDrop = async (acceptedFiles: File[]) => {
    const validFiles: File[] = [];
    for (const file of acceptedFiles) {
      if (file.size > maxSize * KB * KB) {
        setErrorMessage(`Max file size is ${maxSize}mb`);
      } else {
        validFiles.push(file);
      }
    }
    onDropFiles(validFiles);
  };

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
