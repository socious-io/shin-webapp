import Button from 'src/modules/General/components/Button';
import Input from 'src/modules/General/components/Input';
import Modal from 'src/modules/General/components/Modal';

import css from './index.module.scss';
import { AddRecipientModalProps } from './index.types';
import { useAddRecipientModal } from './useAddRecipientModal';

const AddRecipientModal: React.FC<AddRecipientModalProps> = ({ open, handleClose, onAddRecipient, recipient }) => {
  const {
    data: { translate, register, errors, disabledSubmit },
    operations: { handleSubmit, onSubmit },
  } = useAddRecipientModal(onAddRecipient, recipient);

  const footerJSX = (
    <div className={css['footer']}>
      <Button variant="outlined" color="secondary" onClick={handleClose}>
        {translate('credential-cancel-button')}
      </Button>
      <Button type="submit" color={disabledSubmit ? 'secondary' : 'primary'} disabled={disabledSubmit}>
        {recipient ? translate('credential-step3.header-update') : translate('credential-step3.header')}
      </Button>
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Modal
        open={open}
        handleClose={handleClose}
        title={recipient ? translate('credential-step3.header-update') : translate('credential-step3.header')}
        headerDivider={false}
        footer={footerJSX}
        contentClassName={css['content']}
      >
        <Input
          id="email"
          name="email"
          register={register}
          label={`${translate('credential-step3.add.email')}*`}
          placeholder={translate('credential-step3.add.email')}
          errors={errors['email']?.message ? [errors['email'].message?.toString()] : undefined}
        />
        <Input
          id="firstName"
          name="firstName"
          register={register}
          label={`${translate('credential-step3.add.first-name')}*`}
          placeholder={translate('credential-step3.add.first-name-placeholder')}
          errors={errors['firstName']?.message ? [errors['firstName'].message?.toString()] : undefined}
        />
        <Input
          id="lastName"
          name="lastName"
          register={register}
          label={`${translate('credential-step3.add.last-name')}*`}
          placeholder={translate('credential-step3.add.last-name-placeholder')}
          errors={errors['lastName']?.message ? [errors['lastName'].message?.toString()] : undefined}
        />
      </Modal>
    </form>
  );
};

export default AddRecipientModal;
