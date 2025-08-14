import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { config } from 'src/config';
import {
  CredentialsRes,
  CredentialStatus,
  deleteCredentialsAdaptor,
  getCredentialsAdaptor,
  revokeCredentialsAdaptor,
} from 'src/core/adaptors';
import { translate } from 'src/core/helpers/utils';
import { StatusProps } from 'src/modules/General/components/Status/index.types';

export const useIssuedList = () => {
  const navigate = useNavigate();
  const { credentialList } = (useLoaderData() as { credentialList: CredentialsRes }) || {};
  const [currentCredentialList, setCurrentCredentialList] = useState(credentialList);
  const currentList = currentCredentialList?.items || [];
  const [selectedAll, setSelectedAll] = useState(false);
  const [selectedCredentials, setSelectedCredentials] = useState<string[]>([]);
  const [openModal, setOpenModal] = useState<{ name: 'revoke' | 'delete' | 'copy' | ''; open: boolean }>({
    name: '',
    open: false,
  });
  const [url, setUrl] = useState('');
  const [page, setPage] = useState(1);
  const totalPage = Math.ceil((currentCredentialList?.total || 1) / (currentCredentialList?.limit || 10));
  const selectedStatuses = currentList.filter(item => selectedCredentials.includes(item.id));
  const disableRevoke =
    !selectedStatuses.length ||
    !!selectedStatuses.filter(status => !['ISSUED', 'CLAIMED'].includes(status.status)).length;

  const status: Record<CredentialStatus, StatusProps> = {
    ISSUED: { label: translate('credential-status.issued'), theme: 'warning' },
    PENDING: { label: translate('credential-status.pending'), theme: 'warning' },
    ACTIVE: { label: translate('credential-status.active'), theme: 'success' },
    REVOKED: { label: translate('credential-status.revoked'), theme: 'error' },
    CREATED: { label: translate('credential-status.created'), theme: 'warning' },
    CLAIMED: { label: translate('credential-status.claimed'), theme: 'success' },
  };

  const onChangePage = async (newPage: number) => {
    setPage(newPage);
    setSelectedAll(false);
    const { data } = await getCredentialsAdaptor(newPage);
    data && setCurrentCredentialList(data);
  };

  const onSelectCredential = (id: string) => {
    setSelectedCredentials(selected =>
      selected.includes(id) ? selected.filter(credential => credential !== id) : [...selected, id],
    );
  };

  const onSelectAllCredentials = (checked: boolean) => {
    setSelectedAll(checked);
    if (checked) {
      const ids = currentList.map(list => list.id);
      const allSelected = [...new Set([...selectedCredentials, ...ids])];
      setSelectedCredentials(allSelected);
    } else setSelectedCredentials([]);
  };

  const handleCloseModal = () => setOpenModal({ name: '', open: false });

  const onRevokeClick = () => setOpenModal({ name: 'revoke', open: true });

  const onRevokeCredential = async () => {
    if (selectedCredentials.length) {
      const { error } = await revokeCredentialsAdaptor(selectedCredentials);
      if (error) return;
      const revokedList = currentList.map(list =>
        selectedCredentials.includes(list.id) ? { ...list, status: 'REVOKED' as CredentialStatus } : list,
      );
      setCurrentCredentialList({ ...currentCredentialList, items: revokedList });
      setSelectedCredentials([]);
      handleCloseModal();
    }
  };

  const onDeleteClick = () => setOpenModal({ name: 'delete', open: true });

  const onDeleteCredential = async () => {
    if (selectedCredentials.length) {
      const { error } = await deleteCredentialsAdaptor(selectedCredentials);
      if (error) return;
      const filteredList = currentList.filter(list => !selectedCredentials.includes(list.id));
      onChangePage(filteredList.length === 0 && page > 1 ? page - 1 : page);
      setSelectedCredentials([]);
      handleCloseModal();
    }
  };

  const onCopyClick = (credentialId: string) => {
    const copyUrl = `${config.appBaseURL}/connect/credential/${credentialId}`;
    setUrl(copyUrl);
    setOpenModal({ name: 'copy', open: true });
  };

  const onCopyCredential = () => {
    navigator.clipboard.writeText(url);
  };

  const onCreateCredential = () => navigate('../create');

  return {
    data: {
      translate,
      currentList,
      page,
      totalPage,
      selectedAll,
      selectedCredentials,
      status,
      openModal,
      url,
      disableRevoke,
    },
    operations: {
      onChangePage,
      onSelectCredential,
      onSelectAllCredentials,
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
