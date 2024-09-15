import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router-dom';
import { deleteRecipientAdaptor, getRecipientsAdaptor, RecipientRes } from 'src/core/adaptors';

export const useRecipientList = (selectedRecipient: string, onSelectRecipient: (recipientId: string) => void) => {
  const { t: translate } = useTranslation();
  const { recipientList } = (useLoaderData() as { recipientList: RecipientRes }) || {};
  const [currentRecipientList, setCurrentRecipientList] = useState(recipientList);
  const currentList = currentRecipientList?.items || [];
  const [openModal, setOpenModal] = useState<{ name: 'add' | 'delete' | ''; open: boolean; recipientId?: string }>({
    name: '',
    open: false,
    recipientId: '',
  });
  const [page, setPage] = useState(1);
  const totalPage = Math.ceil((currentRecipientList?.total || 1) / (currentRecipientList?.limit || 10));

  const onChangePage = async (newPage: number) => {
    setPage(newPage);
    const { data, error } = await getRecipientsAdaptor(newPage);
    if (error) {
      console.log(error);
      return;
    }
    data && setCurrentRecipientList(data);
  };

  const handleCloseModal = () => setOpenModal({ name: '', open: false, recipientId: '' });

  const onAddRecipientClick = () => setOpenModal({ name: 'add', open: true });

  const onAddRecipient = () => {
    onChangePage(page);
    handleCloseModal();
  };

  const onDeleteClick = (recipientId?: string) => setOpenModal({ name: 'delete', open: true, recipientId });

  const onDeleteCredential = async () => {
    const hasRecipient = selectedRecipient || openModal?.recipientId;
    if (hasRecipient) {
      const { error } = await deleteRecipientAdaptor(hasRecipient);
      if (error) {
        console.log(error);
        return;
      }
      const filteredList = currentList.filter(list => list.id !== selectedRecipient);
      if (filteredList.length === 0 && page > 1) {
        setPage(page - 1);
        onChangePage(page - 1);
      } else {
        onChangePage(page);
      }
      onSelectRecipient('');
      handleCloseModal();
    }
  };

  const onEditClick = (recipientId: string) => setOpenModal({ name: 'add', open: true, recipientId });

  return {
    data: { translate, currentList, page, totalPage, selectedRecipient, openModal },
    operations: {
      onChangePage,
      onSelectRecipient,
      onAddRecipientClick,
      handleCloseModal,
      onAddRecipient,
      onDeleteClick,
      onDeleteCredential,
      onEditClick,
    },
  };
};
