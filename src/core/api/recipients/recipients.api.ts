import { post, del, get, put } from '../http';
import { PaginateReq, SuccessRes } from '../types';
import { RecipientReq, RecipientRes, RecipientListRes } from './recipients.types';

export async function createRecipient(payload: RecipientReq): Promise<RecipientRes> {
  return (await post<RecipientRes>('recipients', payload)).data;
}

export async function updateRecipient(id: string, payload: RecipientReq): Promise<RecipientRes> {
  return (await put<RecipientRes>(`recipients/${id}`, payload)).data;
}

export async function getRecipient(id: string): Promise<RecipientRes> {
  return (await get<RecipientRes>(`recipients/${id}`)).data;
}

export async function getRecipients(params: PaginateReq): Promise<RecipientListRes> {
  return (await get<RecipientListRes>(`recipients`, { params })).data;
}

export async function deleteRecipient(id: string): Promise<SuccessRes> {
  return (await del<SuccessRes>(`recipients/${id}`)).data;
}
