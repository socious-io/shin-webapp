export interface RequestVerificationRes {
  shortURL: string;
}

export interface CheckVerificationRes {
  verified: boolean;
}

export type ProofRequestStatus = '' | 'succeed' | 'failed' | 'error';
