import {
  RefreshReq,
  AuthRes,
  LoginReq,
  RegisterReq,
  OTPReq,
  VerifyOTPReq,
  ForgetPasswordReq,
  PreregisterReq,
  PreRegisterRes,
  SociousAuthRes,
} from './auth.types';
import { post, put } from '../http';
import { SuccessRes } from '../types';

export async function login(payload: LoginReq): Promise<AuthRes> {
  return (await post<AuthRes>('auth/login', payload)).data;
}

export async function register(payload: RegisterReq): Promise<SuccessRes> {
  return (await post<SuccessRes>('auth/register', payload)).data;
}
export async function sendOTP(payload: OTPReq): Promise<SuccessRes> {
  return (await post<SuccessRes>('auth/otp', payload)).data;
}

export async function resendOTP(payload: OTPReq): Promise<SuccessRes> {
  return (await post<SuccessRes>('auth/otp/resend', payload)).data;
}

export async function verifyOTP(payload: VerifyOTPReq): Promise<AuthRes> {
  return (await post<AuthRes>('auth/otp/verify', payload)).data;
}

export async function forgetPassword(payload: OTPReq): Promise<SuccessRes> {
  return (await post<SuccessRes>('auth/password/forget', payload)).data;
}

export async function updatePassword(payload: ForgetPasswordReq): Promise<SuccessRes> {
  return (await put<SuccessRes>('auth/password', payload)).data;
}

export async function preregister(payload: PreregisterReq): Promise<PreRegisterRes> {
  return (await post<PreRegisterRes>('auth/pre-register', payload)).data;
}

export async function refresh(payload: RefreshReq): Promise<AuthRes> {
  return (await post<AuthRes>('auth/refresh', payload)).data;
}

export async function loginSocious(access_token: string): Promise<SociousAuthRes> {
  return (await post<SociousAuthRes>('auth/socious', {}, { headers: { Authorization: `Bearer ${access_token}` } }))
    .data;
}
