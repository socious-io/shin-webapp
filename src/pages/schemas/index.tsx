import { translate } from 'src/core/helpers/utils';
import Button from 'src/modules/General/components/Button';
import Icon from 'src/modules/General/components/Icon';
import SchemasList from 'src/modules/Schema/containers/SchemasList';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './index.module.scss';
import { useSchemas } from './useSchemas';

export const Schemas = () => {
  const {
    operations: { onCreateSchema },
  } = useSchemas();

  return (
    <div className={css['container']}>
      <div className={css['top']}>
        <div className={css['top__header']}>
          <h1 className={css['top__title']}>{translate('schema-header')}</h1>
          <h2 className={css['top__subtitle']}>{translate('schema-subheader')}</h2>
        </div>
        <Button color="primary" startIcon={<Icon name="plus" color={variables.color_white} />} onClick={onCreateSchema}>
          {translate('schema-create-button')}
        </Button>
      </div>
      <SchemasList />
    </div>
  );
};
