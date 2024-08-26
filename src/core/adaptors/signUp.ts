export interface PreRegisterRes {
  email?: 'EXISTS' | null;
  username?: 'EXISTS' | null;
  shortname?: 'EXISTS' | null;
  error?: string;
}

export interface OtpConfirmRes {
  access_token: string;
  refresh_token: string;
  token_type: 'Bearer';
  error?: string;
}

export interface successRes {
  message?: string;
  error?: string;
}

export interface detailsAdaptorReq {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle?: string;
  password: string;
}

export interface profileAdaptorReq {
  imageUrl?: string;
  name: string;
  description?: string;
}

export const preRegisterAdaptor = async (email: string): Promise<PreRegisterRes> => {
  try {
    // TODO: call api with email
    // TODO: get API result and map to PreRegisterRes type
    return {
      email: null,
      username: null,
      shortname: null,
    };
  } catch (error) {
    return {
      error: 'error in preRegister API call',
    };
  }
};

export const otpConfirmAdaptor = async (email: string, code: string): Promise<OtpConfirmRes> => {
  try {
    // TODO: call api with email ,code
    // TODO: get API result and map to OtpConfirmRes type
    return {
      error: '',
      access_token: '',
      refresh_token: '',
      token_type: 'Bearer',
    };
  } catch (error) {
    return {
      access_token: '',
      refresh_token: '',
      token_type: 'Bearer',
      error: 'error in confirmOTP API call',
    };
  }
};

export const resendCodeAdaptor = async (email): Promise<successRes> => {
  try {
    // TODO: call api with email
    return { message: 'succeed' };
  } catch (error) {
    return { error: 'server error in resendCode API call' };
  }
};

export const detailsAdaptor = async (params: detailsAdaptorReq): Promise<successRes> => {
  try {
    // TODO call API with params and map the result
    return { message: 'succeed' };
  } catch {
    return { error: 'server error in details API call' };
  }
};

export const profileAdaptor = async (params: profileAdaptorReq): Promise<successRes> => {
  try {
    // TODO call API with params and map the result
    return { message: 'succeed' };
  } catch {
    return { error: 'server error in profile API call' };
  }
};
