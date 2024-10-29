import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { config } from 'src/config';
import { importCSVFileAdaptor, ImportFileRes, Schema } from 'src/core/adaptors';

export const useImportCSVModal = (
  onImportFiles: (res: ImportFileRes) => void,
  selectedSchema: Schema,
  open: boolean,
) => {
  const { t: translate } = useTranslation();
  const [file, setFile] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const disabledButton = !file.length;
  const { name: schemaName, id: schemaId } = selectedSchema;

  useEffect(() => {
    reset();
  }, [open]);

  const reset = () => {
    setFile([]);
    setShowError(false);
  };

  const onUploadFile = (newFile: File[]) => {
    reset();
    setFile(newFile);
  };

  const onDeleteFile = () => setFile([]);

  const onImport = async () => {
    setLoading(true);
    const payload = {
      file: file[0],
      schema_id: schemaId,
    };
    const { data, error } = await importCSVFileAdaptor(payload);
    if (error) {
      setFile([]);
      setShowError(true);
    }
    data && onImportFiles(data);
    setLoading(false);
  };

  const onDownload = async () => {
    if (schemaId) {
      const url = `${config.baseURL}/credentials/import/download-sample/${schemaId}`;
      const link = document.createElement('a');
      link.href = url;
      link.download = `${schemaName}-sample.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }
  };

  return {
    data: { translate, file, disabledButton, loading, showError },
    operations: { onUploadFile, onDeleteFile, onImport, onDownload },
  };
};
