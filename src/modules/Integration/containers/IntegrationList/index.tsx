import { ColumnDef, flexRender, getCoreRowModel, Getter, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Integration } from 'src/core/adaptors/integrations/index.types';
import { translate } from 'src/core/helpers/utils';
import ConfirmModal from 'src/modules/General/components/ConfirmModal';
import EmptyBox from 'src/modules/General/components/EmptyBox';
import FeaturedIcon from 'src/modules/General/components/FeaturedIcon';
import Icon from 'src/modules/General/components/Icon';
import Pagination from 'src/modules/General/components/Pagination';
import ThreeDotButton from 'src/modules/General/components/ThreeDotButton';
import Tooltip from 'src/modules/General/components/Tooltip';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './index.module.scss';
import { useIntegrationList } from './useIntegrationList';
import AddIntegrationModal from '../AddIntegrationModal';
import { IntegrationListProps } from './index.types';

const IntegrationList: React.FC<IntegrationListProps> = ({ openAddModal, onOpenAddModal }) => {
  const {
    data: { currentList, page, totalPage, openModal, copied },
    operations: {
      onChangePage,
      handleCloseModal,
      onOpenModal,
      onAddOrEditIntegration,
      onDeleteIntegration,
      onCopyKeys,
      setCopied,
    },
  } = useIntegrationList(onOpenAddModal);

  const columns = useMemo<ColumnDef<Integration>[]>(
    () => [
      {
        id: 'name',
        header: translate('integration-table.name'),
        accessorKey: 'name',
        cell: ({ getValue }: { getValue: Getter<string> }) => <span className={css['col--darker']}>{getValue()}</span>,
      },
      {
        id: 'base_url',
        header: translate('integration-table.base-url'),
        accessorKey: 'base_url',
        cell: ({ getValue }: { getValue: Getter<string> }) => (
          <Link to={getValue()} target="_blank" className={css['col__link']}>
            {getValue()}
          </Link>
        ),
      },
      {
        id: 'api_key',
        header: translate('integration-table.api-key'),
        accessorKey: 'api_key',
        cell: ({ getValue }: { getValue: Getter<string> }) => getValue(),
      },
      {
        id: 'secret_key',
        header: translate('integration-table.secret-key'),
        accessorKey: 'secret_key',
        cell: ({ getValue }: { getValue: Getter<string> }) => getValue(),
      },
      {
        id: 'actions',
        header: '',
        accessorKey: 'id',
        cell: ({ getValue }: { getValue: Getter<string> }) => {
          const rowId = getValue();
          return (
            <ThreeDotButton
              menuItems={[
                {
                  iconName: 'pencil-line',
                  label: translate('integration-menu.rename'),
                  action: () => onOpenModal('edit', rowId),
                },
                {
                  iconName: 'trash-01',
                  label: translate('integration-menu.delete'),
                  action: () => onOpenModal('delete', rowId),
                },
              ]}
            />
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

  const tooltipJSX = (
    <>
      <Icon
        name={copied ? 'check-circle' : 'clipboard-minus'}
        fontSize={16}
        color={copied ? variables.color_success_600 : variables.color_white}
        cursor="pointer"
      />
      {translate('integration-table.click-copy')}
    </>
  );

  return (
    <>
      {currentList.length ? (
        <>
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
                    <tr key={row.id} className={css['row']}>
                      {row.getVisibleCells().map(cell =>
                        cell.column.id === 'api_key' || cell.column.id === 'secret_key' ? (
                          <Tooltip
                            key={cell.id}
                            title={tooltipJSX}
                            placement="right"
                            offset={{ x: -24 }}
                            onClickTooltip={() => onCopyKeys(cell.getValue() as string)}
                            onOpen={() => setCopied(false)}
                          >
                            <td className={css['col']} key={cell.id}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                          </Tooltip>
                        ) : (
                          <td className={cell.column.id === 'actions' ? css['col__actions'] : css['col']} key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ),
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className={css['table__pagination']}>
              <Pagination page={page} count={totalPage} onChange={(_, p) => onChangePage(p)} />
            </div>
          </div>
          <AddIntegrationModal
            open={openModal.name === 'edit' && openModal.open}
            handleClose={handleCloseModal}
            onAddIntegration={onAddOrEditIntegration}
            integration={currentList.find(list => list.id === openModal.integrationId)}
          />
          <ConfirmModal
            customStyle="max-w-[400px]"
            open={openModal.name === 'delete' && openModal.open}
            handleClose={handleCloseModal}
            icon={<FeaturedIcon iconName="alert-circle" size="lg" type="light-circle" theme="warning" />}
            confirmHeader={translate('integration-delete.title')}
            confirmSubheader={translate('integration-delete.subtitle')}
            buttons={[
              {
                color: 'primary',
                variant: 'outlined',
                fullWidth: true,
                onClick: handleCloseModal,
                children: translate('integration-cancel-button'),
              },
              {
                color: 'error',
                variant: 'contained',
                fullWidth: true,
                onClick: () => onDeleteIntegration(openModal.integrationId),
                children: translate('integration-delete.title'),
              },
            ]}
          />
        </>
      ) : (
        <>
          <EmptyBox
            icon={<FeaturedIcon iconName="code-snippet-02" size="lg" type="modern" theme="gray" />}
            subtitle={translate('integration-empty-subheader')}
            button={{
              children: translate('integration-add-button'),
              color: 'primary',
              startIcon: <Icon name="plus" color={variables.color_white} />,
              onClick: () => onOpenAddModal(true),
            }}
          />
        </>
      )}
      <AddIntegrationModal
        open={openAddModal}
        handleClose={() => onOpenAddModal(false)}
        onAddIntegration={onAddOrEditIntegration}
      />
    </>
  );
};

export default IntegrationList;
