import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CredentialsRes, deleteCredentialAdaptor, getImportStatusAdaptor, ImportFileRes } from 'src/core/adaptors';

export const useSchemaCredentialList = (
  schemaCredentialList: CredentialsRes | null,
  onUpdateSchemaCredentialList: (page: number) => void,
) => {
  const { t: translate } = useTranslation();
  const currentList = schemaCredentialList?.items || [];
  const defaultImportingDetail = { loading: false, total: 0 };
  const [importingDetail, setImportingDetail] = useState<{ loading: boolean; total: number }>(defaultImportingDetail);
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
  const importId = localStorage.getItem('import_id') || '';
  const STATUS_REQ = 5000;

  const getImportFilesStatus = useCallback(async () => {
    const { data: status, error } = await getImportStatusAdaptor(importId);
    if (error) return;
    if (status === 'COMPLETED') {
      localStorage.removeItem('import_id');
      importingDetail.total && handleCloseCSVModal();
      onUpdateSchemaCredentialList(page);
    }
  }, [importId, importingDetail]);

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

  const handleCloseCSVModal = () => {
    setImportingDetail(defaultImportingDetail);
    handleCloseModal();
  };

  const onImportCSVClick = () => setOpenModal({ name: 'import', open: true });

  const onImportFiles = (res: ImportFileRes) => {
    const { id = '', total = 0 } = res || {};
    localStorage.setItem('import_id', id);
    setImportingDetail({ loading: true, total });
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
    data: { translate, currentList, importingDetail, page, totalPage, openModal },
    operations: {
      onChangePage,
      onImportCSVClick,
      onImportFiles,
      onAddCredentialRecipientClick,
      onAddCredentialRecipient,
      handleCloseModal,
      handleCloseCSVModal,
      onDeleteClick,
      onDeleteCredential,
    },
  };
};
