import { forgetPassword, updatePassword } from 'src/core/api';

import { AdaptorRes } from '..';
import { SuccessRes } from '../general/index.types';

export const forgetPasswordAdaptor = async (email: string): Promise<AdaptorRes<SuccessRes>> => {
  try {
    await forgetPassword({ email });
    return {
      data: { message: 'succeed' },
      error: null,
    };
  } catch {
    return {
      data: null,
      error: 'Error in forget password API call',
    };
  }
};

export const resetPasswordAdaptor = async (password: string): Promise<AdaptorRes<SuccessRes>> => {
  try {
    const res = await updatePassword({ password });
    if (res.message === 'success') {
      const data = {
        message: 'succeed',
      };
      return {
        data,
        error: null,
      };
    } else
      return {
        data: null,
        error: res.message,
      };
  } catch {
    return {
      error: 'Error in reset password API call',
      data: null,
    };
  }
};
