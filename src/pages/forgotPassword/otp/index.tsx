import { CircularProgress } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'src/modules/General/components/Button';
import FeaturedIcon from 'src/modules/General/components/FeaturedIcon';
import OTP from 'src/modules/General/components/Otp';
import EmptyPageLayout from 'src/modules/SignIn/containers/EmptyPageLayout';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './index.module.scss';
import { useForgetPasswordOTP } from './useForgetPasswordOTP';

export const ForgetPasswordOTP = () => {
  const { t: translate } = useTranslation();
  const { email, handleBack, isValid, otpValue, setOtpValue, loading, onSubmit, resendCode, codeExpired } =
    useForgetPasswordOTP();
  return (
    <EmptyPageLayout
      headerIcon={<FeaturedIcon type="modern" theme="gray" size="xl" iconName="mail-01" />}
      title={translate('ver-h1')}
      subtitle={translate('ver-h2')}
      subtitle2={email}
      backLinkLabel={translate('ver-back')}
      backLinkAction={handleBack}
    >
      <div className="flex flex-col gap-6">
        <OTP
          errorMessage={translate('ver-error-incorrect')}
          isValid={isValid}
          value={otpValue}
          setValue={setOtpValue}
        />
        <Button disabled={!(otpValue.length === 6)} color="primary" block onClick={onSubmit}>
          {loading ? (
            <CircularProgress size="32px" sx={{ color: variables.color_white }} />
          ) : (
            translate('password-reset')
          )}
        </Button>
        <div className={css['resend']}>
          <div className={css['resend__text']}>{translate('ver-not-receive')}</div>

          <Button color="primary" variant="text" onClick={resendCode} disabled={!codeExpired}>
            {translate('ver-resend')}
          </Button>
        </div>
      </div>
    </EmptyPageLayout>
  );
};
