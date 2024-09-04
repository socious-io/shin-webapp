export interface OrganizationReq {
  name: string;
  description: string;
  logo_id?: string;
}

export interface OrganizationRes extends OrganizationReq {
  id: string;
  did?: string;
  logo?: any; // FIXME: set media response type
  is_verified: boolean;
  created_at: Date;
  updated_at: Date;
}
