import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'src/modules/General/components/Button';
import { Input } from 'src/modules/General/components/Input';
import FormHeader from 'src/modules/SignUp/FormHeader';
import StepperLayout from 'src/modules/SignUp/StepperLayout';
import css from 'src/pages/signUp/detail/index.module.scss';
import { useDetail } from 'src/pages/signUp/detail/useDetail';

export const Detail = () => {
  const { t } = useTranslation();
  const { register, errors, onContinue, handleSubmit, email } = useDetail();
  return (
    <StepperLayout activeStep={0}>
      <div className={css['container']}>
        <FormHeader title={t('det-h1')} subtitle={t('det-h2')} />
        <div className={css['form']}>
          <div className={css['form__content']}>
            <div className="flex gap-5">
              <Input
                id="name"
                label={t('det-name-label')}
                name="name"
                register={register}
                placeholder={t('det-name-placeholder')}
                errors={errors['name']?.message ? [errors['name']?.message.toString()] : undefined}
              />

              <Input
                id="lastName"
                label={t('det-last-name-label')}
                name="lastName"
                register={register}
                placeholder={t('det-last-name-placeholder')}
                errors={errors['lastName']?.message ? [errors['lastName']?.message.toString()] : undefined}
              />
            </div>
            <Input id="email" value={email} label={t('det-email-label')} name="email" disabled />
            <Input
              id="jobTitle"
              label={t('det-job-label')}
              name="jobTitle"
              register={register}
              placeholder={t('det-job-placeholder')}
              errors={errors['jobTitle']?.message ? [errors['jobTitle']?.message.toString()] : undefined}
            />
            <Input
              autoComplete="current-password"
              id="password"
              type="password"
              label={t('det-password')}
              name="password"
              register={register}
              placeholder={t('det-password-placeholder')}
              errors={errors['password']?.message ? [errors['password']?.message.toString()] : undefined}
              hints={[
                {
                  hint: t('det-password-hint'),
                  hide: false,
                },
              ]}
            />
          </div>
          <Button color="primary" variant="contained" onClick={handleSubmit(onContinue)}>
            {t('det-btn-label')}
          </Button>
        </div>
      </div>
    </StepperLayout>
  );
};
