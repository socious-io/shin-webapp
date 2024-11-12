import { ColumnDef, flexRender, getCoreRowModel, Getter, useReactTable } from '@tanstack/react-table';
import React, { useMemo } from 'react';
import { formatDate } from 'src/core/helpers/relative-time';
import Button from 'src/modules/General/components/Button';
import FeaturedIcon from 'src/modules/General/components/FeaturedIcon';
import Icon from 'src/modules/General/components/Icon';
import Pagination from 'src/modules/General/components/Pagination';
import ThreeDotButton from 'src/modules/General/components/ThreeDotButton';
import ConfirmModal from 'src/modules/General/containers/ConfirmModal';
import CopyLinkModal from 'src/modules/General/containers/CopyLinkModal';
import HistorySlider from 'src/modules/Verifications/containers/HistorySlider';

import css from './index.module.scss';
import { VerificationListProps } from './index.types';
import { useReusableList } from './useReusableList';
import { useVerificationList } from '../VerificationList/useVerificationList';

const ReusableList = () => {
  const {
    data: { page, total, url },
    operations: { setPage, handleDelete, handleOpenCopy, handleCopy, translate },
  } = useReusableList(list, setList, totalItems, selectedId, setSelectedId, setOpenModal);

  const {
    operation: { getMenuItems, setOpenModal },
    data: { selectedId, openModal },
  } = useVerificationList();

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
              <Icon name="link-01" fontSize={20} className="text-Gray-light-mode-700" />
              {translate('ver-cell-copy-link')}
            </Button>
            <ThreeDotButton menuItems={getMenuItems(getValue())} />
          </div>
        ),
      },
    ],
    [list],
  );

  return <div>ReusableList</div>;
};

export default ReusableList;
