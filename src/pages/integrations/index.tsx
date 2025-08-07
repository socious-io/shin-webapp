import { translate } from 'src/core/helpers/utils';
import Button from 'src/modules/General/components/Button';
import Icon from 'src/modules/General/components/Icon';
import IntegrationList from 'src/modules/Integration/containers/IntegrationList';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './index.module.scss';
import { useIntegrations } from './useIntegrations';

export const Integrations = () => {
  const {
    data: { openAddModal },
    operations: { onAddIntegrationClick, setOpenAddModal },
  } = useIntegrations();

  return (
    <div className={css['container']}>
      <div className={css['top']}>
        <div className={css['top__header']}>
          <h1 className={css['top__title']}>{translate('integration-header')}</h1>
          <h2 className={css['top__subtitle']}>{translate('integration-subheader')}</h2>
        </div>
        <Button
          color="primary"
          startIcon={<Icon name="plus" color={variables.color_white} />}
          onClick={onAddIntegrationClick}
        >
          {translate('integration-add-button')}
        </Button>
      </div>
      <IntegrationList openAddModal={openAddModal} onOpenAddModal={setOpenAddModal} />
    </div>
  );
};
