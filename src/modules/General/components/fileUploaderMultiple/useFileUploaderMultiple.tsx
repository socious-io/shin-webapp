import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import jpg from 'src/assets/icons/file-jpg.svg';
import pdf from 'src/assets/icons/file-pdf.svg';
import png from 'src/assets/icons/file-png.svg';
import { AdaptorRes, UploadMediaRes, uploadMediaWithProgressAdaptor } from 'src/core/adaptors';

export const useFileUploader = (
  fileTypes: string[],
  maxFileNumbers: number,
  maxSize: number,
  uploaded: UploadMediaRes[],
  setUploaded: (newVal: UploadMediaRes[]) => void,
  setShowFiles?: (files: File[]) => void,
  showFiles?: File[],
) => {
  const { t: translate } = useTranslation();
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [files, setFiles] = useState<File[]>(showFiles || []);
  const KB = 1024;

  const getAcceptedFileTypes = () => {
    const types = [
      { key: 'doc', doc: 'application/msword', extention: ['.doc'] },
      {
        key: 'docx',
        doc: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        extention: ['.docx'],
      },
      { key: 'pdf', doc: 'application/pdf', extention: ['.pdf'] },
      { key: 'svg', doc: 'image/svg+xml', extention: ['.svg'] },
      { key: 'png', doc: 'image/png', extention: ['.png'] },
      { key: 'jpg', doc: 'image/jpeg', extention: ['.jpg'] },
      { key: 'gif', doc: 'image/gif', extention: ['.gif'] },
    ];
    const lowercaseFileTypes = fileTypes.map(t => {
      return t.toLowerCase();
    });

    const acceptedTypes = {};
    types.forEach(item => {
      if (lowercaseFileTypes.includes(item.key)) acceptedTypes[item.doc] = item.extention;
    });
    return acceptedTypes;
  };

  const getSubtitle = () => {
    let text = fileTypes.slice(0, fileTypes.length - 1).join();
    text = `${text} or ${fileTypes[fileTypes.length - 1]} (max. ${maxSize}mb)`;
    return text;
  };

  const readableFileSize = (fileSize: number) => {
    const sizeInKb = fileSize / KB;

    if (sizeInKb > KB) {
      return `${(sizeInKb / KB).toFixed(2)} MB`;
    } else {
      return `${sizeInKb.toFixed(2)} KB`;
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType === 'image/png') return png;
    if (fileType === 'application/pdf') return pdf;
    if (fileType === 'image/jpeg') return jpg;
  };
  const onDrop = async (acceptedFiles: File[]) => {
    try {
      setProgress(0);
      setError('');
      const requests: Promise<AdaptorRes<UploadMediaRes>>[] = [];
      acceptedFiles.forEach(f => {
        if (f.size > maxSize * KB * KB) {
          setError(`Max file size is ${maxSize}mb`);
          return;
        } else {
          requests.push(uploadMediaWithProgressAdaptor(f, setProgress));
        }
      });

      setUploading(true);
      const res = await Promise.all(requests);
      const resFiles = res.map(item => item.data).filter(item => !!item);
      setUploaded([...uploaded, ...resFiles]);
      setShowFiles?.([...files, ...acceptedFiles]);
      setFiles([...files, ...acceptedFiles]);
    } catch (e) {
      setError('Internal error in uploading files');
      console.log('error in uploading files', e);
    }
    setUploading(false);
  };

  const deleteFile = (deletedIndex: number) => {
    const filtered = files.filter((_, index) => index !== deletedIndex);
    setFiles(filtered);
    setShowFiles?.(filtered);
    setUploaded(uploaded.filter(item => files.map(f => f.name).includes(item.filename)));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: getAcceptedFileTypes(),
    maxFiles: maxFileNumbers,
  });

  return {
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
  };
};
