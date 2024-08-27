import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'src/modules/General/components/Button';
import { FeaturedIcon } from 'src/modules/General/components/FeaturedIcon';
import { Input } from 'src/modules/General/components/Input';
import EmptyPageLayout from 'src/modules/SignIn/EmptyPageLayout';

import { useNewPassword } from './useNewPassword';

export const NewPassword = () => {
  const { t } = useTranslation();
  const { handleBack, register, errors, handleSubmit, handleReset } = useNewPassword();
  return (
    <EmptyPageLayout
      headerIcon={<FeaturedIcon type="modern" theme="gray" size="xl" iconName="lock-01" />}
      title={t('forget-pass-title')}
      subtitle={t('forget-pass-subtitle')}
      backLinkLabel={t('ver-back')}
      backLinkAction={handleBack}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-5">
          <Input
            id="password"
            type="password"
            label={t('forget-pass-input-lbl')}
            name="password"
            register={register}
            placeholder={t('forget-pass-input-placeholder')}
            hints={[{ hint: t('forget-pass-input-hint'), hide: false }]}
            errors={errors['password']?.message ? [errors['password']?.message.toString()] : undefined}
          />
          <Input
            id="password-confirm"
            label={t('forget-pass-confirm')}
            name="confirmPassword"
            type="password"
            register={register}
            placeholder={t('forget-pass-confirm-placeholder')}
            errors={errors['confirmPassword']?.message ? [errors['confirmPassword']?.message.toString()] : undefined}
          />
        </div>
        <Button variant="contained" color="primary" onClick={handleSubmit(handleReset)}>
          {t('forget-pass-reset-btn')}
        </Button>
      </div>
    </EmptyPageLayout>
  );
};
