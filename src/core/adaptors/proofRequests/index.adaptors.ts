import { AdaptorRes } from '..';
import { CheckVerificationRes, RequestVerificationRes } from './index.types';

const requestVerificationAdaptor = async (): Promise<AdaptorRes<RequestVerificationRes>> => {
  try {
    // TODO: call request verificationAPI
    return {
      error: null,
      data: { shortURL: 'app.socious.io' },
    };
  } catch {
    return {
      error: 'Error in request verification API call',
      data: null,
    };
  }
};

const checkVerificationAdaptor = async (): Promise<AdaptorRes<CheckVerificationRes>> => {
  try {
    // TODO: call check verification API
    return {
      error: null,
      data: { verified: true },
    };
  } catch {
    return {
      error: 'Error in check verification API call',
      data: null,
    };
  }
};

export const verifyActionAdaptor = async (
  setConnectUrl: (val: string) => void,
  setLoading: (val: boolean) => void,
  setVerificationStatus: (val: 'succeed' | 'failed' | 'error') => void,
) => {
  const vc = await requestVerificationAdaptor();
  if (vc.data) {
    setConnectUrl(vc.data.shortURL);
    setLoading(false);
  }

  const interval = setInterval(async () => {
    const res = await checkVerificationAdaptor();
    if (res.data) {
      if (res.data.verified) {
        // const identityRes = await getIdentity();
        /* if (identityRes.data?.identity) await store.dispatch(setIdentity(identityRes.data.identity)); */
        setVerificationStatus('succeed');
      } else {
        setVerificationStatus('failed');
      }
      clearInterval(interval);
      setLoading(false);
    }
  }, 5000);

  setTimeout(() => {
    setVerificationStatus('error');
    setLoading(false);
    clearInterval(interval);
  }, 120000);
};
