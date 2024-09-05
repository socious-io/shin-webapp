import { SchemaRes } from '../schemas/schemas.types';
import { PaginateRes } from '../types';

export interface VerificationReq {
  name: string;
  description: string;
  schema_id: string;
}

export interface VerificationRes extends VerificationReq {
  id: string;
  schema: SchemaRes;
  user: any; //FIXME with user type
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
