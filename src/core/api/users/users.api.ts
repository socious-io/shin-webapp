import { get, put } from '../http';
import { ProfileReq, User } from './users.types';

export async function getUser(): Promise<User> {
  return (await get<User>('users')).data;
}

export async function updateProfile(payload: ProfileReq): Promise<User> {
  return (await put<User>(`users/profile`, payload)).data;
}
