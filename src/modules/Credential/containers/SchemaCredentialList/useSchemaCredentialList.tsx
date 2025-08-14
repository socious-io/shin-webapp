import { useCallback, useEffect, useState } from 'react';
import { CredentialsRes, deleteCredentialAdaptor, getImportStatusAdaptor } from 'src/core/adaptors';

export const useSchemaCredentialList = (
  schemaCredentialList: CredentialsRes | null,
  onUpdateSchemaCredentialList: (page: number) => void,
) => {
  const currentList = schemaCredentialList?.items || [];
  const importId = localStorage.getItem('import_id') || '';
  const [importingLoading, setImportingLoading] = useState(!!importId);
  const [openModal, setOpenModal] = useState<{
    name: 'import' | 'add' | 'delete' | '';
    open: boolean;
    credentialId?: string;
  }>({
    name: '',
    open: false,
    credentialId: '',
  });
  const [page, setPage] = useState(1);
  const totalPage = Math.ceil((schemaCredentialList?.total || 1) / (schemaCredentialList?.limit || 10));
  const STATUS_REQ = 5000;

  const getImportFilesStatus = useCallback(async () => {
    const { error, data: status } = await getImportStatusAdaptor(importId);
    if (error) return;
    if (status === 'COMPLETED') {
      localStorage.removeItem('import_id');
      setImportingLoading(false);
      handleCloseModal();
      onUpdateSchemaCredentialList(page);
    }
  }, [importId, page]);

  useEffect(() => {
    if (!importId) return;
    getImportFilesStatus();
    const interval = setInterval(getImportFilesStatus, STATUS_REQ);
    return () => clearInterval(interval);
  }, [importId, getImportFilesStatus]);

  const onChangePage = async (newPage: number) => {
    setPage(newPage);
    onUpdateSchemaCredentialList(newPage);
  };

  const handleCloseModal = () => setOpenModal({ name: '', open: false, credentialId: '' });

  const onImportCSVClick = () => setOpenModal({ name: 'import', open: true });

  const onImportFiles = (importId: string) => {
    localStorage.setItem('import_id', importId);
    setImportingLoading(true);
  };

  const onAddCredentialRecipientClick = () => setOpenModal({ name: 'add', open: true });

  const onAddCredentialRecipient = () => {
    onChangePage(page);
    handleCloseModal();
  };

  const onDeleteClick = (credentialId: string) => setOpenModal({ name: 'delete', open: true, credentialId });

  const onDeleteCredential = async () => {
    const selectedCredential = openModal?.credentialId || '';
    if (selectedCredential) {
      const { error } = await deleteCredentialAdaptor(selectedCredential);
      if (error) return;
      const filteredList = currentList.filter(list => list.id !== selectedCredential);
      onChangePage(filteredList.length === 0 && page > 1 ? page - 1 : page);
      handleCloseModal();
    }
  };

  return {
    data: { currentList, importingLoading, page, totalPage, openModal },
    operations: {
      onChangePage,
      onImportCSVClick,
      onImportFiles,
      onAddCredentialRecipientClick,
      onAddCredentialRecipient,
      handleCloseModal,
      onDeleteClick,
      onDeleteCredential,
    },
  };
};
