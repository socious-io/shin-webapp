import { StatusValue } from 'src/core/api';

export interface CheckVerificationRes {
  id: string;
  connectURL: string;
  status: StatusValue;
}

export type ProofRequestStatus = '' | 'succeed' | 'failed' | 'error';
