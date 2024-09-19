export type VerificationStatus = 'success' | 'pending' | 'failed' | 'undone';
export interface OrgProfileRes {
  id: string;
  logo: { url?: string; id?: string };
  did: string;
  name: string;
  description?: string;
  isVerified?: boolean;
  verificationStatus: VerificationStatus;
}

export interface OrgProfileReq {
  logoId?: string;
  name: string;
  description?: string;
}
