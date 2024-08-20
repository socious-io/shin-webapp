import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useVerification = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem('email') as string;
  const [otpValue, setOtpValue] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    // TODO: Apply API call
    navigate('/sign-up/detail');
    // try {
    //     const result = await otpConfirm({ email, code: otpValue });
    //     if (result) {
    //         await setAuthParams(result);
    //         navigate('../password');
    //     }
    // } catch (error) {
    //     setIsValid(false);
    // }
  };
  function resendCode() {
    // setLoading(true);
    // const email = localStorage.getItem('email');
    // if (email) resendVerifyCode({ email }).then(() => setLoading(false));
  }

  const navigateToSignIn = () => {
    navigate('sign-in');
  };
  return { onSubmit, otpValue, setOtpValue, email, resendCode, isValid, loading, navigateToSignIn };
};
