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
  let checkedStatus: ProofRequestStatus = '';
  const checkStatus = async (): Promise<ProofRequestStatus> => {
    const { data } = await checkVerificationAdaptor(id);
    if (data) {
      const status = data.status;
      switch (status) {
        case 'REQUESTED':
        case 'CREATED':
          return new Promise(resolve => {
            setTimeout(async () => {
              resolve(await checkStatus()); // Re-check after 5 seconds
            }, 5000);
          });
        case 'VERIFIED':
          checkedStatus = 'succeed';
          return checkedStatus;
        case 'FAILED':
          checkedStatus = 'error';
          return checkedStatus;
        default:
          throw new Error('Unknown status received');
      }
    } else {
      throw new Error('No data received from verification');
    }
  };

  // Start checking the status and return the result
  return await checkStatus();
};
