export interface ProfileRes {
  imageUrl?: string;
  did: string;
  name: string;
  description?: string;
}

export interface ProfileReq {
  imageUrl?: string;
  name: string;
  description?: string;
}
