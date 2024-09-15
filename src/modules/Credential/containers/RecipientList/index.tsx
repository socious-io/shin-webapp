import { Divider } from '@mui/material';
import { ColumnDef, flexRender, getCoreRowModel, Getter, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';
import { Recipient } from 'src/core/adaptors';
import { formatDate } from 'src/core/helpers/relative-time';
import Button from 'src/modules/General/components/Button';
import Checkbox from 'src/modules/General/components/Checkbox';
import FeaturedIcon from 'src/modules/General/components/FeaturedIcon';
import Icon from 'src/modules/General/components/Icon';
import Pagination from 'src/modules/General/components/Pagination';
import ConfirmModal from 'src/modules/General/containers/ConfirmModal';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './index.module.scss';
import { useRecipientList } from './useRecipientList';
import AddRecipientModal from '../AddRecipientModal';
import { RecipientListProps } from './index.types';

const RecipientList: React.FC<RecipientListProps> = ({ selectedRecipient, onSelectRecipient }) => {
  const {
    data: { translate, currentList, page, totalPage, openModal },
    operations: {
      onChangePage,
      onAddRecipientClick,
      handleCloseModal,
      onAddRecipient,
      onDeleteClick,
      onDeleteCredential,
      onEditClick,
    },
  } = useRecipientList(selectedRecipient, onSelectRecipient);

  const columns = useMemo<ColumnDef<Recipient>[]>(
    () => [
      {
        id: 'recipient_name',
        header: translate('credential-step3.table.name'),
        accessorKey: 'name',
        cell: ({ getValue }: { getValue: Getter<string> }) => <span className={css['col--darker']}>{getValue()}</span>,
      },
      {
        id: 'email',
        header: translate('credential-step3.table.email'),
        accessorKey: 'email',
        cell: ({ getValue }: { getValue: Getter<string> }) => getValue(),
      },
      {
        id: 'created_date',
        header: translate('credential-step3.table.created_date'),
        accessorKey: 'created_date',
        cell: ({ getValue }: { getValue: Getter<string> }) => formatDate(getValue()),
      },
      {
        id: 'actions',
        header: '',
        accessorKey: 'id',
        cell: ({ getValue }: { getValue: Getter<string> }) => {
          const recipientId = getValue();
          return (
            <div className={css['col__actions']}>
              <Icon
                name="trash-01"
                fontSize={20}
                color={variables.color_grey_600}
                cursor="pointer"
                onClick={() => onDeleteClick(recipientId)}
              />
              <Icon
                name="edit-01"
                fontSize={20}
                color={variables.color_grey_600}
                cursor="pointer"
                onClick={() => onEditClick(recipientId)}
              />
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

  return (
    <>
      <div className={css['container']}>
        <h1 className={css['header']}>{translate('credential-step3-title')}</h1>
        <Divider />
        <div className={css['buttons']}>
          <Button variant="outlined" color="primary" onClick={onAddRecipientClick}>
            {translate('credential-step3.header')}
          </Button>
          <Button
            variant="outlined"
            color={!selectedRecipient ? 'inherit' : 'primary'}
            disabled={!selectedRecipient || !currentList.length}
            onClick={() => onDeleteClick()}
          >
            {translate('credential-step3.delete-button')}
          </Button>
        </div>
        <div className={css['table']}>
          <div className="block overflow-auto">
            <table className="w-full rounded-lg">
              <thead className={css['header']}>
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header =>
                      header.isPlaceholder ? null : (
                        <th id={header.id} key={header.id} className={css['header__item']}>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                      ),
                    )}
                  </tr>
                ))}
              </thead>
              {currentList.length ? (
                <tbody>
                  {table.getRowModel().rows.map(row => {
                    return (
                      <tr key={row.id} className={css['row']}>
                        {row.getVisibleCells().map(cell => {
                          const item = cell.column.id === 'recipient_name' ? cell.row.original : null;
                          return (
                            <td className={css['col']} key={cell.id}>
                              {cell.column.id === 'recipient_name' ? (
                                <div className="flex justify-start items-center gap-3">
                                  {item && (
                                    <Checkbox
                                      id={item.id}
                                      checked={selectedRecipient === item.id}
                                      onChange={() => onSelectRecipient(item.id)}
                                    />
                                  )}
                                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </div>
                              ) : (
                                flexRender(cell.column.columnDef.cell, cell.getContext())
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan={4}>
                      <div className={css['table__empty']}>
                        {translate('credential-step3.empty-table-title')}
                        <span className={css['table__empty--lighter']}>
                          {translate('credential-step3.empty-table-subtitle')}
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
          <div className={css['table__pagination']}>
            <Pagination page={page} count={totalPage} onChange={(_, p) => onChangePage(p)} />
          </div>
        </div>
      </div>
      <AddRecipientModal
        open={openModal.name === 'add' && openModal.open}
        handleClose={handleCloseModal}
        onAddRecipient={onAddRecipient}
        recipient={currentList.find(list => list.id === openModal?.recipientId)}
      />
      <ConfirmModal
        customStyle="max-w-[400px]"
        open={openModal.name === 'delete' && openModal.open}
        handleClose={handleCloseModal}
        icon={<FeaturedIcon iconName="alert-circle" size="lg" type="light-circle" theme="warning" />}
        confirmHeader={translate('credential-step3.confirm-delete-title')}
        confirmSubheader={translate('credential-step3.confirm-delete-subtitle')}
        buttons={[
          {
            color: 'primary',
            variant: 'outlined',
            fullWidth: true,
            onClick: handleCloseModal,
            children: translate('credential-cancel-button'),
          },
          {
            color: 'error',
            variant: 'contained',
            fullWidth: true,
            onClick: onDeleteCredential,
            children: translate('credential-delete-button'),
          },
        ]}
      />
    </>
  );
};

export default RecipientList;
