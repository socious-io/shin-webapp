import { CredentialReq, CredentialRes, CredentialListRes, CredentialRecipientReq } from './credentials.types';
import { post, del, get, put, patch } from '../http';
import { FilterReq, PaginateReq, SuccessRes } from '../types';

export async function createCredential(payload: CredentialReq): Promise<CredentialRes> {
  return (await post<CredentialRes>('credentials', payload)).data;
}

export async function updateCredential(id: string, payload: CredentialReq): Promise<CredentialRes> {
  return (await put<CredentialRes>(`credentials/${id}`, payload)).data;
}

export async function revokeCredential(id: string): Promise<CredentialRes> {
  return (await patch<CredentialRes>(`credentials/${id}/revoke`)).data;
}

export async function getCredential(id: string): Promise<CredentialRes> {
  return (await get<CredentialRes>(`credentials/${id}`)).data;
}

export async function connectCredential(id: string): Promise<CredentialRes> {
  return (await get<CredentialRes>(`credentials/${id}/connect`)).data;
}

export async function getCredentials(params: PaginateReq, filters?: FilterReq): Promise<CredentialListRes> {
  return (await get<CredentialListRes>(`credentials`, { params }, filters)).data;
}

export async function deleteCredential(id: string): Promise<SuccessRes> {
  return (await del<SuccessRes>(`credentials/${id}`)).data;
}

export async function createCredentialWithRecipient(payload: CredentialRecipientReq): Promise<CredentialRes> {
  return (await post<CredentialRes>('credentials/with-recipient', payload)).data;
}
