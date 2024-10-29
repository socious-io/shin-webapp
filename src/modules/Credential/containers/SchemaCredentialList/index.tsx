import { CircularProgress, Divider } from '@mui/material';
import { ColumnDef, flexRender, getCoreRowModel, Getter, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';
import { Credential } from 'src/core/adaptors';
import { formatDate } from 'src/core/helpers/relative-time';
import Button from 'src/modules/General/components/Button';
import FeaturedIcon from 'src/modules/General/components/FeaturedIcon';
import Icon from 'src/modules/General/components/Icon';
import Pagination from 'src/modules/General/components/Pagination';
import ConfirmModal from 'src/modules/General/containers/ConfirmModal';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './index.module.scss';
import { useSchemaCredentialList } from './useSchemaCredentialList';
import CredentialRecipientModal from '../CredentialRecipientModal';
import { SchemaCredentialListProps } from './index.types';
import ImportCSVModal from '../ImportCSVModal';

const SchemaCredentialList: React.FC<SchemaCredentialListProps> = ({
  selectedSchema,
  schemaCredentialList,
  onUpdateSchemaCredentialList,
}) => {
  const {
    data: { translate, currentList, importingDetail, page, totalPage, openModal },
    operations: {
      onChangePage,
      onImportCSVClick,
      onImportFiles,
      onAddCredentialRecipientClick,
      onAddCredentialRecipient,
      handleCloseModal,
      handleCloseCSVModal,
      onDeleteClick,
      onDeleteCredential,
    },
  } = useSchemaCredentialList(schemaCredentialList, onUpdateSchemaCredentialList);

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
        id: 'actions',
        header: '',
        accessorKey: 'id',
        cell: ({ getValue }: { getValue: Getter<string> }) => (
          <Icon
            name="trash-01"
            fontSize={20}
            cursor="pointer"
            color={variables.color_grey_600}
            onClick={() => onDeleteClick(getValue())}
          />
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
          <Button variant="outlined" color="primary" onClick={onImportCSVClick}>
            {translate('credential-step2.import-button')}
          </Button>
          <Button variant="outlined" color="primary" onClick={onAddCredentialRecipientClick}>
            {translate('credential-step2.add-button')}
          </Button>
        </div>
        <div className={css['table']}>
          <div className="block overflow-auto">
            <table className="w-full rounded-lg">
              <thead className={css['table__header']}>
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header =>
                      header.isPlaceholder ? null : (
                        <th id={header.id} key={header.id} className={css['table__item']}>
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
                        {row.getVisibleCells().map(cell => (
                          <td className={css['col']} key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan={columns.length}>
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
          {importingDetail.loading ? (
            <div className={css['table__loading']}>
              <CircularProgress size="0.75rem" color="primary" thickness={6} />
              {translate('credential-step2.import.uploaded-loading')}
            </div>
          ) : (
            <div className={css['table__pagination']}>
              <Pagination page={page} count={totalPage} onChange={(_, p) => onChangePage(p)} />
            </div>
          )}
        </div>
      </div>
      <ImportCSVModal
        open={openModal.name === 'import' && openModal.open}
        handleClose={handleCloseCSVModal}
        selectedSchema={selectedSchema}
        totalImportedRecipients={importingDetail.total}
        onImportFiles={onImportFiles}
      />
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
