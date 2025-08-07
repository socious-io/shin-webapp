import { PaginateReq, SuccessRes } from '..';
import { del, get, post, put } from '../http';
import { IntegrationListRes, IntegrationReq, IntegrationRes } from './integrations.types';

export async function createIntegration(payload: IntegrationReq): Promise<IntegrationRes> {
  return (await post<IntegrationRes>('integrations/keys', payload)).data;
}

export async function updateIntegration(id: string, payload: IntegrationReq): Promise<IntegrationRes> {
  return (await put<IntegrationRes>(`integrations/keys/${id}`, payload)).data;
}

export async function getIntegrations(params: PaginateReq): Promise<IntegrationListRes> {
  return (await get<IntegrationListRes>(`integrations/keys`, { params })).data;
}

export async function deleteIntegration(id: string): Promise<SuccessRes> {
  return (await del<SuccessRes>(`integrations/keys/${id}`)).data;
}
