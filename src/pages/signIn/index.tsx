import { useTranslation } from 'react-i18next';
import shinLogo from 'src/assets/images/logo/logo.svg';
import sociousLogo from 'src/assets/images/logo/socious-logo.svg';
import Button from 'src/modules/General/components/Button';
import Icon from 'src/modules/General/components/Icon';
import { Input } from 'src/modules/General/components/Input';
import { Link } from 'src/modules/General/components/Link';

import css from './index.module.scss';
import { useSignIn } from './useSignIn';

export const SignIn = () => {
  const { register, errors, handleSubmit } = useSignIn();
  const { t } = useTranslation();

  return (
    <div className={css['container']}>
      <div className={`w-full lg:min-w-[600px] ${css['form']}`}>
        <img src={shinLogo} alt="SHIN_LOGO" width="79px" height="32px" />
        <div className={css['form__layout']}>
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
                <Button color="primary">{t('primary-btn-label')}</Button>
                <Button color="primary" variant="outlined" style={{ display: 'flex', gap: '12px' }}>
                  <img src={sociousLogo} alt="" />
                  {t('socious-login')}
                </Button>
                <Button
                  color="primary"
                  variant="outlined"
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
        <div className="flex justify-between">
          <span className={css['form__subtitle']}>@ Socious Global Inc. 2024</span>
          <span className={`flex gap-2 ${css['form__subtitle']}`}>
            <Icon name="mail-01" fontSize={16} className="text-Gray-light-mode-600" />
            help@socious.io
          </span>
        </div>
      </div>
      <div className={`hidden lg:flex ${css['section']}`}>
        <div className="pr-16">
          <div className={css['section__title']}>{t('picture-desc')}</div>
          <div className={css['section__stars']}>
            {[...Array(5).map(i => <Icon key={i} name="Star" fontSize={20} className="text-Gray-light-mode-900" />)]}
          </div>
        </div>
        <div className={css['section__image']} />
      </div>
    </div>
  );
};
