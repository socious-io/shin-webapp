import { OrganizationReq, Organization, OrganizationRes } from './organizations.types';
import { post, put, get } from '../http';

export async function createOrg(payload: OrganizationReq): Promise<Organization> {
  return (await post<Organization>('organizations', payload)).data;
}

export async function updateOrg(id: string, payload: OrganizationReq): Promise<Organization> {
  return (await put<Organization>(`organizations/${id}`, payload)).data;
}

export async function getOrg(id: string): Promise<Organization> {
  return (await get<Organization>(`organizations/${id}`)).data;
}

export async function getOrgs(): Promise<OrganizationRes> {
  return (await get<OrganizationRes>('organizations')).data;
}
