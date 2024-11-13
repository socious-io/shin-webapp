import { Divider } from '@mui/material';
import { Controller } from 'react-hook-form';
import { Attribute } from 'src/core/adaptors';
import { beautifyText } from 'src/core/helpers/texts';
import Button from 'src/modules/General/components/Button';
import Checkbox from 'src/modules/General/components/Checkbox';
import CloseButton from 'src/modules/General/components/CloseButton';
import DateTimePicker from 'src/modules/General/components/DateTimePicker';
import Input from 'src/modules/General/components/Input';
import { Slider } from 'src/modules/General/components/Slider';

import css from './index.module.scss';
import { CredentialRecipientModalProps } from './index.types';
import { useCredentialRecipientModal } from './useCredentialRecipientModal';

const CredentialRecipientModal: React.FC<CredentialRecipientModalProps> = ({
  open,
  handleClose,
  selectedSchema,
  onAddCredentialRecipient,
}) => {
  const {
    data: { translate, control, register, errors, disabledSubmit, schemaAttributes },
    operations: { areEqual, handleSubmit, onSubmit },
  } = useCredentialRecipientModal(selectedSchema, onAddCredentialRecipient);

  const generateOptionJSX = (attribute: Attribute) => ({
    DATETIME: (
      <Controller
        key={attribute.name}
        name={attribute.name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <DateTimePicker
            id={attribute.name}
            label={beautifyText(attribute.name)}
            value={value}
            onChange={onChange}
            errorMessage={errors[attribute.name]?.message?.toString() || ''}
          />
        )}
      />
    ),
    BOOLEAN: (
      <Checkbox
        key={attribute.name}
        id={attribute.name}
        name={attribute.name}
        control={control}
        label={beautifyText(attribute.name)}
        required
        errors={errors[attribute.name]?.message ? [errors[attribute.name]?.message?.toString() || ''] : undefined}
      />
    ),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Slider open={open} onClose={handleClose} showHeader={false} contentClassName={css['content']}>
        <div className={css['content__scroll']}>
          <div className={css['top']}>
            <div className={css['header']}>
              {translate('credential-step2.add.recipient-header')}
              <span className={css['header--light']}>{translate('credential-step2.add.recipient-subheader')}</span>
            </div>
            <CloseButton handleClose={handleClose} customStyle={css['top__close']} />
          </div>
          <Divider />
          <Input
            id="recipient_email"
            name="recipient_email"
            register={register}
            label={`${translate('credential-step2.add.email')}*`}
            placeholder={translate('credential-step2.add.email')}
            errors={errors['recipient_email']?.message ? [errors['recipient_email'].message?.toString()] : undefined}
          />
          <Input
            id="recipient_firstName"
            name="recipient_firstName"
            register={register}
            label={`${translate('credential-step2.add.first-name')}*`}
            placeholder={translate('credential-step2.add.first-name-placeholder')}
            errors={
              errors['recipient_firstName']?.message ? [errors['recipient_firstName'].message?.toString()] : undefined
            }
          />
          <Input
            id="recipient_lastName"
            name="recipient_lastName"
            register={register}
            label={`${translate('credential-step2.add.last-name')}*`}
            placeholder={translate('credential-step2.add.last-name-placeholder')}
            errors={
              errors['recipient_lastName']?.message ? [errors['recipient_lastName'].message?.toString()] : undefined
            }
          />

          <div className={`${css['header']} mt-8`}>
            {translate('credential-step2.add.credential-header')}
            <span className={css['header--light']}>{translate('credential-step2.add.credential-subheader')}</span>
          </div>
          <Divider />
          {schemaAttributes.map(
            attribute =>
              generateOptionJSX(attribute)[attribute.option.value] || (
                <Input
                  key={attribute.name}
                  id={attribute.name}
                  name={attribute.name}
                  register={register}
                  type={attribute.type === 'NUMBER' ? 'number' : 'text'}
                  label={beautifyText(attribute.name)}
                  placeholder={beautifyText(attribute.name)}
                  hints={
                    attribute?.description && !areEqual(attribute.description, attribute.name)
                      ? [{ hint: attribute.description, hide: false }]
                      : undefined
                  }
                  errors={
                    errors[attribute.name]?.message ? [errors[attribute.name]?.message?.toString() || ''] : undefined
                  }
                />
              ),
          )}
          {/* <Divider className="mx-[-24px]" /> */}
          <div className={css['footer']}>
            <Button variant="outlined" color="info" onClick={handleClose}>
              {translate('credential-cancel-button')}
            </Button>
            <Button type="submit" color="primary" disabled={disabledSubmit}>
              {translate('credential-step2.add-button')}
            </Button>
          </div>
        </div>
      </Slider>
    </form>
  );
};

export default CredentialRecipientModal;
