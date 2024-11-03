import Button from 'src/modules/General/components/Button';
import CreateSchema from 'src/modules/Schema/containers/CreateSchema';

import css from './index.module.scss';
import { useCreate } from './useCreate';

export const Create = () => {
  const {
    data: { translate, createSchemaRef },
    operations: { onCancelCreateSchema, handlePublish },
  } = useCreate();

  return (
    <div className={css['container']}>
      <div className={css['top']}>
        <div className={css['top__header']}>
          <h1 className={css['top__title']}>{translate('schema-create-header')}</h1>
          <h2 className={css['top__subtitle']}>{translate('schema-create-subheader')}</h2>
        </div>
        <div className={css['top__buttons']}>
          <Button color="primary" variant="outlined" onClick={onCancelCreateSchema} customStyle="min-w-fit">
            {translate('schema-cancel-button')}
          </Button>
          <Button color="primary" type="submit" onClick={handlePublish} customStyle="min-w-fit">
            {translate('schema-publish-button')}
          </Button>
        </div>
      </div>
      <CreateSchema ref={createSchemaRef} />
    </div>
  );
};
