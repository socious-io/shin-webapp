import { useState } from 'react';
import { deleteSchemaAdaptor, Schema } from 'src/core/adaptors';

export const useSchemasList = (list: Schema[], onUpdateList?: (newList: Schema[]) => void) => {
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState<{
    name: 'delete' | 'view' | '';
    open: boolean;
    rowId?: string;
  }>({
    name: '',
    open: false,
    rowId: '',
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [currentList, setCurrentList] = useState(list);
  const totalPage = 1;
  const viewData = currentList?.find(list => list.id === openModal.rowId) || null;

  const handleCloseModal = () => {
    setOpenModal({
      name: '',
      open: false,
      rowId: '',
    });
  };

  const onView = (rowId: string) => {
    setOpenModal({ name: 'view', open: true, rowId });
  };

  const onCopy = (rowId: string) => {
    const copiedRow = currentList.find(list => list.id === rowId);
    navigator.clipboard.writeText(JSON.stringify(copiedRow));
    setOpenSnackbar(true);
  };

  const onDelete = (rowId: string) => setOpenModal({ name: 'delete', open: true, rowId });

  const onDeleteSchema = async () => {
    if (openModal.rowId) {
      const { error } = await deleteSchemaAdaptor(openModal.rowId);
      if (error) {
        console.log(error);
        return;
      }
      const filteredList = currentList.filter(p => p.id !== openModal.rowId);
      setCurrentList(filteredList);
      onUpdateList?.(filteredList);
      handleCloseModal();
    }
  };

  return {
    data: {
      currentList,
      page,
      totalPage,
      openModal,
      openSnackbar,
      viewData,
    },
    operations: {
      onView,
      onCopy,
      onDelete,
      setPage,
      handleCloseModal,
      setOpenSnackbar,
      onDeleteSchema,
    },
  };
};
