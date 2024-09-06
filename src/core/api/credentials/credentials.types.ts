import { SchemaRes } from '../schemas/schemas.types';
import { PagniateRes } from '../types';

export interface CredentialClaims {
  name: string;
  value: string;
}

export interface CredentialReq {
  name: string;
  description: string;
  schema_id: string;
  recipient_id: string;
  claims: CredentialClaims[];
}

export interface CredentialRes extends CredentialReq {
  id: string;
  schema: SchemaRes;
  created: any; //FIXME with user type
  recipient: any; //FIXME with recipient type
  connection_url?: string;
  connection_id?: string;
  status: 'ISSUED' | 'CLAIMED' | 'FAILED';
  created_at: Date;
  updated_at: Date;
  expired_at?: Date;
  connection_at?: Date;
}

export interface CredentialListRes extends PagniateRes {
  results: CredentialRes[];
}
