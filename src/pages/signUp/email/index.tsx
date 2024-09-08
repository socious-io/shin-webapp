import { useTranslation } from 'react-i18next';
import logo from 'src/assets/logo/logo.svg';
import Button from 'src/modules/General/components/Button';
import Icon from 'src/modules/General/components/Icon';
import Input from 'src/modules/General/components/Input';
import { Link } from 'src/modules/General/components/Link';

import css from './index.module.scss';
import { useEmail } from './useEmail';

export const Email = () => {
  const { register, errors, handleSubmit, onContinue, disabled, isValid } = useEmail();
  const { t: translate } = useTranslation();

  return (
    <div className={css['container']}>
      <div className={`w-full lg:min-w-[600px] ${css['layout']}`}>
        <img src={logo} alt="SHIN_LOGO" width="79px" height="32px" />
        <div className={css['form']}>
          <div className={`w-full lg:w-[360px] lg:min-w-[360px] ${css['form__content']}`}>
            <div className={css['form__title']}>
              <div className={css['form__h1']}>{translate('sign-up-h1')}</div>
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
                <Button color="primary" onClick={handleSubmit(onContinue)} disabled={disabled || !isValid}>
                  {translate('primary-btn-label')}
                </Button>
                {/* <Button color="primary" variant="outlined" style={{ display: 'flex', gap: '12px' }}>
                  <img src={'/images/logo/socious-logo.svg'} alt="" />
                  {translate('socious-login')}
                </Button> */}
                {/* <Button
                  color="primary"
                  variant="outlined"
                  // onClick={() => {
                  //     tried();
                  //     navigate(`/oauth/google${event.name && `?event_name=${event.name}`}`);
                  // }}
                  customStyle='flex gap-3'
                >
                  <img src={'/icons/google.svg'} alt="" />
                  {translate('google-login')}
                </Button> */}
              </div>
            </div>
            <div className="text-center">
              <span className={css['layout__subtitle']}>{translate('have-account')}</span>
              <Link href="/sign-in" label={translate('sign-in-link')} />
            </div>
            <div className="text-center">
              <span className={css['layout__subtitle']}>{translate('accept')}</span>
              <Link href="/sign-in" label={translate('terms-of-use')} target="_blank" />
              <span className={css['layout__subtitle']}>{translate('and')}</span>
              <Link href="/sign-in" label={translate('privacy-policy')} target="_blank" />
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <span className={css['layout__subtitle']}>@ Socious Global Inc. 2024</span>
          <span className={`flex gap-2 ${css['layout__subtitle']}`}>
            <Icon name="mail-01" fontSize={16} className="text-Gray-light-mode-600" />
            help@socious.io
          </span>
        </div>
      </div>
      <div className={`hidden lg:flex ${css['section']}`}>
        <div className="pr-16">
          <div className={css['section__title']}>{translate('picture-desc')}</div>
          <div className={css['section__stars']}>
            {[...Array(5).map(i => <Icon key={i} name="Star" fontSize={20} className="text-Gray-light-mode-900" />)]}
          </div>
        </div>
        <div className={css['section__image']} />
      </div>
    </div>
  );
};
