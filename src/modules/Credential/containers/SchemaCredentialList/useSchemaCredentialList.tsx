import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CredentialsRes, deleteCredentialAdaptor } from 'src/core/adaptors';

export const useSchemaCredentialList = (
  schemaCredentialList: CredentialsRes | null,
  onUpdateSchemaCredentialList: (page: number) => void,
) => {
  const { t: translate } = useTranslation();
  const currentList = schemaCredentialList?.items || [];
  const [openModal, setOpenModal] = useState<{
    name: 'add' | 'delete' | '';
    open: boolean;
    credentialId?: string;
  }>({
    name: '',
    open: false,
    credentialId: '',
  });
  const [page, setPage] = useState(1);
  const totalPage = Math.ceil((schemaCredentialList?.total || 1) / (schemaCredentialList?.limit || 10));

  const onChangePage = async (newPage: number) => {
    setPage(newPage);
    onUpdateSchemaCredentialList(newPage);
  };

  const handleCloseModal = () => setOpenModal({ name: '', open: false, credentialId: '' });

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
    data: { translate, currentList, page, totalPage, openModal },
    operations: {
      onChangePage,
      onAddCredentialRecipientClick,
      onAddCredentialRecipient,
      handleCloseModal,
      onDeleteClick,
      onDeleteCredential,
    },
  };
};
