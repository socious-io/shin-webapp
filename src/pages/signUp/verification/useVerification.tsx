import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { otpConfirm, sendOtp } from 'src/core/adaptors';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';

export const useVerification = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  const [otpValue, setOtpValue] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [codeExpired, setCodeExpired] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const EXPIRE_TIME = 120000;

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

  const checkCodeExpired = () => {
    setTimeout(() => {
      setCodeExpired(true);
    }, EXPIRE_TIME);
  };
  const resendCode = async () => {
    setCodeExpired(false);
    checkCodeExpired();
    setLoading(true);
    const res = await sendOtp(email);
    if (res.error) {
      setErrorMessage(res.error);
      setIsValid(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    checkCodeExpired();
  }, []);

  const navigateToSignIn = () => {
    navigate('/sign-in');
  };
  return {
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
  };
};
