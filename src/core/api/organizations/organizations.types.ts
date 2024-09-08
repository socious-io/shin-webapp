import { Media } from '../media/media.types';

export interface OrganizationReq {
  name: string;
  description: string;
  logo_id?: string;
}

export interface OrganizationRes extends OrganizationReq {
  id: string;
  did?: string;
  logo?: Media;
  logo_id?: string;
  is_verified: boolean;
  created_at: Date;
  updated_at: Date;
}
