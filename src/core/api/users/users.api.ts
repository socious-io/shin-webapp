import { SuccessRes } from '..';
import { PasswordReq, ProfileReq, User } from './users.types';
import { get, put } from '../http';

export async function getUser(): Promise<User> {
  return (await get<User>('users')).data;
}

export async function updateProfile(payload: ProfileReq): Promise<User> {
  return (await put<User>(`users/profile`, payload)).data;
}

export async function updatePassword(payload: PasswordReq): Promise<SuccessRes> {
  return (await put<SuccessRes>('auth/password', payload)).data;
}
