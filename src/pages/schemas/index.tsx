import Button from 'src/modules/General/components/Button';
import Icon from 'src/modules/General/components/Icon';
import EmptySchema from 'src/modules/Schema/containers/EmptySchema';
import SchemasList from 'src/modules/Schema/containers/SchemasList';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './index.module.scss';
import { useSchemas } from './useSchemas';

export const Schemas = () => {
  const {
    data: { currentList },
    operations: { onCreateSchema, setCurrentList },
  } = useSchemas();

  return (
    <div className={css['container']}>
      <div className={css['top']}>
        <div className={css['top__header']}>
          <h1 className={css['top__title']}>Credential Schemas</h1>
          <h2 className={css['top__subtitle']}>Manage your credentials schemas here.</h2>
        </div>
        <Button color="primary" startIcon={<Icon name="plus" color={variables.color_white} />} onClick={onCreateSchema}>
          Create schema
        </Button>
      </div>
      {currentList?.length ? (
        <SchemasList list={currentList} onUpdateList={setCurrentList} />
      ) : (
        <EmptySchema onCreateSchema={onCreateSchema} />
      )}
    </div>
  );
};
