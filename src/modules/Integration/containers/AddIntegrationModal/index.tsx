import { translate } from 'src/core/helpers/utils';
import Button from 'src/modules/General/components/Button';
import FeaturedIcon from 'src/modules/General/components/FeaturedIcon';
import Input from 'src/modules/General/components/Input';
import Modal from 'src/modules/General/components/Modal';

import css from './index.module.scss';
import { AddIntegrationModalProps } from './index.types';
import { useAddIntegrationModal } from './useAddIntegrationModal';

const AddIntegrationModal: React.FC<AddIntegrationModalProps> = ({
  open,
  handleClose,
  onAddIntegration,
  integration,
}) => {
  const {
    data: { register, errors },
    operations: { handleSubmit, onSubmit },
  } = useAddIntegrationModal(onAddIntegration, integration);

  const footerJSX = (
    <div className={css['footer']}>
      <Button variant="outlined" color="info" onClick={handleClose} customStyle="w-full">
        {translate('integration-cancel-button')}
      </Button>
      <Button type="submit" color="primary" customStyle="w-full">
        {integration ? translate('integration-save-button') : translate('integration-add-button')}
      </Button>
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Modal
        open={open}
        handleClose={handleClose}
        icon={<FeaturedIcon type="modern" theme="gray" iconName="code-snippet-02" size="lg" />}
        headerDivider={false}
        footerDivider={false}
        footer={footerJSX}
        title={integration ? translate('integration-add.title-edit') : translate('integration-add.title')}
        inlineTitle={false}
        mobileCentered
        customStyle="md:max-w-[512px]"
        contentClassName="px-4 md:px-6"
      >
        <Input
          register={register}
          name="name"
          placeholder={translate('integration-add.input-label')}
          label={translate('integration-add.input-label')}
          hints={[{ hint: translate('integration-add.input-hint'), hide: false }]}
          errors={errors['name']?.message ? [errors['name'].message?.toString()] : undefined}
        />
      </Modal>
    </form>
  );
};

export default AddIntegrationModal;
