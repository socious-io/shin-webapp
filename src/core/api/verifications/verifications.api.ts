import { VerificationReq, VerificationRes, VerificationListRes } from './verifications.types';
import { post, del, get, put } from '../http';
import { PaginateReq, SuccessRes } from '../types';

export async function createVerification(payload: VerificationReq): Promise<VerificationRes> {
  return (await post<VerificationRes>('verifications', payload)).data;
}

export async function updateVerification(id: string, payload: VerificationReq): Promise<VerificationRes> {
  return (await put<VerificationRes>(`verifications/${id}`, payload)).data;
}

export async function getVerification(id: string): Promise<VerificationRes> {
  return (await get<VerificationRes>(`verifications/${id}`)).data;
}

export async function connectVerification(id: string): Promise<VerificationRes> {
  return (await get<VerificationRes>(`verifications/${id}/connect`)).data;
}

export async function getVerifications(params: PaginateReq): Promise<VerificationListRes> {
  return (await get<VerificationListRes>(`verifications`, { params })).data;
}

export async function deleteVerification(id: string): Promise<SuccessRes> {
  return (await del<SuccessRes>(`verifications/${id}`)).data;
}
