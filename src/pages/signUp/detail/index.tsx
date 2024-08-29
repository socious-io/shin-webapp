import { useTranslation } from 'react-i18next';
import Button from 'src/modules/General/components/Button';
import Input from 'src/modules/General/components/Input';
import FormHeader from 'src/modules/SignUp/components/FormHeader';
import StepperLayout from 'src/modules/SignUp/components/StepperLayout';
import css from 'src/pages/signUp/detail/index.module.scss';
import { useDetail } from 'src/pages/signUp/detail/useDetail';

export const Detail = () => {
  const { t: translate } = useTranslation();
  const { register, errors, onContinue, handleSubmit, email } = useDetail();
  return (
    <StepperLayout activeStep={0}>
      <div className={css['container']}>
        <FormHeader title={translate('det-h1')} subtitle={translate('det-h2')} />
        <div className={css['form']}>
          <div className={css['form__content']}>
            <div className="flex gap-5">
              <Input
                id="name"
                label={translate('det-name-label')}
                name="name"
                register={register}
                placeholder={translate('det-name-placeholder')}
                errors={errors['name']?.message ? [errors['name']?.message.toString()] : undefined}
              />

              <Input
                id="lastName"
                label={translate('det-last-name-label')}
                name="lastName"
                register={register}
                placeholder={translate('det-last-name-placeholder')}
                errors={errors['lastName']?.message ? [errors['lastName']?.message.toString()] : undefined}
              />
            </div>
            <Input id="email" value={email} label={translate('det-email-label')} name="email" disabled />
            <Input
              id="jobTitle"
              label={translate('det-job-label')}
              name="jobTitle"
              register={register}
              placeholder={translate('det-job-placeholder')}
              errors={errors['jobTitle']?.message ? [errors['jobTitle']?.message.toString()] : undefined}
            />
            <Input
              autoComplete="current-password"
              id="password"
              type="password"
              label={translate('det-password')}
              name="password"
              register={register}
              placeholder={translate('det-password-placeholder')}
              errors={errors['password']?.message ? [errors['password']?.message.toString()] : undefined}
              hints={[
                {
                  hint: translate('det-password-hint'),
                  hide: false,
                },
              ]}
            />
          </div>
          <Button color="primary" variant="contained" onClick={handleSubmit(onContinue)}>
            {translate('det-btn-label')}
          </Button>
        </div>
      </div>
    </StepperLayout>
  );
};
