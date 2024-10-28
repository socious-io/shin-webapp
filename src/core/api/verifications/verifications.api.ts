import {
  VerificationReq,
  VerificationRes,
  VerificationListRes,
  VerificationIndividualReq,
  VerificationIndividualListRes,
  VerificationIndividualRes,
} from './verifications.types';
import { post, del, get, put } from '../http';
import { PaginateReq, SuccessRes } from '../types';

export async function createVerification(payload: VerificationReq): Promise<VerificationRes> {
  return (await post<VerificationRes>('verifications', payload)).data;
}

export async function createVerificationIndividuals(
  payload: VerificationIndividualReq,
): Promise<VerificationIndividualRes> {
  return (await post<VerificationIndividualRes>('verifications/individual', payload)).data;
}

export async function updateVerification(id: string, payload: VerificationReq): Promise<VerificationRes> {
  return (await put<VerificationRes>(`verifications/${id}`, payload)).data;
}

export async function getVerification(id: string): Promise<VerificationRes> {
  return (await get<VerificationRes>(`verifications/${id}`)).data;
}

export async function getVerificationIndividual(id: string): Promise<VerificationIndividualRes> {
  return (await get<VerificationIndividualRes>(`verifications/individuals/${id}`)).data;
}

export async function connectVerification(individualId: string): Promise<VerificationIndividualRes> {
  return (await get<VerificationIndividualRes>(`verifications/${individualId}/connect`)).data;
}

export async function getVerifications(params: PaginateReq): Promise<VerificationListRes> {
  return (await get<VerificationListRes>(`verifications`, { params })).data;
}

export async function getVerificationIndividuals(
  id: string,
  params: PaginateReq,
): Promise<VerificationIndividualListRes> {
  return (await get<VerificationIndividualListRes>(`verifications/${id}/individuals`, { params })).data;
}

export async function deleteVerification(id: string): Promise<SuccessRes> {
  return (await del<SuccessRes>(`verifications/${id}`)).data;
}

export async function checkVerification(individualId: string): Promise<VerificationIndividualRes> {
  return (await get<VerificationIndividualRes>(`verifications/${individualId}/verify`)).data;
}
