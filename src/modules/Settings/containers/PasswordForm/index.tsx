import { Divider } from '@mui/material';
import Button from 'src/modules/General/components/Button';
import Input from 'src/modules/General/components/Input';

import css from './index.module.scss';
import { usePasswordForm } from './usePasswordForm';

const PasswordForm = () => {
  const {
    data: { translate, register, errors },
    operations: { handleSubmit, onSubmit },
  } = usePasswordForm();

  return (
    <form className={css['container']} onSubmit={handleSubmit(onSubmit)}>
      <span className={css['title']}>{translate('settings-password.title')}</span>
      <Input
        register={register}
        id="currentPass"
        name="currentPass"
        autoComplete="new-password"
        type="password"
        label={translate('settings-password.current')}
        placeholder={translate('settings-password.current-placeholder')}
        errors={errors['currentPass']?.message ? [errors['currentPass'].message.toString()] : undefined}
      />
      <Input
        register={register}
        id="newPass"
        name="newPass"
        autoComplete="new-password"
        type="password"
        label={translate('settings-password.create')}
        placeholder={translate('settings-password.create-placeholder')}
        hints={[{ hint: translate('settings-password.create-alert'), hide: false }]}
        errors={errors['newPass']?.message ? [errors['newPass'].message.toString()] : undefined}
      />
      <Input
        register={register}
        id="confirmPass"
        name="confirmPass"
        autoComplete="new-password"
        type="password"
        label={translate('settings-password.confirm')}
        placeholder={translate('settings-password.confirm')}
        errors={errors['confirmPass']?.message ? [errors['confirmPass'].message.toString()] : undefined}
      />
      <Divider className="mx-[-1.5rem]" />
      <Button color="primary" type="submit" customStyle="self-end">
        {translate('settings-password.save-button')}
      </Button>
    </form>
  );
};

export default PasswordForm;
