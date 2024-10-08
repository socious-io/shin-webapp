import { Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import FeaturedIcon from 'src/modules/General/components/FeaturedIcon';
import Modal from 'src/modules/General/components/Modal';

import css from './index.module.scss';
import { SchemaDetailModalProps } from './index.types';

const SchemaDetailModal: React.FC<SchemaDetailModalProps> = ({ open, handleClose, data }) => {
  const { t: translate } = useTranslation();
  const { name, description = '', id, attributes = [] } = data || {};

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      inlineTitle={false}
      icon={<FeaturedIcon iconName="shield-tick" size="lg" type="modern" theme="gray" />}
      title={name}
      subTitle={description}
      mobileCentered
      contentClassName={css['content']}
      customStyle="!max-h-[720px] max-w-[560px]"
    >
      <>
        <div className={css['info']}>
          {translate('schema-detail.id')}
          <Divider />
          <div className={css['info__value']}>{id}</div>
        </div>
        <div className={css['info']}>
          {translate('schema-detail.type')}
          <Divider />
          <div className={css['info__value']}>{name}</div>
        </div>
        <div className={css['info']}>
          {translate('schema-detail.attributes')}
          <Divider />
          {attributes.map((attribute, index) => (
            <div className={css['attribute']} key={index}>
              {attribute.name}
              <span className={css['attribute__description']}>{attribute.description}</span>
              <div className={`${css['attribute__description']} flex items-center gap-2`}>
                <div className={css['attribute__value']}>{attribute.name}</div>
                {attribute?.option?.label && `as ${attribute.option.label}`}
              </div>
            </div>
          ))}
        </div>
      </>
    </Modal>
  );
};

export default SchemaDetailModal;
