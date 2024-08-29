import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'src/modules/General/components/Button';
import FeaturedIcon from 'src/modules/General/components/FeaturedIcon';
import Icon from 'src/modules/General/components/Icon';

import css from './index.module.scss';
import { EmptyVerificationsProps } from './index.type';

const EmptyVerifications: React.FC<EmptyVerificationsProps> = ({ handleCreate }) => {
  const { t: translate } = useTranslation();
  return (
    <div className={css['container']}>
      <div className="mb-4">
        <FeaturedIcon iconName="scan" size="lg" theme="gray" type="modern" />
      </div>
      <div className={css['title']}>{translate('ver-create_title')}</div>
      <div className={css['subtitle']}>{translate('ver-create-desc')}</div>
      <Button color="primary" variant="contained" customStyle={css['btn']} onClick={handleCreate}>
        <Icon fontSize={20} name="plus" className="text-Base-White" />
        {translate('ver_create_btn')}
      </Button>
    </div>
  );
};

export default EmptyVerifications;
