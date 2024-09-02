import { ColumnDef, flexRender, getCoreRowModel, Getter, useReactTable } from '@tanstack/react-table';
import React, { useMemo } from 'react';
import { formatDate } from 'src/core/helpers/relative-time';
import Button from 'src/modules/General/components/Button';
import Icon from 'src/modules/General/components/Icon';
import Pagination from 'src/modules/General/components/Pagination';
import ThreeDotButton from 'src/modules/General/components/ThreeDotButton';

import css from './index.module.scss';
import { VerificationListProps } from './index.type';
import { useVerificationList } from './useVerificationList';

const VerificationList: React.FC<VerificationListProps> = ({ list, totalItems }) => {
  const {
    data: { page, verifications, total, getMenuItems },
    operations: { setPage },
  } = useVerificationList(list, totalItems);

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: 'name',
        header: 'Name',
        accessorKey: 'name',
        cell: ({ getValue }: { getValue: Getter<string> }) => getValue(),
      },
      {
        id: 'proofId',
        header: 'Proof ID',
        accessorKey: 'proofId',
        cell: ({ getValue }: { getValue: Getter<string> }) => <div className={css['col--gray']}>{getValue()}</div>,
      },
      {
        id: 'createdBy',
        header: 'Created by',
        accessorKey: 'createdBy',
        cell: ({ getValue }: { getValue: Getter<string> }) => <div className={css['col--bold']}>{getValue()}</div>,
      },
      {
        id: 'creationDate',
        header: 'Creation Date',
        accessorKey: 'creationDate',
        cell: ({ getValue }: { getValue: Getter<string> }) => (
          <div className={css['col--gray']}>{formatDate(getValue())}</div>
        ),
      },
      {
        id: 'actions',
        header: '',
        accessorKey: 'id',
        cell: ({ getValue }: { getValue: Getter<string> }) => {
          const rowId = getValue();
          return (
            <div className={css['col__actions']}>
              <Button variant="outlined" color="primary" customStyle={css['col__btn']}>
                <Icon name="link-01" fontSize={20} className="text-Gray-light-mode-700" />
                Copy link
              </Button>
              <ThreeDotButton menuItems={getMenuItems(getValue())} />
            </div>
          );
        },
      },
    ],
    [verifications],
  );

  const table = useReactTable({
    data: verifications,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
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
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
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
        <Pagination page={page} count={total} onChange={(_, p) => setPage(p)} />
      </div>
    </div>
  );
};

export default VerificationList;
