import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { deleteIntegrationAdaptor, getIntegrationsAdaptor, IntegrationsRes } from 'src/core/adaptors';

export const useIntegrationList = (onOpenAddModal: (open: boolean) => void) => {
  const integrationList = (useLoaderData() as IntegrationsRes) || {};
  const [openModal, setOpenModal] = useState<{ name: 'edit' | 'delete' | ''; open: boolean; integrationId: string }>({
    name: '',
    open: false,
    integrationId: '',
  });
  const [copied, setCopied] = useState(false);
  const [page, setPage] = useState(1);
  const [currentIntegrationList, setCurrentIntegrationList] = useState(integrationList);
  const currentList = currentIntegrationList?.items || [];
  const totalPage = Math.ceil((currentIntegrationList?.total || 1) / (currentIntegrationList?.limit || 10));

  const onChangePage = async (newPage: number) => {
    setPage(newPage);
    const { data } = await getIntegrationsAdaptor(newPage);
    data && setCurrentIntegrationList(data);
  };

  const handleCloseModal = () => setOpenModal({ name: '', open: false, integrationId: '' });

  const onOpenModal = (name: 'edit' | 'delete', integrationId: string) => {
    setOpenModal({ name, open: true, integrationId });
  };

  const onAddOrEditIntegration = () => {
    onChangePage(page);
    openModal.integrationId ? handleCloseModal() : onOpenAddModal(false);
  };

  const onDeleteIntegration = async (integrationId: string) => {
    if (integrationId) {
      const { error } = await deleteIntegrationAdaptor(integrationId);
      if (error) return;
      const filteredList = currentList.filter(list => list.id !== integrationId);
      onChangePage(filteredList.length === 0 && page > 1 ? page - 1 : page);
      handleCloseModal();
    }
  };

  const onCopyKeys = (content: string) => {
    if (content) {
      navigator.clipboard.writeText(content);
      setCopied(true);
    }
  };

  return {
    data: { currentList, page, totalPage, openModal, copied },
    operations: {
      onChangePage,
      handleCloseModal,
      onOpenModal,
      onAddOrEditIntegration,
      onDeleteIntegration,
      onCopyKeys,
      setCopied,
    },
  };
};
