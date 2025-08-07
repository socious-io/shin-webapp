import { Divider } from '@mui/material';
import { translate } from 'src/core/helpers/utils';
import Button from 'src/modules/General/components/Button';
import CardRadioButton from 'src/modules/General/components/CardRadioButton';

import css from './index.module.scss';
import { SelectSchemaProps } from './index.types';
import { useSelectSchema } from './useSelectSchema';

const SelectSchema: React.FC<SelectSchemaProps> = ({ schemaRadioItems, selectedSchema, onSelectSchema }) => {
  const {
    operations: { onCreateSchema },
  } = useSelectSchema();

  return (
    <div className={css['container']}>
      <div className={css['top']}>
        <div className={css['top__header']}>
          <h1 className={css['top__title']}>{translate('credential-step1.header')}</h1>
          <h2 className={css['top__subtitle']}>{translate('credential-step1.subheader')}</h2>
        </div>
        <Button color="primary" onClick={onCreateSchema}>
          {translate('credential-step1.button')}
        </Button>
      </div>
      <Divider />
      <CardRadioButton
        items={schemaRadioItems}
        selectedValue={selectedSchema}
        setSelectedValue={onSelectSchema}
        customStyle={css['select']}
        containerClassName={css['select__box']}
      />
    </div>
  );
};

export default SelectSchema;
