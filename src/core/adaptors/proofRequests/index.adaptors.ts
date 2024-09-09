import { checkVerification, VerificationRes } from 'src/core/api';

import { AdaptorRes } from '..';

const checkVerificationAdaptor = async (id: string): Promise<AdaptorRes<VerificationRes>> => {
  try {
    const res = await checkVerification(id);
    return {
      error: null,
      data: res,
    };
  } catch {
    return {
      error: 'Error in request verification API call',
      data: null,
    };
  }
};

export const verifyActionAdaptor = async (
  id: string,
  setVerificationStatus: (val: 'succeed' | 'failed' | 'error') => void,
) => {
  const interval = setInterval(async () => {
    const res = await checkVerificationAdaptor(id);
    if (res.data) {
      const status = res.data.status;
      switch (status) {
        case 'REQUESTED':
          break;
        case 'VEIFIED':
          setVerificationStatus('succeed');
          clearInterval(interval);
          break;
        case 'FAILED':
          setVerificationStatus('error');
          clearInterval(interval);
          break;
      }
    }
  }, 5000);
};
