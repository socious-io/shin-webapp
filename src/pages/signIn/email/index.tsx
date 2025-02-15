import { useTranslation } from 'react-i18next';
import SociousLogo from 'src/assets/logo/socious-logo.svg';
import Button from 'src/modules/General/components/Button';
import Input from 'src/modules/General/components/Input';
import Link from 'src/modules/General/components/Link';
import SignInLayout from 'src/modules/SignIn/containers/Layout';

import css from './index.module.scss';
import { useEmail } from './useEmail';

export const Email = () => {
  const { register, errors, handleSubmit, onContinue, continueWithSocious } = useEmail();
  const { t: translate } = useTranslation();

  return (
    <SignInLayout>
      <div className={css['form']}>
        <div className={`w-full lg:w-[360px] lg:min-w-[360px] ${css['form__content']}`}>
          <div className={css['form__title']}>
            <div className={css['form__h1']}>{translate('h1')}</div>
            <div className={css['form__h2']}>{translate('h2')}</div>
          </div>

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
            <div className="flex flex-col gap-4">
              <Button color="primary" onClick={handleSubmit(onContinue)}>
                {translate('primary-btn-label')}
              </Button>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<img src={SociousLogo} alt="socious-logo" width={24} height={24} />}
                onClick={continueWithSocious}
              >
                {translate('socious-login')}
              </Button>
              {/* <Button color="primary" variant="outlined" onClick={continueWithGoogle}>
                  <img src={'/icons/google.svg'} alt="google-logo" width={24} height={24} />
                  {translate('google-login')}
                </Button> */}
            </div>
          </div>
          <div className="text-center">
            <span className={css['layout__subtitle']}>{translate('dont-have-account')}</span>
            <Link href="/sign-up" label={translate('link-sign-up')} />
          </div>
          <div className="text-center">
            <span className={css['form__subtitle']}>{translate('accept')}</span>
            <Link href="https://app.socious.io/terms-conditions/" label={translate('terms-of-use')} target="_blank" />
            <span className={css['form__subtitle']}>{translate('and')}</span>
            <Link href="https://app.socious.io/privacy-policy/" label={translate('privacy-policy')} target="_blank" />
          </div>
        </div>
      </div>
    </SignInLayout>
  );
};
