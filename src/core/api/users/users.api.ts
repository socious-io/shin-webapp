import { ProfileReq, User } from './users.types';
import { get, put } from '../http';
import { SuccessRes } from '../types';

export async function getUser(): Promise<User> {
  return (await get<User>('users')).data;
}

export async function updateProfile(payload: ProfileReq): Promise<SuccessRes> {
  return (await put<SuccessRes>(`users/profile`, payload)).data;
}
