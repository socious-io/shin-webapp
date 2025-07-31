import { useEffect, useState } from 'react';
import { config } from 'src/config';
import { importCSVFileAdaptor } from 'src/core/adaptors';

export const useImportCSVModal = (
  onImportFiles: (importId: string) => void,
  selectedSchemaId: string,
  open: boolean,
) => {
  const [file, setFile] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [totalImportedRecipients, setTotalImportedRecipients] = useState(0);
  const disabledButton = !file.length;
  const downloadSampleURL =
    selectedSchemaId && `${config.baseURL}/credentials/import/download-sample/${selectedSchemaId}`;

  useEffect(() => {
    reset();
  }, [open]);

  const reset = () => {
    setFile([]);
    setShowError(false);
    setTotalImportedRecipients(0);
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
      schema_id: selectedSchemaId,
    };
    const { data, error } = await importCSVFileAdaptor(payload);
    if (error) {
      setFile([]);
      setShowError(true);
    } else {
      const { total = 0, id = '' } = data || {};
      setTotalImportedRecipients(total);
      onImportFiles(id);
    }
    setLoading(false);
  };

  return {
    data: { file, disabledButton, loading, showError, totalImportedRecipients, downloadSampleURL },
    operations: { onUploadFile, onDeleteFile, onImport },
  };
};
