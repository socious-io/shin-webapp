import { IdentityType } from '..';

export type VerificationStatusType = 'APPROVED' | 'PENDING' | 'REJECTED' | 'UNDEFINED';

export interface OrgProfileRes {
  id: string;
  logo: { url?: string; id?: string };
  did: string;
  name: string;
  username: string;
  type: IdentityType;
  description?: string;
  isVerified?: boolean;
  verificationStatus: VerificationStatusType;
  current?: boolean;
}

export interface OrgProfileReq {
  logoId?: string;
  name: string;
  description?: string;
}

export type OrgsRes = {
  entities: OrgProfileRes[];
  currentId: string;
};
