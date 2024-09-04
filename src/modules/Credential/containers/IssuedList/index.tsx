import { ColumnDef, flexRender, getCoreRowModel, Getter, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';
import emptyStateImage from 'src/assets/images/empty-state.svg';
import { Credential } from 'src/core/adaptors';
import { formatDate } from 'src/core/helpers/relative-time';
import Button from 'src/modules/General/components/Button';
import Checkbox from 'src/modules/General/components/Checkbox';
import FeaturedIcon from 'src/modules/General/components/FeaturedIcon';
import Icon from 'src/modules/General/components/Icon';
import Pagination from 'src/modules/General/components/Pagination';
import Status from 'src/modules/General/components/Status';
import ConfirmModal from 'src/modules/General/containers/ConfirmModal';
import EmptyBox from 'src/modules/General/containers/EmptyBox';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './index.module.scss';
import { useIssuedList } from './useIssuedList';

const IssuedList = () => {
  const {
    data: { translate, currentList, page, totalPage, selectedCredential, status, openModal },
    operations: {
      setPage,
      onSelectCredential,
      handleCloseModal,
      onRevokeClick,
      onRevokeCredential,
      onDeleteClick,
      onDeleteCredential,
    },
  } = useIssuedList();

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
        cell: ({ getValue }: { getValue: Getter<string> }) => formatDate(getValue()),
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

  return currentList.length ? (
    <>
      <div className={css['container']}>
        <div className={css['buttons']}>
          <Button
            variant="outlined"
            color={!selectedCredential ? 'inherit' : 'secondary'}
            disabled={!selectedCredential}
            onClick={onRevokeClick}
          >
            {translate('credential-revoke-button')}
          </Button>
          <Button
            variant="outlined"
            color={!selectedCredential ? 'inherit' : 'secondary'}
            disabled={!selectedCredential}
            onClick={onDeleteClick}
          >
            {translate('credential-delete-button')}
          </Button>
        </div>
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
                            {flexRender(header.column.columnDef.header, header.getContext())}
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
                    <tr key={row.id} className="cursor-pointer">
                      {row.getVisibleCells().map(cell => {
                        const item = cell.column.id === 'recipient_name' ? cell.row.original : null;
                        return (
                          <td className={css['col']} key={cell.id}>
                            {cell.column.id === 'recipient_name' ? (
                              <div className="flex justify-start items-center gap-3">
                                {item && (
                                  <Checkbox
                                    id={item.id}
                                    checked={selectedCredential === item.id}
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
            </table>
          </div>
          <div className={css['table__pagination']}>
            <Pagination page={page} count={totalPage} onChange={(_, p) => setPage(p)} />
          </div>
        </div>
      </div>
      <ConfirmModal
        customStyle="max-w-[400px]"
        open={openModal.open}
        handleClose={handleCloseModal}
        icon={<FeaturedIcon iconName="alert-circle" size="lg" type="light-circle" theme="warning" />}
        confirmHeader={
          openModal.name === 'revoke' ? translate('credential-revoke-title') : translate('credential-delete-title')
        }
        confirmSubheader={
          openModal.name === 'revoke'
            ? translate('credential-revoke-subtitle')
            : translate('credential-delete-subtitle')
        }
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
            onClick: openModal.name === 'revoke' ? onRevokeCredential : onDeleteCredential,
            children:
              openModal.name === 'revoke'
                ? translate('credential-revoke-button')
                : translate('credential-delete-button'),
          },
        ]}
      />
    </>
  ) : (
    <EmptyBox
      icon={<img src={emptyStateImage} width={152} height={118} alt="empty-issued-list" />}
      title={translate('credential-empty-header')}
      subtitle={translate('credential-empty-subheader')}
      button={{
        children: translate('credential-issue'),
        color: 'primary',
        startIcon: <Icon name="plus" color={variables.color_white} />,
        onClick: () => console.log('issue'),
      }}
    />
  );
};

export default IssuedList;
