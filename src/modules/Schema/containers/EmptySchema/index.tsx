import Button from 'src/modules/General/components/Button';
import FeaturedIcon from 'src/modules/General/components/FeaturedIcon';
import Icon from 'src/modules/General/components/Icon';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './index.module.scss';
import { EmptySchemaProps } from './index.types';

const EmptySchema: React.FC<EmptySchemaProps> = ({ onCreateSchema }) => {
  return (
    <div className={css['container']}>
      <FeaturedIcon iconName="file-05" size="lg" type="modern" theme="gray" />
      <div className={css['content']}>
        Create a schema
        <span className={css['content__subtitle']}>Create a schema manually and add attributes.</span>
      </div>
      <Button color="primary" startIcon={<Icon name="plus" color={variables.color_white} />} onClick={onCreateSchema}>
        Create schema
      </Button>
    </div>
  );
};

export default EmptySchema;
