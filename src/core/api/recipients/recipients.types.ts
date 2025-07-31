import { PaginateRes } from '..';

export interface RecipientReq {
  first_name: string;
  last_name: string;
  email: string;
}

export interface RecipientRes extends RecipientReq {
  id: string;
  created_at: Date;
}

export interface RecipientListRes extends PaginateRes {
  results: RecipientRes[];
}
