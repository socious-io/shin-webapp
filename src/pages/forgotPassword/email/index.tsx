import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'src/modules/General/components/Button';
import FeaturedIcon from 'src/modules/General/components/FeaturedIcon';
import Input from 'src/modules/General/components/Input';
import EmptyPageLayout from 'src/modules/SignIn/EmptyPageLayout';

import { useEmail } from './useEmail';

export const Email = () => {
  const { t: translate } = useTranslation();
  const { register, errors, handleSubmit, handleForgetPassword, handleBack } = useEmail();
  console.log('test log forget password');
  return (
    <EmptyPageLayout
      headerIcon={<FeaturedIcon type="modern" theme="gray" size="xl" iconName="key-01" />}
      title={translate('password-forget')}
      subtitle={translate('password-forget-desc')}
      backLinkLabel={translate('ver-back')}
      backLinkAction={handleBack}
    >
      <div className="flex flex-col gap-6">
        <Input
          id="email"
          autoComplete="Email"
          label={translate('email-label')}
          name="email"
          register={register}
          placeholder={translate('email-placeholder')}
          errors={errors['email']?.message ? [errors['email']?.message.toString()] : undefined}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit(handleForgetPassword)}>
          {translate('password-reset')}
        </Button>
      </div>
    </EmptyPageLayout>
  );
};
