import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { deleteSchemaAdaptor, getSchemasAdaptor, SchemaRes } from 'src/core/adaptors';

export const useSchemasList = () => {
  const { t: translate } = useTranslation();
  const navigate = useNavigate();
  const { schemaList } = (useLoaderData() as { schemaList: SchemaRes }) || {};
  const [page, setPage] = useState(1);
  const [currentSchemaList, setCurrentSchemaList] = useState(schemaList);
  const currentList = currentSchemaList?.items || [];
  const totalPage = Math.ceil((currentSchemaList?.total || 1) / (currentSchemaList?.limit || 10));
  const [openModal, setOpenModal] = useState<{
    name: 'delete' | 'view' | '';
    open: boolean;
    rowId?: string;
  }>({
    name: '',
    open: false,
    rowId: '',
  });
  // const [openSnackbar, setOpenSnackbar] = useState(false);
  const viewData = currentList.find(list => list.id === openModal.rowId) || null;

  const handleCloseModal = () => {
    setOpenModal({
      name: '',
      open: false,
      rowId: '',
    });
  };

  const onChangePage = async (newPage: number) => {
    setPage(newPage);
    const { data } = await getSchemasAdaptor(newPage);
    data && setCurrentSchemaList(data);
  };

  const onView = (rowId: string) => {
    setOpenModal({ name: 'view', open: true, rowId });
  };

  // const onCopy = (rowId: string) => {
  //   const copiedRow = currentList.find(list => list.id === rowId);
  //   navigator.clipboard.writeText(JSON.stringify(copiedRow));
  //   setOpenSnackbar(true);
  // };

  const onDelete = (rowId: string) => setOpenModal({ name: 'delete', open: true, rowId });

  const onDeleteSchema = async () => {
    if (openModal.rowId) {
      const { error } = await deleteSchemaAdaptor(openModal.rowId);
      if (error) return;
      const filteredList = currentList.filter(p => p.id !== openModal.rowId);
      onChangePage(filteredList.length === 0 && page > 1 ? page - 1 : page);
      handleCloseModal();
    }
  };

  const onCreateSchema = () => navigate('create');

  return {
    data: {
      translate,
      currentList,
      page,
      totalPage,
      openModal,
      viewData,
    },
    operations: {
      onView,
      onDelete,
      onChangePage,
      handleCloseModal,
      onDeleteSchema,
      onCreateSchema,
    },
  };
};
