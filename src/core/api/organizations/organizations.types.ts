import { Media } from '../media/media.types';
import { PaginateRes } from '../types';

export interface OrganizationReq {
  name: string;
  description: string;
  logo_id?: string;
}

export interface Organization extends OrganizationReq {
  id: string;
  did?: string;
  logo?: Media;
  logo_id?: string;
  is_verified: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface OrganizationRes extends PaginateRes {
  results: Organization[];
}
