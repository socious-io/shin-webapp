import { detailsReq, OtpConfirmRes, PreRegisterRes, profileReq, successRes } from './index.types';
import { AdaptorRes } from '..';

export const preRegister = async (email: string): Promise<AdaptorRes<PreRegisterRes>> => {
  try {
    // TODO: call api with email
    // TODO: get API result and map to PreRegisterRes type
    return {
      data: {
        email: null,
        username: null,
        shortname: null,
      } as PreRegisterRes,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: 'error in preRegister API call',
    };
  }
};

export const otpConfirm = async (email: string, code: string): Promise<AdaptorRes<OtpConfirmRes>> => {
  try {
    // TODO: call api with email ,code
    // TODO: get API result and map to OtpConfirmRes type
    return {
      data: {
        access_token: '',
        refresh_token: '',
        token_type: 'Bearer',
      },
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: 'error in confirmOTP API call',
    };
  }
};

export const resendCode = async (email): Promise<AdaptorRes<successRes>> => {
  try {
    // TODO: call api with email
    return { data: { message: 'succeed' }, error: null };
  } catch (error) {
    return { data: null, error: 'server error in resendCode API call' };
  }
};

export const details = async (params: detailsReq): Promise<AdaptorRes<successRes>> => {
  try {
    // TODO call API with params and map the result
    return { error: null, data: { message: 'succeed' } };
  } catch {
    return { error: 'server error in details API call', data: null };
  }
};

export const profile = async (params: profileReq): Promise<AdaptorRes<successRes>> => {
  try {
    // TODO call API with params and map the result
    return { data: { message: 'succeed' }, error: null };
  } catch {
    return { error: 'server error in profile API call', data: null };
  }
};