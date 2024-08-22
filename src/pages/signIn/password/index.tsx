import React from 'react';
import { useTranslation } from 'react-i18next';
import { BackLink } from 'src/modules/General/components/BackLink';
import Button from 'src/modules/General/components/Button';
import { Input } from 'src/modules/General/components/Input';
import SignInLayout from 'src/modules/SignIn/Layout';

import css from './index.module.scss';
import { usePassword } from './usePassword';

export const Password = () => {
  const { t } = useTranslation();
  const { email, register, errors, handleSubmit, onSubmit } = usePassword();
  return (
    <SignInLayout>
      <div className={css['form']}>
        <div className={`w-full lg:w-[360px] lg:min-w-[360px] ${css['form__content']}`}>
          <div className={css['form__title']}>
            <div className={css['form__h1']}>{t('password-h1')}</div>
            <div className={css['form__h2']}>{email}</div>
          </div>
          <div className="flex flex-col gap-6">
            <Input
              id="password"
              autoComplete="Password"
              label={t('password-label')}
              name="password"
              register={register}
              placeholder={t('password-placeholder')}
              errors={errors['password']?.message ? [errors['password']?.message.toString()] : undefined}
            />
          </div>
          <div className="flex flex-col gap-4">
            <Button color="primary" onClick={handleSubmit(onSubmit)}>
              {t('primary-btn-label')}
            </Button>
            <BackLink title="Back" />
          </div>
        </div>
      </div>
    </SignInLayout>
  );
};
