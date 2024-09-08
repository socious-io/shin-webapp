import { createOrg, preregister, register, sendOTP, updatePassword, updateProfile, verifyOTP } from 'src/core/api';

import { DetailsReq, OtpConfirmRes, PreRegisterRes, ProfileReq } from './index.types';
import { AdaptorRes, OrgProfileRes, SuccessRes, UserProfileRes } from '..';

export const preRegister = async (email: string): Promise<AdaptorRes<PreRegisterRes>> => {
  try {
    const res = await preregister({ email });
    return {
      data: res as PreRegisterRes,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: 'error in preRegister API call',
    };
  }
};
export const registerAdaptor = async (email: string, password?: string): Promise<AdaptorRes<SuccessRes>> => {
  try {
    await register({ email, password });
    return {
      data: { message: 'succeed' },
      error: null,
    };
  } catch {
    return {
      data: null,
      error: 'error in Register API call',
    };
  }
};

export const sendOtp = async (email): Promise<AdaptorRes<SuccessRes>> => {
  try {
    await sendOTP({ email });
    return {
      data: {
        message: 'succeed',
      },
      error: null,
    };
  } catch {
    return {
      data: null,
      error: 'Error in send OTP API call',
    };
  }
};
export const otpConfirm = async (email: string, code: string): Promise<AdaptorRes<OtpConfirmRes>> => {
  try {
    const res = await verifyOTP({ email, code: Number(code) });
    return {
      data: {
        access_token: res.access_token,
        refresh_token: res.refresh_token,
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

export const details = async (params: DetailsReq): Promise<AdaptorRes<UserProfileRes>> => {
  try {
    await updatePassword({ password: params.password });
    const user = await updateProfile({
      job_title: params.jobTitle,
      first_name: params.firstName,
      last_name: params.lastName,
      status: 'ACTIVE',
    });
    const profile: UserProfileRes = {
      id: user.id,
      firstName: user.first_name || '',
      lastName: user.last_name || '',
      email: user.email,
      jobTitle: user.job_title,
      imageUrl: user.avatar?.url,
    };
    return { error: null, data: profile };
  } catch {
    return { error: 'server error in details API call', data: null };
  }
};

export const profile = async (params: ProfileReq): Promise<AdaptorRes<string>> => {
  try {
    const res = await createOrg({
      name: params.name,
      description: params.description || '',
      logo_id: params.imageUrl,
    });
    return {
      data: res.id,
      error: null,
    };
  } catch {
    return { error: 'server error in profile API call', data: null };
  }
};
