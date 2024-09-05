import { ColumnDef, flexRender, getCoreRowModel, Getter, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';
import { Schema } from 'src/core/adaptors';
import { formatDate } from 'src/core/helpers/relative-time';
import FeaturedIcon from 'src/modules/General/components/FeaturedIcon';
import Icon from 'src/modules/General/components/Icon';
import Pagination from 'src/modules/General/components/Pagination';
import CustomSnackbar from 'src/modules/General/components/Snackbar';
import ConfirmModal from 'src/modules/General/containers/ConfirmModal';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './index.module.scss';
import { useSchemasList } from './useSchemasList';
import EmptySchema from '../EmptySchema';
import SchemaDetailModal from '../SchemaDetailModal';

const SchemasList: React.FC = () => {
  const {
    data: { translate, currentList, page, totalPage, openModal, openSnackbar, viewData },
    operations: {
      onView,
      onCopy,
      onDelete,
      onChangePage,
      handleCloseModal,
      setOpenSnackbar,
      onDeleteSchema,
      onCreateSchema,
    },
  } = useSchemasList();

  const columns = useMemo<ColumnDef<Schema>[]>(
    () => [
      {
        id: 'name',
        header: translate('schema-table.name'),
        accessorKey: 'id',
        cell: ({ getValue }: { getValue: Getter<string> }) => {
          const item = currentList.find(list => list.id === getValue());
          return (
            <div className={css['col__name']}>
              <span className={css['col__name--darker']}>{item?.name}</span>
              {!item?.deletable && 'Default'}
            </div>
          );
        },
      },
      {
        id: 'description',
        header: translate('schema-table.description'),
        accessorKey: 'description',
        cell: ({ getValue }: { getValue: Getter<string> }) => getValue(),
      },
      {
        id: 'created',
        header: translate('schema-table.created'),
        accessorKey: 'created',
        cell: ({ getValue }: { getValue: Getter<string> }) => <span className={css['col--darker']}>{getValue()}</span>,
      },
      {
        id: 'created_date',
        header: translate('schema-table.created-at'),
        accessorKey: 'created_at',
        cell: ({ getValue }: { getValue: Getter<string> }) => formatDate(getValue()),
      },
      {
        id: 'actions',
        header: '',
        accessorKey: 'id',
        cell: ({ getValue }: { getValue: Getter<string> }) => {
          const rowId = getValue();
          const deletableItem = currentList.find(list => list.id === rowId)?.deletable;
          return (
            <div className={css['col__actions']}>
              <Icon
                name="eye"
                fontSize={20}
                color={variables.color_grey_600}
                cursor="pointer"
                containerClass="flex-1"
                onClick={() => onView(rowId)}
              />
              <Icon
                name="copy-05"
                fontSize={20}
                color={variables.color_grey_600}
                cursor="pointer"
                containerClass="flex-1"
                onClick={() => onCopy(rowId)}
              />
              {deletableItem ? (
                <Icon
                  name="trash-01"
                  fontSize={20}
                  color={variables.color_grey_600}
                  cursor="pointer"
                  containerClass="flex-1"
                  onClick={() => onDelete(rowId)}
                />
              ) : (
                <div className="flex-1" />
              )}
            </div>
          );
        },
      },
    ],
    [currentList],
  );

  const table = useReactTable({
    data: currentList,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return currentList.length ? (
    <>
      <div className={css['table']}>
        <div className="block overflow-auto">
          <table className="w-full rounded-lg">
            <thead className={css['header']}>
              {table.getHeaderGroups().map(headerGroup => {
                return (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => {
                      return (
                        <th id={header.id} key={header.id} className={css['header__item']}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                      );
                    })}
                  </tr>
                );
              })}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => {
                return (
                  <tr key={row.id} className={css['row']}>
                    {row.getVisibleCells().map(cell => (
                      <td className={css['col']} key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className={css['table__pagination']}>
          <Pagination page={page} count={totalPage} onChange={(_, p) => onChangePage(p)} />
        </div>
      </div>
      <ConfirmModal
        customStyle="max-w-[400px]"
        open={openModal.name === 'delete' && openModal.open}
        handleClose={handleCloseModal}
        icon={<FeaturedIcon iconName="alert-circle" size="lg" type="light-circle" theme="warning" />}
        confirmHeader={translate('schema-delete-title')}
        confirmSubheader={translate('schema-delete-subtitle')}
        buttons={[
          {
            color: 'primary',
            variant: 'outlined',
            fullWidth: true,
            onClick: handleCloseModal,
            children: translate('schema-cancel-button'),
          },
          {
            color: 'error',
            variant: 'contained',
            fullWidth: true,
            onClick: onDeleteSchema,
            children: translate('schema-delete-button'),
          },
        ]}
      />
      {viewData && (
        <SchemaDetailModal
          open={openModal.name === 'view' && openModal.open}
          handleClose={handleCloseModal}
          data={viewData}
        />
      )}
      <CustomSnackbar
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        containerClassName={css['snackbar']}
        autoHideDuration={5000}
      >
        <div className={css['snackbar__content']}>
          <Icon name="tick" color={variables.color_primary_700} />
          {translate('schema-copy-snackbar')}
        </div>
      </CustomSnackbar>
    </>
  ) : (
    <EmptySchema onCreateSchema={onCreateSchema} />
  );
};

export default SchemasList;
