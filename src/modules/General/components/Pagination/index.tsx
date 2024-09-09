import { Pagination as MUIPagination, PaginationItem, PaginationProps } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './index.module.scss';

const Pagination: React.FC<PaginationProps> = props => {
  const { t: translate } = useTranslation();

  return (
    <div className={css['container']}>
      <MUIPagination
        page={props.page}
        shape="rounded"
        sx={{
          '.MuiPagination-ul': {
            display: 'flex',
            listStyleType: 'none',
            padding: 0,
            margin: 0,
          },
          '.MuiPaginationItem-root': {
            color: variables.color_grey_600,
            fontSize: '14px',
            fontWeight: '500',
            padding: '12px',
            borderRadius: '8px',
            border: `1px solid ${variables.color_grey_300}`,
          },
          '.MuiPaginationItem-page, .MuiPaginationItem-ellipsis': {
            display: 'none',
          },
          '.MuiPaginationItem-previous, .MuiPaginationItem-next': {
            margin: '0 4px',
          },
          '.Mui-selected': {
            backgroundColor: variables.color_grey_50,
            color: variables.color_grey_800,
          },
        }}
        renderItem={item => (
          <PaginationItem
            slots={{
              previous: () => <div className={css['button']}>{translate('pagination-previous')}</div>,
              next: () => <div className={css['button']}>{translate('pagination-next')}</div>,
            }}
            {...item}
          />
        )}
        {...props}
      />
      <div className={css['label']}>
        {translate('pagination-page')} {props.page} {translate('pagination-of')} {props.count}
      </div>
    </div>
  );
};

export default Pagination;
