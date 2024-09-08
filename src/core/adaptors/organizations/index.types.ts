export interface OrgProfileRes {
  logo: { url?: string; id?: string };
  did: string;
  name: string;
  description?: string;
}

export interface OrgProfileReq {
  logoId?: string;
  name: string;
  description?: string;
}
