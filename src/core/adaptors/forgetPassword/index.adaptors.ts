import { forgetPassword, updatePassword } from 'src/core/api';

import { AdaptorRes, SuccessRes } from '..';

export const forgetPasswordAdaptor = async (email: string): Promise<AdaptorRes<SuccessRes>> => {
  try {
    await forgetPassword({ email });
    return {
      data: { message: 'succeed' },
      error: null,
    };
  } catch (e: any) {
    return {
      data: null,
      error: e.response?.status === 404 ? 'There is no account with this email' : 'Error in forget password API call',
    };
  }
};

export const resetPasswordAdaptor = async (password: string): Promise<AdaptorRes<SuccessRes>> => {
  try {
    await updatePassword({ password });
    return {
      data: {
        message: 'succeed',
      },
      error: null,
    };
  } catch {
    return {
      error: 'Error in reset password API call',
      data: null,
    };
  }
};
