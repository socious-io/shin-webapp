import { Media } from '../media/media.types';
import { PaginateRes } from '../types';

export interface OrganizationReq {
  name: string;
  description: string;
  logo_id?: string;
}

export type VerificationStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CREATED';
export interface Organization extends OrganizationReq {
  id: string;
  did?: string;
  logo?: Media;
  logo_id?: string;
  is_verified: boolean;
  created_at: Date;
  updated_at: Date;
  verification_status: VerificationStatus | null;
}

export interface OrganizationRes extends PaginateRes {
  results: Organization[];
}
