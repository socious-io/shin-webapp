import { User } from '..';
import { PaginateRes } from '../types';

export type SchemaAttributeType = 'TEXT' | 'NUMBER' | 'BOOLEAN' | 'URL' | 'EMAIL' | 'DATETIME';

export interface SchemaAttributeReq {
  name: string;
  description?: string;
  type: SchemaAttributeType;
}

export interface SchemaReq {
  name: string;
  description?: string;
  public?: boolean;
  attributes: SchemaAttributeReq[];
}

export interface SchemaAttributeRes extends SchemaAttributeReq {
  id: string;
  created_at: Date;
}

export interface SchemaRes extends Omit<SchemaReq, 'description'> {
  id: string;
  description: string | null;
  attributes: SchemaAttributeRes[];
  deleteable: boolean;
  created: User;
  created_at: Date;
  issue_disabled: boolean;
}

export interface SchemaListRes extends PaginateRes {
  results: SchemaRes[];
}
