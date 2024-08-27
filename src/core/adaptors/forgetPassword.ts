export interface successRes {
  message?: string;
  error?: string;
}

export const forgetPasswordAdaptor = async (email: string): Promise<successRes> => {
  try {
    //TODO: call forgetPassword API
    // TODO: map the result
    return {
      message: 'succeed',
    };
  } catch {
    return {
      error: 'Error in forget password API call',
    };
  }
};

export const resetPasswordAdaptor = async (password: string): Promise<successRes> => {
  try {
    //TODO: call resetPassword API
    // TODO: map the result
    return {
      message: 'succeed',
    };
  } catch {
    return {
      error: 'Error in reset password API call',
    };
  }
};
