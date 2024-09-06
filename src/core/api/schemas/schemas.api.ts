import { SchemaListRes, SchemaReq, SchemaRes } from './schemas.types';
import { post, del, get } from '../http';
import { PaginateReq, SuccessRes } from '../types';

export async function createSchema(payload: SchemaReq): Promise<SchemaRes> {
  return (await post<SchemaRes>('schemas', payload)).data;
}

export async function getSchema(id: string): Promise<SchemaRes> {
  return (await get<SchemaRes>(`schemas/${id}`)).data;
}

export async function getSchemas(params: PaginateReq): Promise<SchemaListRes> {
  return (await get<SchemaListRes>(`schemas`, { params })).data;
}

export async function deleteSchema(id: string): Promise<SuccessRes> {
  return (await del<SuccessRes>(`schemas/${id}`)).data;
}
