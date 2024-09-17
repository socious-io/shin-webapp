import { SchemaRes } from '../schemas/schemas.types';
import { PaginateRes } from '../types';
import { User } from '../users/users.types';

export type VerificationOperatorType = 'EQUAL' | 'NOT' | 'BIGGER' | 'SMALLER';

export interface Attribute {
  attribute_id: string;
  operator: VerificationOperatorType;
  value: string;
}

export interface VerificationReq {
  name: string;
  description: string;
  schema_id: string;
  attributes: Attribute[];
}

export interface VerificationRes extends VerificationReq {
  id: string;
  schema: SchemaRes;
  user: User;
  connection_url?: string;
  connection_id?: string;
  present_id?: string;
  status: 'REQUESTED' | 'VEIFIED' | 'FAILED';
  body: any;
  created_at: Date;
  updated_at: Date;
  verified_at?: Date;
  connection_at?: Date;
}

export interface VerificationListRes extends PaginateRes {
  results: VerificationRes[];
}
