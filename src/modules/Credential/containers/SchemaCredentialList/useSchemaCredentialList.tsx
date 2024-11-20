import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CredentialsRes, deleteCredentialAdaptor, getImportAdaptor, ImportFileRes } from 'src/core/adaptors';

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
  const importId: string[] = JSON.parse(localStorage.getItem('import_id') || '[]') || [];
  const STATUS_REQ = 5000;

  const getImportFilesStatus = useCallback(async () => {
    const requests = importId.map(id => getImportAdaptor(id));
    const responses = await Promise.allSettled(requests);

    for (const result of responses) {
      if (result.status == 'fulfilled') {
        const {
          data: { id, status },
          error,
        } = result.value;
        if (error) continue;
        if (status === 'COMPLETED') {
          const import_id_stored = localStorage.getItem('import_id');
          const import_ids: string[] = JSON.parse(import_id_stored || '[]');
          localStorage.setItem('import_id', JSON.stringify(import_ids.filter(import_id => import_id != id)));
          importingDetail.total && handleCloseCSVModal();
          onUpdateSchemaCredentialList(page);
        }
      }
    }
  }, [importId, importingDetail]);

  useEffect(() => {
    if (importId.length == 0) return;
    getImportFilesStatus();
    const interval = setInterval(getImportFilesStatus, STATUS_REQ);
    return () => clearInterval(interval);
  }, [importId.length, getImportFilesStatus]);

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

    let import_ids: string[] = [];
    const import_id_stored = localStorage.getItem('import_id');
    if (import_id_stored != null) {
      import_ids = JSON.parse(import_id_stored);
    }
    import_ids.push(id);
    localStorage.setItem('import_id', JSON.stringify(import_ids));
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
