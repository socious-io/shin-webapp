import { VerificationStatus } from 'src/core/api';

import { IdentityType } from '..';

export interface OrgProfileRes {
  id: string;
  logo: { url?: string; id?: string };
  did: string;
  name: string;
  username: string;
  type: IdentityType;
  description?: string;
  isVerified?: boolean;
  verificationStatus: VerificationStatus | null;
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
