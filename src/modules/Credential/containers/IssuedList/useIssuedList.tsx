import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { CredentialsRes, CredentialStatus, deleteCredentialAdaptor, revokeCredentialAdaptor } from 'src/core/adaptors';
import { StatusProps } from 'src/modules/General/components/Status/index.types';

export const useIssuedList = () => {
  const { credentialList } = (useLoaderData() as { credentialList: CredentialsRes }) || {};
  const { items: list } = credentialList || [];
  const [currentList, setCurrentList] = useState(list);
  const [selectedCredential, setSelectedCredential] = useState('');
  const [openModal, setOpenModal] = useState<{ name: 'revoke' | 'delete' | ''; open: boolean }>({
    name: '',
    open: false,
  });
  const [page, setPage] = useState(1);
  const totalPage = 1;

  const status: Record<Exclude<CredentialStatus, 'ISSUED'>, StatusProps> = {
    PENDING: { label: 'Pending', theme: 'warning' },
    ACTIVE: { label: 'Active', theme: 'success' },
    REVOKED: { label: 'Revoked', theme: 'error' },
  };

  const onSelectCredential = (id: string) => {
    //FIXME: for now because bulk action is out of scope of this PR
    if (selectedCredential === id) {
      setSelectedCredential('');
    } else {
      setSelectedCredential(id);
    }
  };

  const handleCloseModal = () => setOpenModal({ name: '', open: false });

  const onRevokeClick = () => setOpenModal({ name: 'revoke', open: true });

  const onRevokeCredential = async () => {
    const { error } = await revokeCredentialAdaptor(selectedCredential);
    if (error) {
      console.log(error);
      return;
    }
    const revokedCredential = currentList.map(list =>
      list.id === selectedCredential ? { ...list, status: 'REVOKED' as CredentialStatus } : list,
    );
    setCurrentList(revokedCredential);
    setSelectedCredential('');
    handleCloseModal();
  };

  const onDeleteClick = () => setOpenModal({ name: 'delete', open: true });

  const onDeleteCredential = async () => {
    const { error } = await deleteCredentialAdaptor(selectedCredential);
    if (error) {
      console.log(error);
      return;
    }
    const deletedCredential = currentList.filter(list => list.id !== selectedCredential);
    setCurrentList(deletedCredential);
    setSelectedCredential('');
    handleCloseModal();
  };

  return {
    data: { currentList, page, totalPage, selectedCredential, status, openModal },
    operations: {
      setPage,
      onSelectCredential,
      handleCloseModal,
      onRevokeClick,
      onRevokeCredential,
      onDeleteClick,
      onDeleteCredential,
    },
  };
};
