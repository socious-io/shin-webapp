import { Divider } from '@mui/material';
import { ColumnDef, flexRender, getCoreRowModel, Getter, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';
import { Credential } from 'src/core/adaptors';
import { formatDate } from 'src/core/helpers/relative-time';
import Button from 'src/modules/General/components/Button';
import Checkbox from 'src/modules/General/components/Checkbox';
import FeaturedIcon from 'src/modules/General/components/FeaturedIcon';
import Pagination from 'src/modules/General/components/Pagination';
import Status from 'src/modules/General/components/Status';
import ConfirmModal from 'src/modules/General/containers/ConfirmModal';

import css from './index.module.scss';
import { useSchemaCredentialList } from './useSchemaCredentialList';
import CredentialRecipientModal from '../CredentialRecipientModal';
import { SchemaCredentialListProps } from './index.types';

const SchemaCredentialList: React.FC<SchemaCredentialListProps> = ({
  selectedSchema,
  selectedCredentials,
  onSelectCredential,
  onSelectAllCredentials,
}) => {
  const {
    data: { translate, currentList, page, totalPage, status, openModal },
    operations: {
      onChangePage,
      onAddCredentialRecipientClick,
      onAddCredentialRecipient,
      handleCloseModal,
      onDeleteClick,
      onDeleteCredential,
    },
  } = useSchemaCredentialList(selectedSchema.id, selectedCredentials, onSelectCredential);

  const columns = useMemo<ColumnDef<Credential>[]>(
    () => [
      {
        id: 'recipient_name',
        header: translate('credential-table.name'),
        accessorKey: 'recipient_name',
        cell: ({ getValue }: { getValue: Getter<string> }) => <span className={css['col--darker']}>{getValue()}</span>,
      },
      {
        id: 'issuer',
        header: translate('credential-table.issuer'),
        accessorKey: 'issuer',
        cell: ({ getValue }: { getValue: Getter<string> }) => getValue(),
      },
      {
        id: 'type',
        header: translate('credential-table.type'),
        accessorKey: 'type',
        cell: ({ getValue }: { getValue: Getter<string> }) => getValue(),
      },
      {
        id: 'issuance_date',
        header: translate('credential-table.issuance-date'),
        accessorKey: 'issuance_date',
        cell: ({ getValue }: { getValue: Getter<string> }) => formatDate(getValue()),
      },
      {
        id: 'expiration_date',
        header: translate('credential-table.expiration-date'),
        accessorKey: 'expiration_date',
        cell: ({ getValue }: { getValue: Getter<string> }) => (getValue() ? formatDate(getValue()) : ''),
      },
      {
        id: 'status',
        header: translate('credential-table.status'),
        accessorKey: 'status',
        cell: ({ getValue }: { getValue: Getter<string> }) => (
          <div className="flex items-center">
            <Status {...status[getValue()]} />
          </div>
        ),
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
        <div className={css['header']}>
          <h1 className={css['header__title']}>{translate('credential-step2.header')}</h1>
          <h2 className={css['header__subtitle']}>{translate('credential-step2.subheader')}</h2>
        </div>
        <Divider />
        <div className={css['buttons']}>
          <Button variant="outlined" color="primary" onClick={onAddCredentialRecipientClick}>
            {translate('credential-step2.add-button')}
          </Button>
          <Button
            variant="outlined"
            color={!selectedCredentials.length ? 'inherit' : 'primary'}
            disabled={!selectedCredentials.length || !currentList.length}
            onClick={onDeleteClick}
          >
            {translate('credential-step2.delete-button')}
          </Button>
        </div>
        <div className={css['table']}>
          <div className="block overflow-auto">
            <table className="w-full rounded-lg">
              <thead className={css['table__header']}>
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th id={header.id} key={header.id} className={css['table__item']}>
                        {header.id === 'recipient_name' ? (
                          <div className="flex justify-start items-center gap-3 text-Gray-light-mode-600">
                            <Checkbox
                              id="select-all"
                              disabled={!currentList.length}
                              onChange={e => onSelectAllCredentials(e.target.checked, currentList)}
                            />
                            {flexRender(header.column.columnDef.header, header.getContext())}
                          </div>
                        ) : (
                          flexRender(header.column.columnDef.header, header.getContext())
                        )}
                      </th>
                    ))}
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
                                      checked={selectedCredentials.includes(item.id)}
                                      onChange={() => onSelectCredential(item.id)}
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
                    <td colSpan={6}>
                      <div className={css['table__empty']}>
                        {translate('credential-step2.empty-table-title')}
                        <span className={css['table__empty--lighter']}>
                          {translate('credential-step2.empty-table-subtitle')}
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
      <CredentialRecipientModal
        open={openModal.name === 'add' && openModal.open}
        handleClose={handleCloseModal}
        selectedSchema={selectedSchema}
        onAddCredentialRecipient={onAddCredentialRecipient}
      />
      <ConfirmModal
        customStyle="max-w-[400px]"
        open={openModal.name === 'delete' && openModal.open}
        handleClose={handleCloseModal}
        icon={<FeaturedIcon iconName="alert-circle" size="lg" type="light-circle" theme="warning" />}
        confirmHeader={translate('credential-step2.confirm-delete-title')}
        confirmSubheader={translate('credential-step2.confirm-delete-subtitle')}
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

export default SchemaCredentialList;
