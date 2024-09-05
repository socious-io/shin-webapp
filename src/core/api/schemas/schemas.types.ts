import { PagniateRes } from '../types';

export type SchemaAttributeType = 'TEXT' | 'NUMBER' | 'BOOLEAN' | 'URL' | 'EMAIL' | 'DATETIME';

export interface SchemaAttributeReq {
  name: string;
  description: string;
  type: SchemaAttributeType;
}

export interface SchemaReq {
  name: string;
  description: string;
  public: boolean;
  attributes: SchemaAttributeReq[];
}

export interface SchemaAttributeRes extends SchemaAttributeReq {
  id: string;
  deleteable: boolean;
  created: any; //FIXME: use user object
  created_at: Date;
}

export interface SchemaRes extends SchemaReq {
  id: string;
  attributes: SchemaAttributeRes[];
  created_at: Date;
}

export interface SchemaListRes extends PagniateRes {
  results: SchemaRes;
}
