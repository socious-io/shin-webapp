import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { config } from 'src/config';
import {
  CredentialsRes,
  CredentialStatus,
  deleteCredentialAdaptor,
  getCredentialsAdaptor,
  revokeCredentialAdaptor,
} from 'src/core/adaptors';
import { StatusProps } from 'src/modules/General/components/Status/index.types';

export const useIssuedList = () => {
  const { t: translate } = useTranslation();
  const navigate = useNavigate();
  const { credentialList } = (useLoaderData() as { credentialList: CredentialsRes }) || {};
  const [currentCredentialList, setCurrentCredentialList] = useState(credentialList);
  const currentList = currentCredentialList?.items || [];
  const [selectedCredential, setSelectedCredential] = useState('');
  const [openModal, setOpenModal] = useState<{ name: 'revoke' | 'delete' | 'copy' | ''; open: boolean }>({
    name: '',
    open: false,
  });
  const [url, setUrl] = useState('');
  const [page, setPage] = useState(1);
  const totalPage = Math.ceil((currentCredentialList?.total || 1) / (currentCredentialList?.limit || 10));

  const status: Record<CredentialStatus, StatusProps> = {
    ISSUED: { label: 'Issued', theme: 'warning' },
    PENDING: { label: translate('credential-status.pending'), theme: 'warning' },
    ACTIVE: { label: translate('credential-status.active'), theme: 'success' },
    REVOKED: { label: translate('credential-status.revoked'), theme: 'error' },
  };

  const onChangePage = async (newPage: number) => {
    setPage(newPage);
    const { data, error } = await getCredentialsAdaptor(newPage);
    if (error) {
      console.log(error);
      return;
    }
    data && setCurrentCredentialList(data);
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
    if (selectedCredential) {
      const { error } = await revokeCredentialAdaptor(selectedCredential);
      if (error) {
        console.log(error);
        return;
      }
      const revokedList = currentList.map(list =>
        list.id === selectedCredential ? { ...list, status: 'REVOKED' as CredentialStatus } : list,
      );
      setCurrentCredentialList({ ...currentCredentialList, items: revokedList });
      setSelectedCredential('');
      handleCloseModal();
    }
  };

  const onDeleteClick = () => setOpenModal({ name: 'delete', open: true });

  const onDeleteCredential = async () => {
    if (selectedCredential) {
      const { error } = await deleteCredentialAdaptor(selectedCredential);
      if (error) {
        console.log(error);
        return;
      }
      const filteredList = currentList.filter(list => list.id !== selectedCredential);
      if (filteredList.length === 0 && page > 1) {
        setPage(page - 1);
        onChangePage(page - 1);
      } else {
        onChangePage(page);
      }
      setSelectedCredential('');
      handleCloseModal();
    }
  };

  const onCopyClick = (credentialId: string) => {
    const copyUrl = `${config.appBaseURL}/proof-request/credential/${credentialId}`;
    setUrl(copyUrl);
    setOpenModal({ name: 'copy', open: true });
  };

  const onCopyCredential = () => {
    navigator.clipboard.writeText(url);
  };

  const onCreateCredential = () => navigate('create');

  return {
    data: { translate, currentList, page, totalPage, selectedCredential, status, openModal, url },
    operations: {
      onChangePage,
      onSelectCredential,
      handleCloseModal,
      onRevokeClick,
      onRevokeCredential,
      onDeleteClick,
      onDeleteCredential,
      onCopyClick,
      onCopyCredential,
      onCreateCredential,
    },
  };
};
