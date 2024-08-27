import { useTranslation } from 'react-i18next';
import shinLogo from 'src/assets/images/logo/logo.svg';
import sociousLogo from 'src/assets/images/logo/socious-logo.svg';
import Button from 'src/modules/General/components/Button';
import Icon from 'src/modules/General/components/Icon';
import { Input } from 'src/modules/General/components/Input';
import { Link } from 'src/modules/General/components/Link';
import SignInLayout from 'src/modules/SignIn/Layout';

import css from './index.module.scss';
import { useEmail } from './useEmail';

export const Email = () => {
  const { register, errors, handleSubmit, onContinue, continueWithGoogle } = useEmail();
  const { t } = useTranslation();

  return (
    <SignInLayout>
      <div className={css['form']}>
        <div className={`w-full lg:w-[360px] lg:min-w-[360px] ${css['form__content']}`}>
          <div className={css['form__title']}>
            <div className={css['form__h1']}>{t('h1')}</div>
            <div className={css['form__h2']}>{t('h2')}</div>
          </div>

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
            <div className="flex flex-col gap-4">
              <Button color="primary" onClick={handleSubmit(onContinue)}>
                {t('primary-btn-label')}
              </Button>
              <Button color="primary" variant="outlined" style={{ display: 'flex', gap: '12px' }}>
                <img src={sociousLogo} alt="" />
                {t('socious-login')}
              </Button>
              <Button
                color="primary"
                variant="outlined"
                onClick={continueWithGoogle}
                // onClick={() => {
                //     tried();
                //     navigate(`/oauth/google${event.name && `?event_name=${event.name}`}`);
                // }}
                style={{ display: 'flex', gap: '12px' }}
              >
                <img src={'/icons/google.svg'} alt="" />
                {t('google-login')}
              </Button>
            </div>
          </div>

          <div className="text-center">
            <span className={css['form__subtitle']}>{t('accept')}</span>
            <Link href="/home" label={t('terms-of-use')} target="_blank" />
            <span className={css['form__subtitle']}>{t('and')}</span>
            <Link href="/home" label={t('privacy-policy')} target="_blank" />
          </div>
        </div>
      </div>
    </SignInLayout>
  );
};
