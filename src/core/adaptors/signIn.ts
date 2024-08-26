import { ErrorHandlerParams, GoogleAuthRes } from '../api';

export interface authAdaptorRes {
  error?: string;
  access_token?: string;
  refresh_token?: string;
  token_type?: 'Bearer';
}

export const signInAdaptor = async (email: string, password: string): Promise<authAdaptorRes> => {
  try {
    // TODO: call api with email and password
    // TODO: get API result and map to authAdaptorRes type
    const res: authAdaptorRes = {
      error: '',
      access_token: '',
      refresh_token: '',
      token_type: 'Bearer',
    };
    return res;
  } catch {
    const res: authAdaptorRes = {
      error: 'Error in SignIn API call',
    };
    return res;
  }
};

export const googleOauthAdaptor = async (code: string): Promise<GoogleAuthRes> => {
  try {
    // TODO: call auth/google API
    const res: GoogleAuthRes = {
      error: '',
      access_token: '',
      refresh_token: '',
      token_type: 'Bearer',
    };
    return res;
  } catch {
    const res: GoogleAuthRes = {
      error: 'Error in google auth API call',
      access_token: '',
      refresh_token: '',
      token_type: 'Bearer',
    };
    return res;
  }
};
