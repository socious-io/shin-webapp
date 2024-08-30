import { useTranslation } from 'react-i18next';
import Button from 'src/modules/General/components/Button';
import FeaturedIcon from 'src/modules/General/components/FeaturedIcon';
import Icon from 'src/modules/General/components/Icon';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './index.module.scss';
import { EmptySchemaProps } from './index.types';

const EmptySchema: React.FC<EmptySchemaProps> = ({ onCreateSchema }) => {
  const { t: translate } = useTranslation();

  return (
    <div className={css['container']}>
      <FeaturedIcon iconName="file-05" size="lg" type="modern" theme="gray" />
      <div className={css['content']}>
        {translate('schema-empty-header')}
        <span className={css['content__subtitle']}>{translate('schema-empty-subheader')}</span>
      </div>
      <Button color="primary" startIcon={<Icon name="plus" color={variables.color_white} />} onClick={onCreateSchema}>
        {translate('schema-create-button')}
      </Button>
    </div>
  );
};

export default EmptySchema;
