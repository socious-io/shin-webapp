import { VerificationStatus } from 'src/core/api';

export interface OrgProfileRes {
  id: string;
  logo: { url?: string; id?: string };
  did: string;
  name: string;
  description?: string;
  isVerified?: boolean;
  verificationStatus: VerificationStatus | null;
}

export interface OrgProfileReq {
  logoId?: string;
  name: string;
  description?: string;
}
