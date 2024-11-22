import { ColumnDef, flexRender, getCoreRowModel, Getter, useReactTable } from '@tanstack/react-table';
import React, { useMemo } from 'react';
import { StatusValue } from 'src/core/api';
import { formatDate } from 'src/core/helpers/relative-time';
import Button from 'src/modules/General/components/Button';
import Icon from 'src/modules/General/components/Icon';
import Pagination from 'src/modules/General/components/Pagination';
import { Slider } from 'src/modules/General/components/Slider';
import CopyLinkModal from 'src/modules/General/containers/CopyLinkModal';
import Status from 'src/modules/Verifications/components/Status';

import css from './index.module.scss';
import { HistorySliderProps } from './index.types';
import { useHistorySlider } from './useHistorySlider';

const HistorySlider: React.FC<HistorySliderProps> = ({ open, handleClose, verificationId }) => {
  const {
    data: { history, url, openModal, page, total },
    operations: { translate, handleCopy, handleOpenCopy, setOpenModal, setPage },
  } = useHistorySlider(verificationId);

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: 'id',
        header: 'Request ID',
        accessorKey: 'id',
        cell: ({ getValue }: { getValue: Getter<string> }) => getValue(),
      },
      {
        id: 'status',
        header: translate('ver-col-status'),
        accessorKey: 'status',
        cell: ({ getValue }: { getValue: Getter<string> }) => {
          const status = getValue();
          if (status) return <Status status={status as StatusValue} />;
          return '';
        },
      },
      {
        id: 'createDate',
        header: translate('ver-col-create-date'),
        accessorKey: 'createDate',
        cell: ({ getValue }: { getValue: Getter<string> }) => (
          <div className={css['col--gray']}>{formatDate(getValue())}</div>
        ),
      },
      // {
      //   id: 'actions',
      //   header: '',
      //   accessorKey: 'individualId',
      //   cell: ({ getValue }: { getValue: Getter<string> }) => (
      //     <div className={css['col__actions']}>
      //       <Button
      //         variant="outlined"
      //         color="primary"
      //         customStyle={css['col__btn']}
      //         onClick={() => handleOpenCopy(getValue())}
      //       >
      //         <Icon name="link-01" fontSize={20} className="text-Gray-light-mode-700" />
      //         {translate('ver-cell-copy-link')}
      //       </Button>
      //     </div>
      //   ),
      // },
    ],
    [history],
  );

  const table = useReactTable({
    data: history,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <Slider open={open} onClose={handleClose} title={translate('ver-cell-History')}>
        <div className={css['table']}>
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
          {!!history.length && (
            <div className={css['table__pagination']}>
              <Pagination page={page} count={total} onChange={(_, p) => setPage(p)} />
            </div>
          )}
        </div>
      </Slider>
      {url && (
        <CopyLinkModal
          open={openModal}
          handleClose={() => setOpenModal(false)}
          title={translate('ver-copy-modal-title')}
          subtitle={translate('ver-copy-modal-subtitle')}
          link={url}
          onCopy={handleCopy}
        />
      )}
    </>
  );
};

export default HistorySlider;
