import { SchemaAttributeType, SchemaRes } from '../schemas/schemas.types';
import { PaginateRes } from '../types';
import { User } from '../users/users.types';

export type VerificationOperatorType = 'EQUAL' | 'NOT' | 'BIGGER' | 'SMALLER';
export interface VerificationAttributeReq {
  attribute_id: string;
  operator: VerificationOperatorType;
  value: string;
  type: SchemaAttributeType;
}

export interface VerificationReq {
  name: string;
  description: string;
  schema_id: string;
  attributes: VerificationAttributeReq[];
}

export interface VerificationAttributeRes extends VerificationAttributeReq {
  id: string;
  created_at: Date;
}

export interface VerificationRes extends VerificationReq {
  id: string;
  schema: SchemaRes;
  user: User;
  connection_url?: string;
  connection_id?: string;
  present_id?: string;
  status: 'CREATED' | 'REQUESTED' | 'VERIFIED' | 'FAILED';
  attributes: VerificationAttributeRes[];
  body: any;
  created_at: Date;
  updated_at: Date;
  verified_at?: Date;
  connection_at?: Date;
}

export interface VerificationListRes extends PaginateRes {
  results: VerificationRes[];
}
