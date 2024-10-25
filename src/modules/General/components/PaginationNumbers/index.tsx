import { Pagination as MUIPagination, PaginationItem, PaginationProps } from '@mui/material';
import { useTranslation } from 'react-i18next';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './index.module.scss';
import Icon from '../Icon';

const PaginationNumbers: React.FC<PaginationProps> = props => {
  const { t: translate } = useTranslation();

  return (
    <div className={css['container']}>
      <MUIPagination
        {...props}
        shape="rounded"
        renderItem={item => {
          if (item.type === 'previous') {
            return (
              <PaginationItem
                {...item}
                slots={{
                  previous: () => (
                    <div className={css['button']}>
                      <Icon name="arrow-left" fontSize={20} color={variables.color_grey_800} className="mr-2" />
                      {translate('pagination-previous')}
                    </div>
                  ),
                }}
              />
            );
          }
          return null;
        }}
      />

      <div className={css['numbers']}>
        <MUIPagination
          shape="rounded"
          renderItem={item => (
            <PaginationItem
              {...item}
              slots={{
                previous: () => null,
                next: () => null,
              }}
            />
          )}
          {...props}
        />
      </div>

      <MUIPagination
        {...props}
        shape="rounded"
        renderItem={item => {
          if (item.type === 'next') {
            return (
              <PaginationItem
                {...item}
                slots={{
                  next: () => (
                    <div className={css['button']}>
                      {translate('pagination-next')}
                      <Icon name="arrow-right" fontSize={20} color={variables.color_grey_800} className="ml-2" />
                    </div>
                  ),
                }}
              />
            );
          }
          return null;
        }}
      />
    </div>
  );
};

export default PaginationNumbers;
