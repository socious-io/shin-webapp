import { CircularProgress } from '@mui/material';
import React from 'react';
import { BackLink } from 'src/modules/General/components/BackLink';
import Button from 'src/modules/General/components/Button';
import { FeaturedIcon } from 'src/modules/General/components/FeaturedIcon';
import { OTP } from 'src/modules/General/components/Otp';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './index.module.scss';
import { useVerification } from './useVerification';

export const Verification = () => {
  const { onSubmit, otpValue, setOtpValue, email, resendCode, isValid, loading, navigateToSignIn } = useVerification();
  return (
    <div className={`${css['layout']} py-12 px-4 md:pt-24 md:pb-12 md:px-8`}>
      <div className={`${css['container']} w-full md:w-[360px]`}>
        <div className={css['header']}>
          <FeaturedIcon type="modern" theme="gray" size="xl" iconName="mail-01" />
          <div className="text-center">
            <div className={css['header__title']}>Check your email</div>
            <div className={css['header__subtitle1']}>We sent a verification code to</div>
            {/* TODO: Get email from server */}
            <div className={css['header__subtitle2']}>test@socious.com</div>
          </div>
        </div>
        <OTP
          errorMessage={'Incorrect verification code entered'}
          isValid={isValid}
          value={otpValue}
          setValue={setOtpValue}
        />
        <Button disabled={!(otpValue.length === 6)} color="primary" block onClick={onSubmit}>
          {loading ? <CircularProgress size="32px" sx={{ color: variables.color_white }} /> : 'Verify email'}
        </Button>
        <div className={css['resend']}>
          <div className={css['resend__text']}>Didn’t receive the email?</div>

          <Button color="primary" variant="text" onClick={resendCode}>
            Click to resend
          </Button>
        </div>

        <BackLink title="Back to sign in" onBack={navigateToSignIn} />
      </div>
    </div>
  );
};
