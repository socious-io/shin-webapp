import { checkVerification, VerificationRes } from 'src/core/api';

import { AdaptorRes, ProofRequestStatus } from '..';

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

export const verifyActionAdaptor = async (id: string): Promise<ProofRequestStatus> => {
  let checkedStatus = '';
  const interval = setInterval(async () => {
    const { data } = await checkVerificationAdaptor(id);
    if (data) {
      const status = data.status;
      switch (status) {
        case 'REQUESTED':
          break;
        case 'VERIFIED':
          checkedStatus = 'succeed';
          clearInterval(interval);
          break;
        case 'FAILED':
          checkedStatus = 'error';
          clearInterval(interval);
          break;
      }
    }
  }, 5000);
  return checkedStatus as ProofRequestStatus;
};
