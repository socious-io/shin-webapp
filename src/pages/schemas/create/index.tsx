import Button from 'src/modules/General/components/Button';
import CreateSchema from 'src/modules/Schema/containers/CreateSchema';

import css from './index.module.scss';
import { useCreate } from './useCreate';

export const Create = () => {
  const {
    data: { createSchemaRef },
    operations: { onCancelCreateSchema, handlePublish },
  } = useCreate();

  return (
    <div className={css['container']}>
      <div className={css['top']}>
        <div className={css['top__header']}>
          <h1 className={css['top__title']}>Create a credential schema</h1>
          <h2 className={css['top__subtitle']}>
            A schema is like a template for credential that issuers and verifiers use. It includes specific credential
            attributes such as name, license number, issue date etc.
          </h2>
        </div>
        <div className={css['top__buttons']}>
          <Button color="primary" variant="outlined" onClick={onCancelCreateSchema}>
            Cancel
          </Button>
          <Button color="primary" type="submit" onClick={handlePublish}>
            Publish
          </Button>
        </div>
      </div>
      <CreateSchema ref={createSchemaRef} />
    </div>
  );
};
