import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'src/modules/General/components/Button';
import { FeaturedIcon } from 'src/modules/General/components/FeaturedIcon';
import { Input } from 'src/modules/General/components/Input';
import EmptyPageLayout from 'src/modules/SignIn/EmptyPageLayout';

import { useEmail } from './useEmail';

export const Email = () => {
  const { t } = useTranslation();
  const { register, errors, handleSubmit, handleForgetPassword, handleBack } = useEmail();
  return (
    <EmptyPageLayout
      headerIcon={<FeaturedIcon type="modern" theme="gray" size="xl" iconName="key-01" />}
      title={t('password-forget')}
      subtitle={t('password-forget-desc')}
      backLinkLabel={t('ver-back')}
      backLinkAction={handleBack}
    >
      <div className="flex flex-col gap-6">
        <Input
          id="email"
          autoComplete="Email"
          label={t('email-label')}
          name="email"
          register={register}
          placeholder={t('email-placeholder')}
          errors={errors['email']?.message ? [errors['email']?.message.toString()] : undefined}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit(handleForgetPassword)}>
          {t('password-reset')}
        </Button>
      </div>
    </EmptyPageLayout>
  );
};
