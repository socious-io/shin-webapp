import { VerificationStatus } from '../organizations/organizations.types';
import { RecipientRes } from '../recipients/recipients.types';
import { SchemaAttributeType, SchemaRes } from '../schemas/schemas.types';
import { PaginateRes } from '../types';
import { User } from '../users/users.types';

export type VerificationOperatorType = 'EQUAL' | 'NOT' | 'BIGGER' | 'SMALLER';
export type StatusValue = 'CREATED' | 'REQUESTED' | 'VERIFIED' | 'FAILED';
export type VerificationType = 'SINGLE' | 'MULTI';

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
  type: VerificationType;
  attributes: VerificationAttributeReq[];
}

export interface VerificationIndividualReq {
  customer_id: string;
  verification_id: string;
}

export interface VerificationAttributeRes extends VerificationAttributeReq {
  id: string;
  created_at: Date;
}

export interface VerificationIndividualRes {
  id: string;
  name: string;
  description: string;
  schema_id: string;
  recipient: RecipientRes;
  user_id: string;
  user: User;
  verification: VerificationAttributeRes;
  connection_url?: string;
  connection_id?: string;
  present_id?: string;
  status: StatusValue;
  body: any;
  created_at: Date;
  updated_at: Date;
  verified_at?: Date;
  connection_at?: Date;
}

export interface VerificationRes extends VerificationReq {
  id: string;
  schema: SchemaRes;
  schema_id: string;
  user_id: string;
  user: User;
  present_id?: string;
  connection_id?: string;
  connection_url?: string;
  attributes: VerificationAttributeRes[];
  status: VerificationStatus;
  validation_error?: string;
  connection_at?: Date;
  verified_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface VerificationListRes extends PaginateRes {
  results: VerificationRes[];
}

export interface VerificationIndividualListRes extends PaginateRes {
  results: VerificationIndividualRes[];
}
