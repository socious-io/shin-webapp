import { IdentityType, UploadMediaRes } from '..';

export type VerificationStatusType = 'APPROVED' | 'PENDING' | 'REJECTED' | 'UNDEFINED';

export interface OrgProfileRes {
  id: string;
  logo: UploadMediaRes | null;
  img: string;
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
  name: string;
  logo?: UploadMediaRes;
  description?: string;
}

export type OrgsRes = {
  entities: OrgProfileRes[];
  currentId: string;
};
