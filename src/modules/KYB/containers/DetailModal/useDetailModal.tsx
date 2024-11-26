import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { uploadMediaWithProgressAdaptor, verifyOrganization } from 'src/core/adaptors';
import { RootState } from 'src/store';

import { FileState } from './index.types';

export const useDetailModal = (handleSuccess: () => void) => {
  const { t: translate } = useTranslation();
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const files = fileStates.map(fileState => fileState.file);
  const progressValues = fileStates.map(fileState => fileState.progress);
  const uploadedErrors = fileStates.map(fileState => fileState.error);
  const orgId = useSelector<RootState, string>((state: RootState) => state.org.id);

  const updateFileState = (file: File, updates: Partial<Omit<FileState, 'file'>>) => {
    setFileStates(prev => prev.map(f => (f.file === file ? { ...f, ...updates } : f)));
  };

  const onDropFiles = async (newFiles: File[]) => {
    setError('');
    const lastIndex = fileStates.length || 0;
    const newFileStates = newFiles.map((file, index) => ({
      index: lastIndex + index,
      id: '',
      file,
      error: false,
      progress: 0,
    }));
    setFileStates(prev => [...prev, ...newFileStates]);

    const uploadPromises = newFiles.map(file =>
      uploadMediaWithProgressAdaptor(file, (progress: number) => {
        updateFileState(file, { progress });
      }),
    );
    const results = await Promise.all(uploadPromises);
    results.forEach((result, index) => {
      const file = newFiles[index];
      if (result.error) {
        updateFileState(file, { error: true });
      } else if (result.data?.id) {
        updateFileState(file, { id: result.data.id });
      }
    });
  };

  const onDeleteFiles = (deletedIndex: number) => {
    setFileStates(prev => prev.filter(f => f.index !== deletedIndex));
  };

  const handleContinue = async () => {
    setError('');
    setLoading(true);
    const fileIds = fileStates.map(file => file.id).filter(Boolean);
    const { error } = await verifyOrganization(orgId, fileIds);
    if (error) setError(error);
    else handleSuccess();
    setLoading(false);
  };

  return {
    data: {
      translate,
      files,
      progressValues,
      uploadedErrors,
      error,
      loading,
    },
    operations: { handleContinue, onDropFiles, onDeleteFiles },
  };
};
