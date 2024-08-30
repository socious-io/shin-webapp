import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { otpConfirm, resendCode as resendCodeAdaptor } from 'src/core/adaptors';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';

export const useVerification = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  const [otpValue, setOtpValue] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    const res = await otpConfirm(email, otpValue);
    if (res.error) {
      setIsValid(false);
      return;
    }
    if (res.data) {
      const setStorages = [
        nonPermanentStorage.set({ key: 'access_token', value: res.data.access_token }),
        nonPermanentStorage.set({ key: 'refresh_token', value: res.data.refresh_token }),
        nonPermanentStorage.set({ key: 'token_type', value: res.data.token_type }),
      ];
      await Promise.all(setStorages);
      navigate(`/sign-up/detail?email=${email}`);
    }
  };
  const resendCode = async () => {
    setLoading(true);
    const res = await resendCodeAdaptor(email);
    if (res.error) setIsValid(false);
    else {
      setLoading(false);
    }
  };

  const navigateToSignIn = () => {
    navigate('sign-in');
  };
  return { onSubmit, otpValue, setOtpValue, email, resendCode, isValid, loading, navigateToSignIn };
};
