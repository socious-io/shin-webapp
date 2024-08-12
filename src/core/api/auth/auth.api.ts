import {
  RefreshReq,
  AuthRes,
} from './auth.types';
import { post } from '../http';

export async function refresh(payload: RefreshReq): Promise<AuthRes> {
  return (await post<AuthRes>('auth/refresh', payload)).data;
}
