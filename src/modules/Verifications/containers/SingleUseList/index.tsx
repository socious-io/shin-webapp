import { ColumnDef, flexRender, getCoreRowModel, Getter, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';
import { formatDate } from 'src/core/helpers/relative-time';
import { translate } from 'src/core/helpers/utils';
import Button from 'src/modules/General/components/Button';
import ConfirmModal from 'src/modules/General/components/ConfirmModal';
import FeaturedIcon from 'src/modules/General/components/FeaturedIcon';
import Icon from 'src/modules/General/components/Icon';
import Pagination from 'src/modules/General/components/Pagination';
import ThreeDotButton from 'src/modules/General/components/ThreeDotButton';

import css from './index.module.scss';
import { SingleUseListProps } from './index.types';
import { useSingleUseList } from './useSingleUseList';

const SingleUseList: React.FC<SingleUseListProps> = ({
  openModal,
  setOpenModal,
  selectedId,
  getMenuItems,
  handleOpenCopy,
}) => {
  const {
    data: { page, total, list },
    operations: { handleDelete, fetchMore },
  } = useSingleUseList(setOpenModal, selectedId);

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: 'name',
        header: translate('ver-col-name'),
        accessorKey: 'name',
        cell: ({ getValue }: { getValue: Getter<string> }) => getValue(),
      },
      {
        id: 'proofId',
        header: translate('ver-col-proof'),
        accessorKey: 'proofId',
        cell: ({ getValue }: { getValue: Getter<string> }) => <div className={css['col--gray']}>{getValue()}</div>,
      },
      {
        id: 'activeLinks',
        header: translate('ver-col-active-links'),
        accessorKey: 'activeLinks',
        cell: ({ getValue }: { getValue: Getter<string> }) => <div className={css['col--gray']}>{getValue()}</div>,
      },
      {
        id: 'completed',
        header: translate('ver-col-completed'),
        accessorKey: 'completed',
        cell: ({ getValue }: { getValue: Getter<string> }) => <div className={css['col--gray']}>{getValue()}</div>,
      },
      {
        id: 'createdBy',
        header: translate('ver-col-created-by'),
        accessorKey: 'createdBy',
        cell: ({ getValue }: { getValue: Getter<string> }) => <div className={css['col--bold']}>{getValue()}</div>,
      },
      {
        id: 'creationDate',
        header: translate('ver-col-create-date'),
        accessorKey: 'creationDate',
        cell: ({ getValue }: { getValue: Getter<string> }) => (
          <div className={css['col--gray']}>{formatDate(getValue())}</div>
        ),
      },
      {
        id: 'actions',
        header: '',
        accessorKey: 'id',
        cell: ({ getValue }: { getValue: Getter<string> }) => (
          <div className={css['col__actions']}>
            <Button
              variant="outlined"
              color="primary"
              customStyle={css['col__btn']}
              onClick={() => handleOpenCopy(getValue())}
            >
              <Icon name="plus" fontSize={20} className="text-Gray-light-mode-700" />
              {translate('ver-generate-link')}
            </Button>
            <ThreeDotButton menuItems={getMenuItems(getValue(), 'singleUse')} />
          </div>
        ),
      },
    ],
    [list],
  );
  const table = useReactTable({
    data: list,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <div className={css['container']}>
        <div className={css['container__title']}>{translate('ver-single-use-title')}</div>
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
                      <td
                        className={`${css['col']} ${cell.id.includes('actions') && '!overflow-visible'}`}
                        key={cell.id}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className={css['table__pagination']}>
            <Pagination page={page} count={total} onChange={(_, p) => fetchMore(p)} />
          </div>
        </div>
      </div>
      <ConfirmModal
        customStyle="max-w-[400px]"
        open={openModal?.name === 'delete' && openModal.open}
        handleClose={() => setOpenModal({ name: 'delete', open: false })}
        icon={<FeaturedIcon iconName="alert-circle" size="lg" type="light-circle" theme="warning" />}
        confirmHeader={translate('ver-delete-modal-title')}
        confirmSubheader={translate('ver-delete-modal-subtitle')}
        buttons={[
          {
            color: 'primary',
            variant: 'outlined',
            fullWidth: true,
            onClick: () => setOpenModal({ name: 'delete', open: false }),
            children: translate('ver-delete-modal-cancel'),
          },
          {
            color: 'error',
            variant: 'contained',
            fullWidth: true,
            onClick: handleDelete,
            children: translate('ver-delete-modal-btn'),
          },
        ]}
      />
    </>
  );
};

export default SingleUseList;
