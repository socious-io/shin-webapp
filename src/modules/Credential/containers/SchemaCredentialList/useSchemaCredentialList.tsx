import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CredentialsRes, CredentialStatus, deleteCredentialsAdaptor, getCredentialsAdaptor } from 'src/core/adaptors';
import { StatusProps } from 'src/modules/General/components/Status/index.types';

export const useSchemaCredentialList = (
  selectedSchemaId: string,
  selectedCredentials: string[],
  onSelectCredential: (credentialId: string) => void,
) => {
  const { t: translate } = useTranslation();
  const [currentSchemaCredentialList, setCurrentSchemaCredentialList] = useState<CredentialsRes>();
  const currentList = currentSchemaCredentialList?.items || [];
  const [openModal, setOpenModal] = useState<{
    name: 'add' | 'delete' | '';
    open: boolean;
  }>({
    name: '',
    open: false,
  });
  const [page, setPage] = useState(1);
  const totalPage = Math.ceil((currentSchemaCredentialList?.total || 1) / (currentSchemaCredentialList?.limit || 10));
  const status: Record<CredentialStatus, StatusProps> = {
    ISSUED: { label: translate('credential-status.issued'), theme: 'warning' },
    PENDING: { label: translate('credential-status.pending'), theme: 'warning' },
    ACTIVE: { label: translate('credential-status.active'), theme: 'success' },
    REVOKED: { label: translate('credential-status.revoked'), theme: 'error' },
    CREATED: { label: translate('credential-status.created'), theme: 'warning' },
  };

  useEffect(() => {
    onChangePage(page);
  }, [selectedSchemaId]);

  const onChangePage = async (newPage: number) => {
    setPage(newPage);
    const { data } = await getCredentialsAdaptor(newPage, 10, { schema_id: selectedSchemaId });
    data && setCurrentSchemaCredentialList(data);
  };

  const handleCloseModal = () => setOpenModal({ name: '', open: false });

  const onAddCredentialRecipientClick = () => setOpenModal({ name: 'add', open: true });

  const onAddCredentialRecipient = () => {
    onChangePage(page);
    handleCloseModal();
  };

  const onDeleteClick = () => setOpenModal({ name: 'delete', open: true });

  const onDeleteCredential = async () => {
    if (selectedCredentials) {
      const { error } = await deleteCredentialsAdaptor(selectedCredentials);
      if (error) return;
      const filteredList = currentList.filter(list => !selectedCredentials.includes(list.id));
      onChangePage(filteredList.length === 0 && page > 1 ? page - 1 : page);
      onSelectCredential('');
      handleCloseModal();
    }
  };

  return {
    data: { translate, currentList, page, totalPage, status, openModal },
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
