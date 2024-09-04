import { post, put, get } from '../http';
import { OrganizationReq, OrganizationRes } from './organizations.types';

export async function createOrg(payload: OrganizationReq): Promise<OrganizationRes> {
  return (await post<OrganizationRes>('organizations', payload)).data;
}

export async function updateOrg(id: string, payload: OrganizationReq): Promise<OrganizationRes> {
  return (await put<OrganizationRes>(`organizations/${id}`, payload)).data;
}

export async function getOrg(id: string): Promise<OrganizationRes> {
  return (await get<OrganizationRes>(`organizations/${id}`)).data;
}
