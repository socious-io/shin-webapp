import { CircularProgress } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import BackLink from 'src/modules/General/components/BackLink';
import Button from 'src/modules/General/components/Button';
import FeaturedIcon from 'src/modules/General/components/FeaturedIcon';
import OTP from 'src/modules/General/components/Otp';
import { useVerification } from 'src/pages/signUp/verification/useVerification';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './index.module.scss';

export const Verification = () => {
  const { t: translate } = useTranslation();
  const {
    onSubmit,
    otpValue,
    setOtpValue,
    email,
    resendCode,
    isValid,
    loading,
    navigateToSignIn,
    codeExpired,
    errorMessage,
  } = useVerification();
  return (
    <div className={`${css['layout']} py-12 px-4 md:pt-24 md:pb-12 md:px-8`}>
      <div className={`${css['container']} w-full md:w-[360px]`}>
        <div className={css['header']}>
          <FeaturedIcon type="modern" theme="gray" size="xl" iconName="mail-01" />
          <div className="text-center">
            <div className={css['header__title']}>{translate('ver-h1')}</div>
            <div className={css['header__subtitle1']}>{translate('ver-h2')}</div>
            <div className={css['header__subtitle2']}>{email}</div>
          </div>
        </div>
        <OTP errorMessage={errorMessage} isValid={isValid} value={otpValue} setValue={setOtpValue} />
        <Button disabled={!(otpValue.length === 6)} color="primary" block onClick={onSubmit}>
          {loading ? (
            <CircularProgress size="32px" sx={{ color: variables.color_white }} />
          ) : (
            translate('ver-btn-label')
          )}
        </Button>
        <div className={css['resend']}>
          <div className={css['resend__text']}>{translate('ver-not-receive')}</div>

          <Button color="primary" variant="text" onClick={resendCode} disabled={!codeExpired}>
            {translate('ver-resend')}
          </Button>
        </div>

        <BackLink title={translate('ver-back')} onBack={navigateToSignIn} />
      </div>
    </div>
  );
};
