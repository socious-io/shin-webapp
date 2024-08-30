export interface Meta {
  id: string;
  name: string;
  email: string;
  image: string;
  description?: string;
}

export interface Identity {
  id: string;
  meta: Meta;
  created_at: string;
}

export interface IdentityRes {
  identity: Identity;
}
