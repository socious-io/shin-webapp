export interface OrgProfileRes {
  imageUrl?: string;
  did: string;
  name: string;
  description?: string;
}

export interface OrgProfileReq {
  imageUrl?: string;
  name: string;
  description?: string;
}
