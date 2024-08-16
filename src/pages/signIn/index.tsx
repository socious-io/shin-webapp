import Button from 'src/modules/General/components/Button';
import Icon from 'src/modules/General/components/Icon';
import { Input } from 'src/modules/General/components/Input';
import { Link } from 'src/modules/General/components/Link';

import css from './index.module.scss';
import { useSignIn } from './useSignIn';

export const SignIn = () => {
  const { register, errors, handleSubmit } = useSignIn();

  return (
    <div className={css['container']}>
      <div className={`w-full lg:min-w-[600px] ${css['formSection']}`}>
        <img src={'/images/logo/logo.svg'} alt="SHIN_LOGO" width="79px" height="32px" />
        <div className={css['formSection__form']}>
          <div className={`w-full lg:w-[360px] lg:min-w-[360px] ${css['formSection__form__content']}`}>
            <div className={css['formSection__form__title']}>
              <div className={css['formSection__form__h1']}>Sign in</div>
              <div className={css['formSection__form__h2']}>Start issuing verifiable credentials</div>
            </div>

            <div className="flex flex-col gap-6">
              <Input
                id="email"
                autoComplete="Email"
                label="Email*"
                name="email"
                register={register}
                placeholder="Enter your email"
                errors={errors['email']?.message ? [errors['email']?.message.toString()] : undefined}
              />
              <div className="flex flex-col gap-4">
                <Button color="primary">Continue</Button>
                <Button color="primary" variant="outlined" style={{ display: 'flex', gap: '12px' }}>
                  <img src={'/images/logo/socious-logo.svg'} alt="" />
                  Continue with Socious
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
                  Continue with Google
                </Button>
              </div>
            </div>

            <div className="text-center">
              <span className={css['formSection__subtitle']}>{`By continuing, you accept our `}</span>
              <Link href="/home" label="Terms of Use" target="_blank" />
              <span className={css['formSection__subtitle']}>{` and `}</span>
              <Link href="/home" label="Privacy Policy." target="_blank" />
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <span className={css['formSection__subtitle']}>@ Socious Global Inc. 2024</span>
          <span className={`flex gap-2 ${css['formSection__subtitle']}`}>
            <Icon name="mail-01" fontSize={16} className="text-Gray-light-mode-600" />
            help@socious.io
          </span>
        </div>
      </div>
      <div className={`hidden lg:flex ${css['section']}`}>
        <div className="pr-16">
          <div className={css['section__title']}>
            Implementing this identity solution has transformed our onboarding process. We&apos;ve cut verification
            times by 70% while improving security and protecting our user privacy.
          </div>
          <div className={css['section__stars']}>
            {[...Array(5).map(i => <Icon key={i} name="Star" fontSize={20} className="text-Gray-light-mode-900" />)]}
          </div>
        </div>
        <div className={css['section__image']} />
      </div>
    </div>
  );
};
