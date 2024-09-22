import Button from 'src/modules/General/components/Button';
import HorizontalTabs from 'src/modules/General/components/HorizontalTabs';
import Icon from 'src/modules/General/components/Icon';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './index.module.scss';
import { useCredentials } from './useCredentials';

export const Credentials = () => {
  const {
    data: { translate, tabs },
    operations: { onCreateCredential },
  } = useCredentials();

  return (
    <div className={css['container']}>
      <div className={css['top']}>
        <div className={css['top__header']}>
          <h1 className={css['top__title']}>{translate('credential-header')}</h1>
          <h2 className={css['top__subtitle']}>{translate('credential-subheader')}</h2>
        </div>
        <Button
          color="primary"
          startIcon={<Icon name="plus" color={variables.color_white} />}
          onClick={onCreateCredential}
        >
          {translate('credential-issue')}
        </Button>
      </div>
      <HorizontalTabs tabs={tabs} />
    </div>
  );
};
