import { IdentityRes } from './index.types';
import { AdaptorRes } from '..';

export const getIdentity = async (): Promise<AdaptorRes<IdentityRes>> => {
  try {
    // TODO: call identity API and map the result
    const data: IdentityRes = {
      identity: {
        id: '',
        meta: {
          id: '',
          name: '',
          email: '',
          image: '',
          description: '',
        },
        created_at: '',
      },
    };
    const res = { data, error: null };
    return res;
  } catch {
    const res = {
      data: null,
      error: 'Error is Identity API call',
    };
    return res;
  }
};
