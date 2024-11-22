import { PaginateRes } from '../types';

export interface IntegrationReq {
  name: string;
}

export interface IntegrationRes extends IntegrationReq {
  id: string;
  key: string;
  secret: string;
  base_url: string;
  created_at: Date;
}

export interface IntegrationListRes extends PaginateRes {
  results: IntegrationRes[];
}
