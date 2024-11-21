import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';

export const useFileUploader = (
  files: File[],
  fileTypes: string[],
  onDropFiles: (files: File[]) => void,
  maxSize: number,
  maxFiles: number,
) => {
  const { t: translate } = useTranslation();
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
  const fileTypesToString = fileTypes.slice(0, fileTypes.length - 1).join();
  const subtitle = `${fileTypesToString} or ${fileTypes[fileTypes.length - 1]} (max. ${maxSize}mb)`;
  const acceptedFileTypes = fileTypes.reduce((acc, value) => {
    if (types[value]) {
      const { doc, extension } = types[value];
      acc[doc] = extension;
    }
    return acc;
  }, {});

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

  const onDrop = async (acceptedFiles: File[]) => onDropFiles([...files, ...acceptedFiles]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    maxFiles,
  });

  return {
    data: { translate, subtitle },
    operations: { generateFileSize, getIconByType, getRootProps, getInputProps },
  };
};
