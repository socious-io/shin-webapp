import {
  CredentialReq,
  CredentialRes,
  CredentialListRes,
  CredentialRecipientReq,
  CredentialIds,
  SendCredentialsReq,
  ImportFileReq,
  ImportFileRes,
} from './credentials.types';
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

export async function revokeCredentials(payload: CredentialIds): Promise<SuccessRes> {
  return (await patch<SuccessRes>('credentials/revoke', payload)).data;
}

export async function getCredential(id: string): Promise<CredentialRes> {
  return (await get<CredentialRes>(`credentials/${id}`)).data;
}

export async function connectCredential(id: string): Promise<CredentialRes> {
  return (await get<CredentialRes>(`credentials/${id}/connect`)).data;
}

export async function getCredentials(params: PaginateReq, filters?: FilterReq): Promise<CredentialListRes> {
  return (await get<CredentialListRes>('credentials', { params }, filters)).data;
}

export async function deleteCredential(id: string): Promise<SuccessRes> {
  return (await del<SuccessRes>(`credentials/${id}`)).data;
}

export async function deleteCredentials(payload: CredentialIds): Promise<SuccessRes> {
  return (await post<SuccessRes>('credentials/delete', payload)).data;
}

export async function createCredentialWithRecipient(payload: CredentialRecipientReq): Promise<CredentialRes> {
  return (await post<CredentialRes>('credentials/with-recipient', payload)).data;
}

export async function sendCredentials(payload: SendCredentialsReq): Promise<SuccessRes> {
  return (await post<SuccessRes>('credentials/notify/via-schema', payload)).data;
}

export async function importCSVFile(payload: ImportFileReq): Promise<ImportFileRes> {
  const { file, ...rest } = payload;
  const formData = new FormData();
  formData.append('file', file);
  for (const key in rest) {
    if (rest[key] !== undefined) {
      formData.append(key, String(rest[key]));
    }
  }
  return (await post<ImportFileRes>('credentials/import', formData)).data;
}

export async function getImportStatus(id: string): Promise<ImportFileRes> {
  return (await get<ImportFileRes>(`credentials/import/${id}`)).data;
}

export async function downloadSample(id: string): Promise<string> {
  return (await get<string>(`credentials/import/download-sample/${id}`)).data;
}
