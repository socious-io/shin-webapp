import { GoogleAuthRes } from 'src/core/api';

import { authAdaptorRes } from './index.types';
import { AdaptorRes } from '..';

export const signIn = async (email: string, password: string): Promise<AdaptorRes<authAdaptorRes>> => {
  try {
    // TODO: call api with email and password
    // TODO: get API result and map to authAdaptorRes type
    const res = {
      data: {
        access_token: '',
        refresh_token: '',
        token_type: 'Bearer',
      } as authAdaptorRes,
      error: null,
    };
    return res;
  } catch {
    return {
      data: null,
      error: 'Error in SignIn API call',
    };
  }
};
export const googleOauth = async (code: string): Promise<AdaptorRes<GoogleAuthRes>> => {
  try {
    // TODO: call auth/google API
    const res = {
      data: {
        access_token: '',
        refresh_token: '',
        token_type: 'Bearer',
      } as GoogleAuthRes,
      error: null,
    };
    return res;
  } catch {
    const res = {
      data: null,
      error: 'Error in google auth API call',
    };
    return res;
  }
};
