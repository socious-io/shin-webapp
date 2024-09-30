import { KYBReq, KYBRes } from './kyb.types';
import { get, post } from '../http';

export async function requestKYB(id: string, payload: KYBReq): Promise<KYBRes> {
  return (await post<KYBRes>(`kyb/${id}`, payload)).data;
}

export async function getKYB(id: string): Promise<KYBRes> {
  return (await get<KYBRes>(`kyb/${id}`)).data;
}
